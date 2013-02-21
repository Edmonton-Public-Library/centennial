
var tm;

$(document).ready(function() {
  doLoadTimemap();
});

function doLoadTimemap() {
    var mapid = "map";
    var timelineid = "timeline";
    var decadePixels = 150;

    
    tm = TimeMap.init({
        mapId: mapid,               // Id of map div element (required)
        timelineId: timelineid,     // Id of timeline div element (required)
        options: {
            eventIconPath: "../images/"
        },
        datasets: [
            {
                id: "artists",
                title: "Artists",
                theme: "orange",
                // note that the lines below are now the preferred syntax
                type: "basic",
                options: {
                    items: [
                        {
                          "start" : "1449",
                          "end" : "1494-01-11",
                          "point" : {
                              "lat" : 43.7717,
                              "lon" : 11.2536
                           },
                          "title" : "Domenico Ghirlandaio",
                          "options" : {
                            // set the full HTML for the info window
                            "infoHtml": "<div class='custominfostyle'><b>Domenico Ghirlandaio</b> was a visual artist of some sort.</div>"
                          }
                        },
                        {
                          "start" : "1452",
                          "end" : "1519",
                          "point" : {
                              "lat" : 43.8166666667,
                              "lon" : 10.7666666667
                           },
                          "title" : "Leonardo da Vinci",
                          "options" : {
                            // load HTML from another file via AJAX
                            // Note that this may break in IE if you're running it with
                            // a local file, due to cross-site scripting restrictions
                            "infoUrl": "ajax_content.html",
                            "theme": "red"
                          }
                        },
                        {
                          "start" : "1475",
                          "end" : "1564",
                          "point" : {
                              "lat" : 43.6433,
                              "lon" : 11.9875
                           },
                          "title" : "Michelangelo",
                          "options" : {
                            // use the default title/description info window
                            "description": "Renaissance Man",
                            "theme": "yellow"
                          }
                        }
                    ]
                }
            }
        ],
        bandInfo: [
          {
            width:            "0%",
            intervalUnit:     Timeline.DateTime.YEAR,
            intervalPixels:   $("#" + timelineid).width()/10,
            showEventText:    false,
            overview:         true,
          },
          {
            width:            "100%",
            intervalUnit:     Timeline.DateTime.DECADE,
            intervalPixels:   decadePixels - 0.1,
            showEventText:    false,
            overview:         true,
            syncWith:         0,
            highlight:        true
          }
        ]
    });
    
    

    var snaptodecade = function(clickedSpot){
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

    tm.timeline._bands[1]._autoScroll2 = tm.timeline._bands[1]._autoScroll;
    tm.timeline._bands[1]._autoScroll = snaptodecade;

};