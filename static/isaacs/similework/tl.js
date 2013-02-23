$(function() {
  showBranchTimeline();
});

function showBranchTimeline() {

  var container = "timeline";

  var decadePixels = 150;

  var eventSource = new Timeline.DefaultEventSource();

  var pinsByStart;
  var pinsByEnd;

  var inputBandInfo = [
    {
      width:            "0%",
      intervalUnit:     Timeline.DateTime.YEAR,
      intervalPixels:   $("#" + container).width()/10,
      eventSource:    eventSource
    },
    {
      width:            "100%",
      intervalUnit:     Timeline.DateTime.DECADE,
      intervalPixels:   decadePixels,
      showEventText:    false,
      overview:         true,
      eventSource:    eventSource
    }
  ];

  var doShowPin = function(branchData) {
    //insert function call to show the pin here
    console.log("showing: " + branchData.name);
  };

  var doHidePin = function(branchData) {
    //insert function call to hide the pin here
    console.log("hiding: " + branchData.name);
  };

  var processBranches = function(json) {
    var newJson = [];
    for (i in json) {
      newJson.push({
        name:       json[i].name,
        title:      json[i].name,
        lat:        json[i].latitude,
        lng:        json[i].longitude,
        start:      json[i].start_year,
        end:        json[i].end_year ? json[i].end_year : "2014",
        id:         json[i].id
      });
    }
    return newJson;
  }
  

  var processPinsByStart = function(json) {
    pinsByStart = processBranches(json.objects);
    checkIfReadyToLoad();
  }

  var processPinsByEnd = function(json) {
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
  }

  var checkIfReadyToLoad = function() {
    if(pinsByStart != undefined && pinsByEnd != undefined) {
      loadTimeline(pinsByStart, pinsByEnd, "start", "end", container, inputBandInfo, eventSource, doShowPin, doHidePin);
    }
  }

  postJsonRequest("http://127.0.0.1:8000/api/v1/branch/?format=json&order_by=start_year", processPinsByStart);
  postJsonRequest("http://127.0.0.1:8000/api/v1/branch/?format=json&order_by=end_year", processPinsByEnd);
  
}

function postJsonRequest(url, callback) {
  var req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.onreadystatechange = function() {
    if(req.readyState == 4) {
      if(req.status == 200) {
        var resultJson = JSON.parse(req.responseText);
        callback(resultJson);
      }
      else {
        console.log("error retrieving data");
      }
    }
  }
  req.send();
}

function loadTimeline(pinsByStart, pinsByEnd, startTag, endTag, container, inputBandInfo, eventSource, showPin, hidePin){

    var tl;
    var rightVisiblePin = -1;
    var leftVisiblePin = 0;

    var decadePixels = 150;

    var bandInfos = [];

    for (bInfo in inputBandInfo) {
      bandInfos.push(Timeline.createBandInfo(inputBandInfo[bInfo]));
    }
    
    bandInfos[1].syncWith = 0;
    bandInfos[1].highlight = true;

    tl = Timeline.create(document.getElementById(container), bandInfos);
    eventSource.loadJSON({events: pinsByStart}, "");

    var scrollByDecade = function(clickedSpot){
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
    }

    var hideShowOnScroll = function(){
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

}

var resizeTimerID = null;
function onResize() {
    if (resizeTimerID == null) {
        resizeTimerID = window.setTimeout(function() {
            resizeTimerID = null;
            tl.layout();
        }, 500);
    }
}