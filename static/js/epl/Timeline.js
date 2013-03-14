;
define(['lib/simile', 'epl/Environment', 'epl/map/BranchPin'], function (Simile, Environment, BranchPin) {

return (function () {

	var Timeline = function (viewport, map) {
		var self = this;
		this.viewport = $(viewport);
		this.map = map;
		//When the document is ready, initialize the timeline's DOM element
		$(document).ready(function () {
			self.showBranchTimeline();
		});

		$(window).bind('resize', function () {
			self.onResize();
		});
	};

	Timeline.prototype.showStoryTimeline = function(branchID) {
		var self = this,
			yearPixels = 150,
			eventSource = new Simile.DefaultEventSource(),
			storiesByStart,
			storiesbyEnd;

		var timelineTheme = Simile.ClassicTheme.create();

		//set start date here
		//set end date here

		var inputBandInfo = [
			{
				width : "0%",
				intervalUnit : Simile.DateTime.YEAR,
				intervalPixels : self.viewport.width(),
				eventSource : eventSource,
				theme : timelineTheme
			},
			{
				width : "100%",
				intervalUnit : Simile.DateTime.YEAR,
				intervalPixels : yearPixels,
				showEventText : true,
				theme : timelineTheme,
				eventSource: eventSource
			}
		];

		var doShowStory = function(storyData) {
			//put code to show the story here
		};

		var doHideStory = function(storyData) {
			//put code to hide the story here
		};

		var processStories = function(json) {
			json = json.objects;
			var newJson = [];
			for (i in json) {
				newJson.push({
					title: json[i].title,
					description: json[i].description,
					start: json[i].year.toString(),
					end: json[i].year.toString(),
					id: json[i].id,
					instant : "true"
				});
			}
			self.load(newJson, newJson, "start", "end", inputBandInfo, timelineTheme, eventSource, doShowStory, doHideStory);
		}

		$.get(Environment.routes.apiBase + '/story/?format=json&branch=' + branchID, processStories);
	}

	Timeline.prototype.showBranchTimeline = function () {

		var self = this,
			decadePixels = 150,
			eventSource = new Simile.DefaultEventSource(),
			pinsByStart,
			pinsByEnd;

		var timelineTheme = Simile.ClassicTheme.create();

		timelineTheme.timeline_start = new Date(Date.UTC(1900, 0, 1));
		timelineTheme.timeline_stop = new Date();

		var inputBandInfo = [
			{
				width : "0%",
				intervalUnit : Simile.DateTime.YEAR,
				intervalPixels : self.viewport.width()/10,
				eventSource : eventSource,
				theme : timelineTheme
			},
			{
				width : "100%",
				intervalUnit : Simile.DateTime.DECADE,
				intervalPixels : decadePixels,
				showEventText : false,
				overview : true,
				theme : timelineTheme,
				//eventSource: eventSource
			}
		];

		var doShowPin = function (branchData) {
			self.map.showPin(new BranchPin(branchData));
		};

		var doHidePin = function (branchData) {
			self.map.hidePin(new BranchPin(branchData));
		};

		var processBranches = function (json) {
			var newJson = [];
			var currYear = new Date().getFullYear().toString();
			for (i in json) {
				newJson.push({
					name: json[i].name,
					description: json[i].description,
					title: json[i].name,
					lat: json[i].latitude,
					lng: json[i].longitude,
					start: json[i].start_year.toString(),
					end: json[i].end_year ? json[i].end_year : currYear,
					id: json[i].id
				});
			}
			return newJson;
		};

		var processPinsByStart = function (json) {
			pinsByStart = processBranches(json.objects);
			checkIfReadyToLoad();
		};

		var processPinsByEnd = function (json) {
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
			pinsByEnd = processBranches(endNotNulls);
			checkIfReadyToLoad();
		};

		var checkIfReadyToLoad = function () {
			if(pinsByStart != undefined && pinsByEnd != undefined) {
				self.load(pinsByStart, pinsByEnd, "start", "end", inputBandInfo, timelineTheme, eventSource, doShowPin, doHidePin);
			}
		};

		$.get(Environment.routes.apiBase + '/branch/?format=json&order_by=start_year', processPinsByStart);
		$.get(Environment.routes.apiBase + '/branch/?format=json&order_by=end_year', processPinsByEnd);
	};

	Timeline.prototype.load = function (pinsByStart, pinsByEnd, startTag, endTag, inputBandInfo, inputTheme, eventSource, showPin, hidePin) {
		var self = this;
	    var tl;
	    var rightVisiblePin = -1;
	    var leftVisiblePin = 0;

	    var startYear = inputTheme.timeline_start;
	    var endYear = inputTheme.timeline_stop;

	    var endHighLight = new Date(endYear.toString());
	    endHighLight.setFullYear(endHighLight.getFullYear() + 1000);

	    var beginHighLight = new Date(startYear.toString());
	    beginHighLight.setFullYear(beginHighLight.getFullYear() - 1000);

	    var decadePixels = 150;

	    var bandInfos = [];

	    for(i in inputBandInfo) {
	    	bandInfos.push(Simile.createBandInfo(inputBandInfo[i]));
	    }

		var outOfBoundsColor = "#000000";

		bandInfos[1].decorators = [
			new Simile.SpanHighlightDecorator({
				startDate : endYear,
				endDate : endHighLight,
				color : outOfBoundsColor,
				opacity : 80
			}),
			new Simile.SpanHighlightDecorator({
				startDate : beginHighLight,
				endDate : startYear,
				color : outOfBoundsColor,
				opacity : 80
			})
		];
	    
	    bandInfos[1].syncWith = 0;
	    bandInfos[1].highlight = true;
	    tl = Simile.create(self.viewport[0], bandInfos);
	    eventSource.loadJSON({events: pinsByStart}, "");

	    var scrollByDecade = function (clickedSpot){
			var newSpot = clickedSpot;
			var intmod = clickedSpot % decadePixels;
			newSpot -= intmod;
			if(Math.abs(intmod) > (decadePixels / 2)) {
				if(clickedSpot < 0) {
					newSpot -= decadePixels;
				}
				else {
					newSpot += decadePixels;
				}
			}
			this._autoScroll2(newSpot);
	    };

	    var hideShowOnScroll = function (){
			var rightVisibleDate = tl._bands[0].getMaxVisibleDate().getTime();
			var leftVisibleDate = tl._bands[0].getMinVisibleDate().getTime();

			var currDate;
			var hasChangedSomething;

			//compare rightVisibleDate with the next start date and show if needed
			do {
				hasChangedSomething = false;
				if(rightVisiblePin + 1 < pinsByStart.length) {
					currDate = new Date(pinsByStart[rightVisiblePin + 1].start.toString()).getTime();
					if(currDate < rightVisibleDate) {
						hasChangedSomething = true;
						rightVisiblePin++;
						showPin(pinsByStart[rightVisiblePin]);
					}
				}
			}
			while(hasChangedSomething)

			//compare leftVisibleDate with the next end date and show if needed
			do {
				hasChangedSomething = false;
				if(leftVisiblePin > 0) {
					currDate = new Date(pinsByEnd[leftVisiblePin - 1].end.toString()).getTime();
					if(currDate > leftVisibleDate) {
						hasChangedSomething = true;
						leftVisiblePin--;
						showPin(pinsByEnd[leftVisiblePin]);
					}
				}
			}
			while(hasChangedSomething) 

			//compare rightVisibleDate with the next end date and hide if needed
			do {
				hasChangedSomething = false;
				if(rightVisiblePin >= 0) {
					currDate = new Date(pinsByStart[rightVisiblePin].start.toString()).getTime();
					if(currDate > rightVisibleDate) {
						hasChangedSomething = true;
						hidePin(pinsByStart[rightVisiblePin]);
						rightVisiblePin--;
					}
				}
			}
			while(hasChangedSomething) 

			//compare leftVisibleDate with the next start date and hide if needed
			do {
				hasChangedSomething = false;
				if (leftVisiblePin < pinsByEnd.length) {
					currDate = new Date(pinsByEnd[leftVisiblePin].end.toString()).getTime();
					if(currDate < leftVisibleDate) {
						hasChangedSomething = true;
						hidePin(pinsByEnd[leftVisiblePin]);
						leftVisiblePin++;
					}
				}
			}
			while(hasChangedSomething) 
		}

			tl._bands[0].addOnScrollListener(hideShowOnScroll);
			//tl._bands[1]._autoScroll2 = tl._bands[1]._autoScroll;
			//tl._bands[1]._autoScroll = scrollByDecade;

			//tl._bands[0].setMaxVisibleDate(endYear);
			hideShowOnScroll();

			if(tl._bands[0].getMaxVisibleDate().getTime() > endYear.getTime()) {
				tl._bands[0].setMaxVisibleDate(endYear);
			}
			else if(tl._bands[0].getMinVisibleDate().getTime() > startYear.getTime()) {
				tl._bands[0].setMinVisibleDate(startYear);
			}

	};

	var resizeTimerID = null;
	//TODO: Hook up. But is this really needed? It seems to be working fine without running this.
	Timeline.prototype.onResize = function () {
	    if (resizeTimerID == null) {
	        resizeTimerID = window.setTimeout(function () {
	            resizeTimerID = null;
	            tl.layout();
	        }, 500);
	    }
	};

	return Timeline;

})();

//End module
});