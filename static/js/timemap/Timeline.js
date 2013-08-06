;
define(['lib/simile', 'timemap/Environment', 'timemap/map/BranchPin', 'timemap/map/StoryPin', 'timemap', 'lib/jquery-ui'], function (Simile, Environment, BranchPin, StoryPin, Timemap) {

return (function () {

	var Timeline = function (viewport, map, startingDate, branchID, branchViewer) {
		var self = this;
		this.viewport = $(viewport);
		this.map = map;
		this.branchViewer = null;
		this.startingDate = startingDate;
		this.questTimeout = null;

		this.leftNumber = $('<div>').addClass('timelineBound').addClass('left');
		this.rightNumber = $('<div>').addClass('timelineBound').addClass('right');

		//When the document is ready, initialize the timeline's DOM element
		$(document).ready(function () {
			$.get('/preferences/', function(json) {
				self.initTimeline(json, branchID, branchViewer);
			});
		});

		$(window).bind('resize', function () {
			self.onResize();
		});

	};

	Timeline.prototype.getCurrentDate = function() {
		var self = this;
		return self.tl._bands[0].getCenterVisibleDate();
	}

	Timeline.prototype.processStories = function(json) {
		json = json.objects;
		var newJson = [];
		for (i in json) {
			newJson.push({
				title: json[i].title,
				description: json[i].description,
				content_type : json[i].content_type,
				start: json[i].year.toString(),
				end: json[i].year.toString(),
				id: json[i].id,
				instant : "true"
			});
		}

		if(json.length) {
			this.setTimelineStartDate(new Date(Date.UTC(json[0].year - 1, 0, 1)));
			this.setTimelineEndDate(new Date(Date.UTC(json[json.length - 1].year + 1, 0, 1)));
		}

		this.stories.byStart = newJson;
		this.stories.byEnd = newJson;

		this.hideShowOnScroll();
	};

	Timeline.prototype.processBranches = function(json) {
		var newJson = [];
		var currYear = new Date().getFullYear().toString();

		var btypeToIcon = {
			B: 'std',
			M: 'bookmobile-bus',
			S: 'bookmobile-trolley'
		}

		for (i in json) {
			newJson.push({
				name: json[i].name,
				description: json[i].description,
				title: json[i].name,
				lat: json[i].latitude,
				lng: json[i].longitude,
				start: json[i].start_year.toString(),
				end: json[i].end_year ? json[i].end_year.toString() : currYear.toString(),
				id: json[i].id,
				type: btypeToIcon[json[i].btype]
			});
		}
		return newJson;
	};

	Timeline.prototype.processBranchesByStart = function(json) {
		this.branches.byStart = this.processBranches(json.objects);

		this.hideShowOnScroll();
	};

	Timeline.prototype.processBranchesByEnd = function(json) {
		json = json.objects;
		var endNotNulls = [];
		var endNulls = [];
		for (i in json) {
			if(json[i].end_year) {
				endNotNulls.push(json[i]);
			}
			else {
				endNulls.push(json[i]);
			}
		}
		for (i in endNulls) {
			endNotNulls.push(endNulls[i]);
		}
		this.branches.byEnd = this.processBranches(endNotNulls);

		this.hideShowOnScroll();
	};

	Timeline.prototype.processTilesByStart = function(json) {
		json = json.objects;
		var newJson = [];
		for(i in json) {
			newJson.push({
				start : json[i].start_year.toString(),
				end : json[i].start_year.toString(),
				folder : json[i].base_folder.toString()
			});
		}

		var currYear = new Date().getFullYear() - 6;

		newJson.push({
			start : currYear.toString(),
			end : currYear.toString()
		})

		this.tiles.byStart = newJson;

		this.tiles.showFunction(this.tiles.byStart[0]);
		this.hideShowOnScroll();
	};

	Timeline.prototype.processTilesByEnd = function(json) {
		json = json.objects;
		var newJson = [];
		for(i in json) {
			newJson.push({
				start : json[i].start_year.toString(),
				end : json[i].start_year.toString(),
				folder : json[i].base_folder.toString()
			});
		}

		var currYear = new Date().getFullYear() - 6;

		newJson.push({
			start : currYear.toString(),
			end : currYear.toString(),
			folder : null
		})

		this.tiles.byEnd = newJson;

		this.hideShowOnScroll();
	};

	Timeline.prototype.setNumbers = function() {
		var maxVisDate = this.tl._bands[0].getMaxVisibleDate();
		var minVisDate = this.tl._bands[0].getMinVisibleDate();

		var maxVisYear = maxVisDate.getFullYear();
		var minVisYear = minVisDate.getFullYear();

		if(this.maxVisYear != maxVisYear) {
			this.maxVisYear = maxVisYear;
			this.rightNumber.html(maxVisYear.toString());
		}
		if(this.minVisYear != minVisYear) {
			this.minVisYear = minVisYear;
			this.leftNumber.html(minVisYear.toString());
		}
	}

	Timeline.prototype.newMouseUp = function(mVal) {
		this.tl._bands[1]._onMouseUp2(mVal);

		this.recenterTimeWindow();
	};

	Timeline.prototype.newMouseMove = function(mValx, mValy) {
		if(this.recenterTimeWindow()) {
			this.tl._bands[1]._onMouseMove2(mValx, mValy);
		}
	}

	Timeline.prototype.recenterTimeWindow = function() {
		var maxVisDate = this.tl._bands[0].getMaxVisibleDate().getTime();
		var minVisDate = this.tl._bands[0].getMinVisibleDate().getTime();

		if(this.startYear && this.endYear) {
			if(this.endYear.getFullYear() - this.startYear.getFullYear() <= 10) {
				this.tl._bands[0].setMaxVisibleDate(this.endYear);
				return false;
			}
			else if(this.endYear != null && maxVisDate > this.endYear.getTime() && Math.abs((maxVisDate - this.endYear.getTime()) / maxVisDate) > 0.01) {
				this.tl._bands[0].setMaxVisibleDate(this.endYear);
				return false;
			}
			else if(this.startYear != null && minVisDate < this.startYear.getTime() && Math.abs((this.startYear.getTime() - minVisDate) / minVisDate) > 0.01)  {
				this.tl._bands[0].setMinVisibleDate(this.startYear);
				return false;
			}
			else {
				return true;
			}
		}
	};

	Timeline.prototype.hideShowOnScroll = function (scrollVal){

		var self = this;

    	self.recenterTimeWindow();

		var rightVisibleDate = self.tl._bands[0].getMaxVisibleDate().getTime();
		var leftVisibleDate = self.tl._bands[0].getMinVisibleDate().getTime();
		
		self.currentYear = self.tl._bands[0].getCenterVisibleDate().getFullYear();

		var currDate;
		var hasChangedSomething;

		var doHideShow = function(obj) {

			try{

			if(!obj.byStart.length) {
				return;
			}

			//compare rightVisibleDate with the next start date and show if needed
			do {
				hasChangedSomething = false;
				if(obj.rightVisible + 1 < obj.byStart.length) {
					currDate = new Date(obj.byStart[obj.rightVisible + 1].start.toString()).getTime();
					if(currDate < rightVisibleDate) {
						hasChangedSomething = true;
						obj.rightVisible++;
						obj.showFunction(obj.byStart[obj.rightVisible]);
					}
				}
			}
			while(hasChangedSomething)

			//compare leftVisibleDate with the next end date and show if needed
			do {
				hasChangedSomething = false;
				if(obj.leftVisible > 0) {
					currDate = new Date(obj.byEnd[obj.leftVisible - 1].end.toString()).getTime();
					if(currDate > leftVisibleDate) {
						hasChangedSomething = true;
						obj.leftVisible--;
						obj.showFunction(obj.byEnd[obj.leftVisible]);
					}
				}
			}
			while(hasChangedSomething) 

			//compare rightVisibleDate with the next end date and hide if needed
			do {
				hasChangedSomething = false;
				if(obj.rightVisible >= 0) {
					currDate = new Date(obj.byStart[obj.rightVisible].start.toString()).getTime();
					if(currDate > rightVisibleDate) {
						hasChangedSomething = true;
						obj.hideFunction(obj.byStart[obj.rightVisible]);
						obj.rightVisible--;
					}
				}
			}
			while(hasChangedSomething) 

			//compare leftVisibleDate with the next start date and hide if needed
			do {
				hasChangedSomething = false;
				if (obj.leftVisible < obj.byEnd.length) {
					currDate = new Date(obj.byEnd[obj.leftVisible].end.toString()).getTime();
					if(currDate < leftVisibleDate) {
						hasChangedSomething = true;
						obj.hideFunction(obj.byEnd[obj.leftVisible]);
						obj.leftVisible++;
					}
				}
			}
			while(hasChangedSomething) 

			}catch(e) {
				
			}

		}

		doHideShow(self.branches);
		doHideShow(self.stories);

		rightVisibleDate = self.tl._bands[0].getCenterVisibleDate().getTime();
		leftVisibleDate = rightVisibleDate;

		doHideShow(self.tiles);
	};

	Timeline.prototype.setTimelineStartDate = function(startDate) {
		var self = this;

		if(self.startYear == null || startDate < self.startYear) {

			self.startYear = startDate;

			var bsDate = startDate.getFullYear() - (startDate.getFullYear() % 10);

		    self.blockedStartYear = new Date(startDate.toString());
		    self.blockedStartYear.setFullYear(bsDate);

			self.tl._bands[1]._decorators[0]._endDate = self.blockedStartYear;

			self.tl._bands[1]._decorators[1]._startDate = self.blockedStartYear;
			self.tl._bands[1]._decorators[1]._endDate = self.startYear;

			self.tl._bands[1]._decorators[0].paint();
			self.tl._bands[1]._decorators[1].paint();

			self.tl.timeline_start = startDate;

			this.recenterTimeWindow();
		}
	};

	Timeline.prototype.setTimelineEndDate = function(endDate) {
		var self = this;

		if(self.endYear == null || endDate > self.endYear) {

			self.endYear = endDate;

			var beDate = (endDate.getFullYear() + 10) - (endDate.getFullYear() % 10);

		    self.blockedEndYear = new Date(endDate.toString());
		    self.blockedEndYear.setFullYear(beDate);

			self.tl._bands[1]._decorators[3]._startDate = self.blockedEndYear;

			self.tl._bands[1]._decorators[2]._startDate = self.endYear;
			self.tl._bands[1]._decorators[2]._endDate = self.blockedEndYear;

			self.tl._bands[1]._decorators[2].paint();
			self.tl._bands[1]._decorators[3].paint();

			self.tl.timeline_stop = endDate;

			this.recenterTimeWindow();
		}
	};

	Timeline.prototype.setBoundsByBranch = function(branchData) {
		var self = this;

		var bsYear = branchData.start_year;
		var beYear = branchData.end_year ? branchData.end_year : new Date().getFullYear();

		while(beYear - bsYear <= 2) {
			bsYear--;
		}

		var branchStartYear = new Date(Date.UTC(bsYear.toString(), 0, 1));
		this.setTimelineStartDate(branchStartYear);

		var branchEndYear;
		if(branchData.end_year) {
			branchEndYear = new Date(Date.UTC(beYear.toString(), 0, 1));
		}
		else {
			branchEndYear = new Date();
		}
		this.setTimelineEndDate(branchEndYear);
	};

	Timeline.prototype.enterBranchView = function(branchID, viewer) {
		var self = this;

		self.branchViewer = viewer;
		self.startYear = null;
		self.endYear = null;

		$.get(Environment.routes.apiBase + '/story/?format=json&branch=' + branchID + '&order_by=year', function(json) {self.processStories(json);});
	
		$.get(Environment.routes.apiBase + '/branch/' + branchID + '/?format=json', function(json) {self.setBoundsByBranch(json);});
		
	};

	Timeline.prototype.initTimeline = function(prefs, branchID, branchViewer) {
		var self = this;

		if(!self.hasInitialized) {
			self.branches = {
				byStart : [],
				byEnd : [],
				hideFunction : function(data) {
					try {
						self.map.hidePin(new BranchPin(data));
					}
					catch(e) {

					}
				},
				showFunction : function(data) {
					try {
						self.map.showPin(new BranchPin(data));
					}
					catch(e) {
						
					}
				},
				rightVisible : -1,
				leftVisible : 0
			}

			self.stories = {
				byStart : [],
				byEnd : [],
				hideFunction : function(data) {
					try {
						self.branchViewer.hidePin(new StoryPin(data.content_type, data.id, data.title));
					}
					catch(e) {
						
					}
				},
				showFunction : function(data) {
					try {
						self.branchViewer.showPin(new StoryPin(data.content_type, data.id, data.title));
					}
					catch(e) {
						
					}
				},
				rightVisible : -1,
				leftVisible : 0
			}

			self.tiles = {
				byStart : [],
				byEnd : [],
				hideFunction : function(data) {

				},
				showFunction : function(data) {
					try {
						if(self.map.setMap) {
							self.map.setMap(data.folder);
						}
					}
					catch(e) {
						
					}
				},
				rightVisible : -1,
				leftVisible : 0
			}

			var decadePixels = 150;

			var timelineTheme = Simile.ClassicTheme.create();

			self.startYear = new Date(Date.UTC(prefs.timeline_start_date.year, prefs.timeline_start_date.month - 1, prefs.timeline_start_date.day));
		    self.endYear = new Date(Date.UTC(prefs.timeline_end_date.year, prefs.timeline_end_date.month - 1, prefs.timeline_end_date.day));

		    var bsDate = prefs.timeline_start_date.year - (prefs.timeline_start_date.year % 10);
		    var beDate = (prefs.timeline_end_date.year + 10) - (prefs.timeline_end_date.year % 10);

		    self.blockedStartYear = new Date(Date.UTC(bsDate, prefs.timeline_start_date.month - 1, prefs.timeline_start_date.day));
		    self.blockedEndYear = new Date(Date.UTC(beDate, prefs.timeline_end_date.month - 1, prefs.timeline_end_date.day));


		    var endHighLight = new Date(self.endYear.toString());
		    endHighLight.setFullYear(endHighLight.getFullYear() + 1000);

		    var beginHighLight = new Date(self.startYear.toString());
		    beginHighLight.setFullYear(beginHighLight.getFullYear() - 1000);

			timelineTheme.timeline_start = self.startYear;
			timelineTheme.timeline_stop = self.endYear;
			//timelineTheme.mouseWheel = 'zoom';

			var bandInfos = [
				Simile.createBandInfo({
					width : "0%",
					intervalUnit : Simile.DateTime.YEAR,
					intervalPixels : self.viewport.width()/10,
					theme : timelineTheme
				}),
				Simile.createBandInfo({
					width : "100%",
					intervalUnit : Simile.DateTime.DECADE,
					intervalPixels : decadePixels,
					showEventText : false,
					overview : true,
					theme : timelineTheme
					/*zoomIndex : 1,
					zoomSteps : [
						{
							pixelsPerInterval : (decadePixels),
							unit : Simile.DateTime.FIVEYEAR
						},
						{
							pixelsPerInterval : decadePixels,
							unit : Simile.DateTime.DECADE
						}
					]*/
				})
			];

			bandInfos[1].decorators = [
				new Simile.SpanHighlightDecorator({
					startDate : beginHighLight,
					endDate : self.blockedStartYear,
					opacity : 100,
					inFront : true
				}),
				new Simile.SpanHighlightDecorator({
					startDate : self.blockedStartYear,
					endDate : self.startYear,
					opacity : 100
				}),
				new Simile.SpanHighlightDecorator({
					startDate : self.endYear,
					endDate : self.blockedEndYear,
					opacity : 100
				}),
				new Simile.SpanHighlightDecorator({
					startDate : self.blockedEndYear,
					endDate : endHighLight,
					opacity : 100,
					inFront : true
				})
			];
		    
		    bandInfos[1].syncWith = 0;
		    bandInfos[1].highlight = true;
		    self.tl = Simile.create(self.viewport[0], bandInfos);

			var startingDate = new Date(Date.UTC(prefs.timeline_init_date, prefs.timeline_init_date.month - 1, prefs.timeline_init_date.day));
			//If an alternate start date was specified, use that instead
		    if(typeof this.startingDate != 'undefined' && this.startingDate != null) {
		    	startingDate = this.startingDate;
			}

			self.tl._bands[0].addOnScrollListener(function(scrollVal) {self.hideShowOnScroll(scrollVal);});
			self.tl._bands[0].addOnScrollListener(function() {self.setNumbers();});
			self.tl._bands[0].addOnScrollListener(function() {self.recenterTimeWindow();});

			self.tl._bands[1]._onMouseUp2 = self.tl._bands[1]._onMouseUp;
			self.tl._bands[1]._onMouseUp = function(mValx, mValy) {self.newMouseUp(mValx, mValy);};

			/*self.tl._bands[1]._onMouseMove2 = self.tl._bands[1]._onMouseMove;
			self.tl._bands[1]._onMouseMove = function(mValx, mValy) {self.newMouseMove(mValx, mValy);};*/

			self.tl._bands[0].setCenterVisibleDate(startingDate);

			self.hideShowOnScroll();
			self.setNumbers();

			self.recenterTimeWindow();

			/*$.ajax({
				URL: Environment.routes.apiBase + '/branch/?format=json&order_by=start_year',
				success: function(json) {
					self.processBranchesByStart(json);
				},
				timeout: 1000
			});
			$.ajax({
				URL: Environment.routes.apiBase + '/branch/?format=json&order_by=end_year',
				success: function(json) {
					self.processBranchesByEnd(json);
				},
				timeout: 1000
			});*/

			$.ajaxSetup({timeout: 200000});

			$.get(Environment.routes.apiBase + '/branch/?format=json&order_by=start_year', function(json) {self.processBranchesByStart(json);});
			$.get(Environment.routes.apiBase + '/branch/?format=json&order_by=end_year', function(json) {self.processBranchesByEnd(json);});
			
			/*$.ajax({
				URL: Environment.routes.apiBase + 'maps/?format=json&order_by=start_year',
				success: function(json) {
					self.processTilesByStart(json);
				},
				timeout: 1000
			});
			$.ajax({
				URL: Environment.routes.apiBase + 'maps/?format=json&order_by=start_year',
				success: function(json) {
					self.processTilesByEnd(json);
				},
				timeout: 1000
			});*/

			$.get(Environment.routes.apiBase + '/maps/?format=json&order_by=start_year', function(json) {self.processTilesByStart(json);});
			$.get(Environment.routes.apiBase + '/maps/?format=json&order_by=start_year', function(json) {self.processTilesByEnd(json);});

			self.viewport.find('.timeline-ether-highlight').append(self.leftNumber).append(self.rightNumber);

			self.maxYearCount
			self.startYearLoop(100, 30);

			self.hasInitialized = true;

		}

		if(branchViewer) {
			self.enterBranchView(branchID, branchViewer);
		}


	};

	Timeline.prototype.startYearLoop = function(interval, maxYearCount) {
		var self = this;
		self.maxYearCount = maxYearCount;
		self.yearInterval = setInterval(function(){self.yearLoop();}, interval);
	}

	Timeline.prototype.stopYearLoop = function() {
		var self = this;
		clearInterval(self.yearInterval)
	}

	Timeline.prototype.yearLoop = function() {
		var self = this;

		if(self.stoppedYear == self.currentYear) {
			if(self.yearCount <= self.maxYearCount) {
				if(self.yearCount != self.maxYearCount) {
					self.yearCount++;
				}
				else {
					self.yearCount++;
					try {
						if(self.branchViewer) {self.branchViewer.setYear(self.stoppedYear);}
					}
					catch(e) {

					}
					try {
						if(self.map) {self.map.setYear(self.stoppedYear);}
					}
					catch(e) {
						
					}
				}
			}
		}
		else {
			self.yearCount = 0;
			self.stoppedYear = self.currentYear;
		}
	}
	

	var resizeTimerID = null;
	Timeline.prototype.onResize = function () {
		var self = this;
	    if (resizeTimerID == null) {
	        resizeTimerID = window.setTimeout(function () {
	            resizeTimerID = null;
	             self.tl.layout();
	             self.recenterTimeWindow();
	        }, 300);
	    }
	};

	return Timeline;

})();

//End module
});