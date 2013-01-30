;
var epl = epl || {};
define(['epl', 'epl.settings', 'lib/csc.Error'], function () {

epl.Map = (function () {

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
		require(['https://maps.googleapis.com/maps/api/js?key=' + epl.settings.apiKeys.google.maps + 'luc&sensor=true&callback=init'], function () { });

		window.init = function () {
			//Run the Map loader
			self.map = new google.maps.Map(self.mapElement[0], {}); //Defer setting options until rendering
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

		if(typeof canvas[0] == 'undefined') csc.Error.throw(new csc.Error('004: invalidViewport'));
		
		//Clear canvas attributes from previous renderings
		$.each(this.mapElement.prop('attributes'), function () {
			self.mapElement.removeAttr(this.name);
		});

		//Render the map into the viewport
		viewport.replaceWith(this.mapElement);

		//Preserve viewport attributes that were overwritten by google.maps.Map()
		$.each(viewport.prop('attributes'), function () {
		    self.mapElement.attr(this.name, this.value);
		});
	};

	return Map;

})();

return epl.Map;
//End module
});