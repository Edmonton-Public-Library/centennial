var myTimeline = new Object();

var tl;
myTimeline.displayVisualization = function(container, json) {
	var eventSource = new Timeline.DefaultEventSource();
  var bandInfos = [
	/*Timeline.createBandInfo({
		eventSource:	eventSource,
		date:           json.stats[0].lastDate,
        width:          "20%", 
        intervalUnit:   Timeline.DateTime.HOUR, 
        intervalPixels: 100
	}),*/
	Timeline.createBandInfo({
		eventSource:	eventSource,
		date:           json.stats[0].lastDate,
        width:          "65%", 
        intervalUnit:   Timeline.DateTime.DAY, 
        intervalPixels: 100
	}),
    Timeline.createBandInfo({
		showEventText:  false,
        trackHeight:    0.5,
        trackGap:       0.2,
        eventSource:    eventSource,
		date:           json.stats[0].lastDate,
        width:          "35%", 
        intervalUnit:   Timeline.DateTime.MONTH, 
        intervalPixels: 200
    })
  ];
  
  /*bandInfos[1].syncWith = 0;
  bandInfos[2].syncWith = 1;
  bandInfos[2].highlight = true;
  bandInfos[2].eventPainter.setLayout(bandInfos[1].eventPainter.getLayout());*/
  
  bandInfos[1].syncWith = 0;
  bandInfos[1].highlight = true;
  bandInfos[1].eventPainter.setLayout(bandInfos[0].eventPainter.getLayout());
  
  tl = Timeline.create(document.getElementById(container), bandInfos);
	eventSource.loadJSON(json, "");
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