;
define(['timemap', 'epl/Settings', 'lib/csc/Error', 'lib/knockout', 'timemap/Environment', 'timemap/map/BranchPin', 'lib/csc/Utils'], function (epl, Settings, Error, ko, Environment, BranchPin, Utils) {

return (function () {

	var branchEndpoint = Environment.routes.apiBase + '/branch';
	var formatString = '?format=json';
	var branchInfoSelector = '#tm-branch-info-pane'; //Selector for the element containing the popup template
	var branchInfoClass = 'tm-branch-info'; //The class used to style the popup box
	var tileDirectory = Settings.mediaDirectory + '/MapTiles';
	var eplMapId = 'epl-map';
	var currentYear = new Date().getFullYear();
	//Placeholder for EPLMapType, which is defined when the Maps API loads from Google
	var EPLMapType = {};

	/**
	 * Creates an epl-wrapped Google Map
	 * @param	callback	The callback function will be invoked without arguments when the map is fully initialized
	 * @return	void
	 */
	var Map = function (callback) {
		var self = this;
		this.mapOptions = null;
		this.map = null;
		this.mapElement = $('<div>'); //For caching the map when not in view
		require(['https://maps.googleapis.com/maps/api/js?key=' + Settings.apiKeys.google.maps + 'luc&sensor=true&callback=eplMapsInit'], function () { });

		this.mapData = {
			markers : {},
			branchInfo : {},
			infoBox : null,
			selectedBranch : ko.observable({}),
			selectedYear : 1924,
			mapTiler : {},
			range : {
				startDate : new Date(), 
				endDate : new Date()
			}
		};

		this.registerBindingHandlers();

		window.eplMapsInit = function () {
			//Run the Map loader
			self.map = new google.maps.Map(self.mapElement[0], {}); //Defer setting options until rendering

			//Create a custom map type for displaying historical maps from different years
			EPLMapType = (function () {
					var Type = function (year) {
						this.tileBase = tileDirectory + '/' + year;
					};

					Type.prototype.maxZoom = 16;
					Type.prototype.minZoom = 7;
					Type.prototype.tileSize = new google.maps.Size(256, 256);
					Type.prototype.isPng = false;
					Type.prototype.name = '';
					Type.prototype.alt = '';

					Type.prototype.getTile = function(coord, zoom, ownerDocument) {
					  var div = ownerDocument.createElement('div');
					  div.style.width = 256 + 'px';
					  div.style.height = 256 + 'px';
					  div.style.backgroundImage = 'url(' + tileDirectory + '/' + self.mapData.selectedYear + '/' + zoom + '/' + coord.x + '/' + (Math.pow(2,zoom)-coord.y-1) + '.jpg)';
					  div.style.backgroundColor = '#FFFFFF';
					  return div;
					};

					return Type;
				})();

			callback();
		};
	};

	/**
	 * Renders the contents of this.mapElement into the selected viewport, 
	 * preserving all attributes and styling of the viewport.
	 *		- The map MUST be fully initialized before invoking the rendered. It is suggested to:
	 *				var map = new epl.Map(function () {
	 *					map.render();
	 *				});
	 * @param	viewport	The selector string, jQuery, or DOMElement to render into
	 * @return	void
	 */
	Map.prototype.render = function (viewport) {
		var self = this,
			canvas = $('<div>');

		viewport = $(viewport); //Wrap in case a selector was passed in

		//Set up the Map
		this.map.setOptions({
			center : new google.maps.LatLng(53.5472, -113.5006),
			zoom : 11,
			mapTypeId : google.maps.MapTypeId.ROADMAP,
		});

		if (typeof canvas[0] == 'undefined') Error.throw(new Error('Maps.invalidViewport'));
		
		//Clear canvas attributes from previous renderings
		$.each(this.mapElement.prop('attributes'), function () {
			self.mapElement.removeAttr(this.name);
		});

		//Render the map into the viewport
		viewport.replaceWith(this.mapElement);

		//Allow any InfoBoxes that are open when the map loads to be closed
		if(this.mapData.infoBox != null) {
			ko.applyBindings(self.mapData, this.mapElement.find('.tm-branch-info')[0]);
		}

		//Preserve viewport attributes that were overwritten by google.maps.Map()
		$.each(viewport.prop('attributes'), function () {
		    self.mapElement.attr(this.name, this.value);
		});

		this.overlayYear(1913);
	};

	/**
	 * Show a pin on the map
	 * @param	pin		BranchPin	The pin to show
	 */
	Map.prototype.showPin = function (pin) {
		var self = this;
		//Create the pin if needed
		if(typeof self.mapData.markers[pin.id] == 'undefined') {
			self.mapData.markers[pin.id] = pin;
			self.mapData.markers[pin.id].marker = new google.maps.Marker({
				map: self.map,
				position: new google.maps.LatLng(pin.lat, pin.lng),
				clickable: true,
				cursor: 'pointer',
				draggable: false,
				flat: true,
				optimized: true,
				visible: true,
				icon: pin.iconUrl
			});

			//Cache this branch's info
			self.withBranchInfo(pin.id, function (branchData) {
				self.mapData.branchInfo[pin.id] = branchData;
			});

			//Open the branch info when the user clicks on a pin
			google.maps.event.addListener(self.mapData.markers[pin.id].marker, 'click', function () {
				var clickedPin = self.mapData.markers[pin.id];
				self.showInfo(clickedPin);
			});
		//Otherwise, just show it
		} else {
			self.mapData.markers[pin.id].marker.setVisible(true);
		}
		//TODO: Adjust the map zoom/position to show all of the pins? Or is this intrusive?
	};

	/**
	 * Hide a pin from the map
	 * @param	pin		BranchPin	The pin to hide
	 */
	Map.prototype.hidePin = function (pin) {
		var self = this;
		if(typeof self.mapData.markers[pin.id] != 'undefined') {
			self.mapData.markers[pin.id].marker.setVisible(false);
		}

		//If the pin that is being removed corresponds to a 
		//currently-displayed infoBox, hide the infoBox.
		if(this.mapData.infoBox != null && pin.id == this.mapData.infoBox.branchID) {
			this.hideInfo();
		}
	};

	Map.prototype.resetPins = function () {
		for(id in this.mapData.markers) {
			this.hidePin(new BranchPin({
				id : id
			}));
		}
	}

	/**
	 * Set the current date range for the map and trigger any subscribed listeners
	 * like the tile overlay service
	 * @param	startDate		Date		The lower end of the date range
	 * @param	endDate			Date		The upper end of the date range
	 */
	Map.prototype.setRange = function (startDate, endDate) {
		var self = this;
		self.mapData.range = {
			startDate: startDate,
			endDate: endDate
		};
		//TODO: Trigger any required handlers
	};

	/**
	 * Change the current map overlay year
	 * @param	year	int		The year to display
	 */
	Map.prototype.overlayYear = function (year) {
		var self = this;
		this.mapData.selectedYear = year;

		//Load custom maps for anything before the current year		
		if(year < currentYear) {
			self.mapData.mapTiler = new google.maps.ImageMapType({ 
				getTileUrl: function(coord, zoom) {
					return tileDirectory + '/' + self.mapData.selectedYear + '/' + zoom + '/' + coord.x + '/' + (Math.pow(2,zoom)-coord.y-1) + '.jpg';
				},
				tileSize: new google.maps.Size(256, 256),
				isPng: false,
				maxZoom: 16,
				minZoom: 7
			});

			self.map.mapTypes.set(year.toString(), new EPLMapType(year));
			self.map.setMapTypeId(year.toString());
		//Otherwise, load the default map
		} else {
			self.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
		}
	};

	/**
	 * Show information about a branch, given its pin
	 * @param	pin		BranchPin		The Branch pin
	 */
	Map.prototype.showInfo  = function (pin) {
		var self = this,
			infoTemplate = null,
			templateID = null;
		self.hideInfo();
		//We need the InfoBox library to show the popup;
		//it needs to be loaded here (when the google library is
		//pretty much guaranteed to be loaded), because it depends 
		//google library which doesn't support AMD loading
		require(['lib/infobox'], function (InfoBox) {
			self.withBranchInfo(pin.id, function (branch) {
				self.mapData.selectedBranch(branch);

				//Clone the overlay template and create a unique ID for tracking it
				templateID = Utils.guid();
				infoTemplate = $(branchInfoSelector).clone();
				infoTemplate.find('.' + branchInfoClass).attr('id', templateID);

				//Create the info box and set its content
				self.mapData.infoBox = new InfoBox({
					position : new google.maps.LatLng(pin.lat, pin.lng),
					content : infoTemplate.html(),
					infoBoxClearance: 20,
					disableAutoPan: false,
					zIndex: 1,
					closeBoxURL: ''
				});

				//Track the ID so we can remove this infoBox if the corresponding pin is removed
				self.mapData.infoBox.branchID = pin.id;

				//Bind data from the selected branch to the info box
				google.maps.event.addListener(self.mapData.infoBox, 'domready', function () {
					ko.applyBindings(self.mapData, $('#' + templateID)[0]);
				});

				self.mapData.infoBox.open(self.map);
			});
		});
	};

	/**
	 * Close any currently-displayed InfoBox
	 */
	Map.prototype.hideInfo = function () {
		var self = this;
		if(self.mapData.infoBox != null) {
			self.mapData.infoBox.close();
			self.mapData.infoBox = null;
		}
	};

	/**
	 * Invokes the provided callback with a single argument containing branch data
	 * matching the provided ID
	 * @param	id			String		The Branch ID to gather data from
	 * @param	callback	Function	The callback function to invoke
	 */
	Map.prototype.withBranchInfo = function(id, callback) {
		var self = this;
		//TODO: Do we need to have a persistent cache (i.e. localStorage) here?
		if(typeof self.mapData.branchInfo[id] == 'undefined') {
			$.get(branchEndpoint + '/' + id + formatString, {}, function (data) {
				self.mapData.branchInfo[id] = data;
				callback(data);
			});
		} else {
			callback(self.mapData.branchInfo[id]);
		}
	};

	/**
	 * Invokes the provided callback with a single argument containing branch data
	 * matching the provided ID; doesn't provide caching
	 * @param	id			String		The Branch ID to gather data from
	 * @param	callback	Function	The callback function to invoke
	 */
	Map.withBranchInfo = function(id, callback) {
		//TODO: Do we need to have a persistent cache (i.e. localStorage) here?
		$.get(branchEndpoint + '/' + id + formatString, {}, function (data) {
			callback(data);
		});
	};

	/**
	 * Add Knockout bindings that pertain to Map functions
	 */
	Map.prototype.registerBindingHandlers = function () {
		var self = this;
		ko.bindingHandlers.closeBranchInfo = {
			init : function (element) {
				$(element).click(function () {
					self.hideInfo();
				});
			}
		};
	}

	return Map;

})();


//End module
});