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
	};

	Timeline.prototype.showBranchTimeline = function () {

		var self = this,
			decadePixels = 150,
			eventSource = new Simile.DefaultEventSource(),
			pinsByStart,
			pinsByEnd;

		var inputBandInfo = [
			{
				width: "0%",
				intervalUnit: Simile.DateTime.YEAR,
				intervalPixels: self.viewport.width()/10,
				eventSource: eventSource
			},
			{
				width: "100%",
				intervalUnit: Simile.DateTime.DECADE,
				intervalPixels: decadePixels,
				showEventText: false,
				overview: true,
				eventSource: eventSource
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
			for (i in json) {
				newJson.push({
					name: json[i].name,
					description: json[i].description,
					title: json[i].name,
					lat: json[i].latitude,
					lng: json[i].longitude,
					start: json[i].start_year,
					end: json[i].end_year ? json[i].end_year : "2014",
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
				self.load(pinsByStart, pinsByEnd, "start", "end", inputBandInfo, eventSource, doShowPin, doHidePin);
			}
		};

		$.get(Environment.routes.apiBase + '/branch/?format=json&order_by=start_year', processPinsByStart);
		$.get(Environment.routes.apiBase + '/branch/?format=json&order_by=end_year', processPinsByEnd);
	};

	Timeline.prototype.load = function (pinsByStart, pinsByEnd, startTag, endTag, inputBandInfo, eventSource, showPin, hidePin) {
		var self = this;
	    var tl;
	    var rightVisiblePin = -1;
	    var leftVisiblePin = 0;

	    var decadePixels = 150;

	    var bandInfos = [];

	    for (bInfo in inputBandInfo) {
	      bandInfos.push(Simile.createBandInfo(inputBandInfo[bInfo]));
	    }
	    
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

			hideShowOnScroll();

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