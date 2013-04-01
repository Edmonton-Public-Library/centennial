;
define(['timemap', 'lib/knockout', 'epl/Settings', 'timemap/Environment', 'timemap/map/StoryPin', 'lib/seedrandom', 'lib/jquery.hammer'], function (timemap, ko, Settings, Environment, StoryPin) {

return (function () {

	//The list of displayed content types
	var contentTypes = {
		text : {index: 0, color: 'yellow', displayTitle: "Text",
			iconURL: Environment.routes.staticDirectory + '/images/text_icon_disabled_crop.png'},
		link : {index: 1, color: 'green', displayTitle: "Link",
			iconURL: Environment.routes.staticDirectory + '/images/link_icon_disabled_crop.png'},
		image : {index: 2, color: 'pink', displayTitle: "Image",
			iconURL: Environment.routes.staticDirectory + '/images/image_icon_disabled_crop.png'},
		pdf : {index: 3, color: 'purple', displayTitle: "PDF",
			iconURL: Environment.routes.staticDirectory + '/images/pdf_icon_disabled_crop.png'},
		audio : {index: 4, color: 'blue', displayTitle: "Audio",
			iconURL: Environment.routes.staticDirectory + '/images/audio_icon_disabled_crop.png'},
		video : {index: 5, color: 'gray', displayTitle: "Video",
			iconURL: Environment.routes.staticDirectory + '/images/video_icon_disabled_crop.png'}
	};

	var numCols = 3; //The number of columns to display icons within

	//Generate an enumerable list of the above content types, of the form:
	// ['text', 'link', ... ]
	var contentTypesList = (function () {
		var i = 0;
		var types = [];
		for(type in contentTypes) {
			types[i] = type;
			i++;
		}
		return types;
	})();

	var Branch = function (viewport) {
		var self = this;
		this.viewport = $(viewport);
		this.storySelector = viewport.find('#story-selector');
		this.floorplanUrl = ko.observable('');
		this.floorplanElement = this.viewport.find('[data-role=floorplan]');
		this.branchHeaderElement = this.viewport.find('[data-role=branch-header]');
		this.branchID = '';
		this.branchName = ko.observable('');
		this.branchDesc = ko.observable();
		this.branchStartDate = ko.observable();
		this.branchEndDate = ko.observable();
		this.dimensions = new (function () {
			var dimensions = this;

			this.numCols = numCols;
			this.numRows = Math.ceil(contentTypesList.length / this.numCols);
			this.viewerWidth = ko.observable(Environment.display.viewportWidth());
			this.viewerHeight = ko.observable(Environment.display.viewportHeight());
			this.cellDimensions = ko.computed(function () {
				return {
					width: Math.floor(dimensions.viewerWidth() / dimensions.numCols),
					height: Math.floor(dimensions.viewerHeight() / dimensions.numRows)
				};
			});
		})();

		this.typeCoordinates = {};
		this.storyData = {};
		this.selectedStoryType = ko.observable();
		this.allBranches = ko.observableArray([]);

		//Create and dynamically update the positions of the icons based on the viewport dimensions,
		//and initialize story data for each type
		for(type in contentTypes) {
			this.typeCoordinates[type] = ko.observable(
				this.pinCoordinates({
					type: type,
					id : self.branchID,
					title : self.branchName()
				})
			);

			this.storyData[type] = ko.observableArray([]);
		}

		this.dimensions.cellDimensions.subscribe(function (dimensions) {
			for(type in contentTypes) {
				self.typeCoordinates[type](
					self.pinCoordinates({
						type: type,
						id : self.branchID,
						title : self.branchName()
					})
				);
			}
		});

		ko.applyBindings({
			Environment : Environment,
			dimensions : this.dimensions,
			typeCoordinates : this.typeCoordinates,
			storyData : this.storyData,
			contentTypesList : contentTypesList,
			contentTypes : contentTypes,
			floorplanUrl : this.floorplanUrl,
			selectedStoryType : this.selectedStoryType,
			branchName : this.branchName,
			branchDesc : this.branchDesc,
			branchStartDate : this.branchStartDate,
			branchEndDate : this.branchEndDate,
			allBranches : this.allBranches,
			openStorySelector : function (type, event) {
				self.showStorySelector(type);
				event.stopPropagation(); //Otherwise the story selector will hide as soon as it's displayed
			},
			closeBranchView : function () {
				window.top.location = "#";
			}
		}, viewport[0]);

		//React to the changed floorplan when its image is properly loaded
		this.floorplanElement.load(function () {
			self.configureFloorplan();
		});

		this.pinCoordinates(new StoryPin('text', '11', 'coll'));

		//Hide story lists when clicking outside of them
		$(window).bind('click tap touchstart', function () {
			self.hideStorySelector();
		});
	};

	Branch.prototype.showStorySelector = function (type) {
		this.selectedStoryType(type);
		this.storySelector.show().css('left', Environment.display.mouseX()).css('top', Environment.display.mouseY());
	};

	Branch.prototype.hideStorySelector = function () {
		this.storySelector.hide();
	};

	Branch.prototype.pinCoordinates = function (pin) {
		var self = this,
			col = contentTypes[pin.type].index % this.dimensions.numCols,
			row = Math.floor(contentTypes[pin.type].index / this.dimensions.numCols);

		return {
			root : cellRoot(col, row),
			random : cellRandom(col, row)
		}

		//Compute the cell's top-left root coordinates
		function cellRoot (col, row) {
			// Since the image is centered, the pins need to be shifted over to be centered too
			var centeringAdjustment = (Environment.display.viewportWidth() - self.floorplanElement.width()) / 2
			return {
				x : self.dimensions.cellDimensions().width * col + centeringAdjustment, 
				y : self.dimensions.cellDimensions().height * row + self.branchHeaderElement.height()
			};
		}

		//Compute the random location for the cell
		function cellRandom (col, row) {
			var centFactor = 0.6;
			Math.seedrandom(pin.title + 'horizontal-direction' + pin.type);
			var xRandom = Math.random() * centFactor;
			Math.seedrandom(pin.title + 'vertical-direction' + pin.type);
			var yRandom = Math.random() * centFactor;

			var cellRootValue = cellRoot(col, row);

			return {
				x : cellRootValue.x +(xRandom * self.dimensions.cellDimensions().width) + (1 - centFactor)/2 * self.dimensions.cellDimensions().width,
				y : cellRootValue.y +(yRandom * self.dimensions.cellDimensions().height) + (1 - centFactor)/2 * self.dimensions.cellDimensions().height,
			};
		}
	};

	Branch.prototype.configureFloorplan = function() {
		var floorplanWidth = this.floorplanElement.width(),
			floorplanHeight = this.floorplanElement.height(),
			headerHeight = this.branchHeaderElement.height(), 
			effectiveViewportHeight = Environment.display.viewportHeight() - headerHeight,
			viewportWidth = Environment.display.viewportWidth();

		// Stretch to the full height unless it would cause the width to overflow...
		if ((effectiveViewportHeight / floorplanHeight * floorplanWidth) <= viewportWidth) {
			this.floorplanElement.height(effectiveViewportHeight);
		// ...in which case, stretch to the full width
		} else {
			this.floorplanElement.width(viewportWidth);
		}

		this.dimensions.viewerWidth(this.floorplanElement.width());
		// The height of the icon is ~60px, so 60px is subtracted to ensure the icon fits
		this.dimensions.viewerHeight(this.floorplanElement.height() - 70);
	};

	Branch.prototype.setData = function (branchData) {
		var self = this;
		this.branchID = branchData.id;
		this.branchName(branchData.name);
		this.branchDesc(branchData.description);
		this.branchStartDate(branchData.start_year);
		var endYear = branchData.end_year != null ? branchData.end_year : "Present";
		this.branchEndDate(endYear);
		this.floorplanUrl(branchData.floor_plan);
		// Obtain all the branches for the 'Jump to Branch' drop down
		$.getJSON (Settings.apiBranchUrl, function(data) {
			self.allBranches(data.objects);
			// Remove the current branch from the drop down options
			self.allBranches.remove(function(branch) {
				return branch.id == self.branchID;
			});
		});

		timemap.updateQuest({
			branch : this.branchID,
			onMap : false
		});
	};

	Branch.prototype.showPin = function (pin) {
		var typePins = this.storyData[pin.type](),
			exists = false;
		for(i in typePins) {
			if(typePins[i].id == pin.id) {
				exists = true;
			}
		}
		if(!exists) {
			this.storyData[pin.type].push(pin);
		}
	};

	Branch.prototype.hidePin = function (pin) {
		this.storyData[pin.type].remove(function (item) {
			return item.id == pin.id;
		});
	};

	return Branch;

})();

});