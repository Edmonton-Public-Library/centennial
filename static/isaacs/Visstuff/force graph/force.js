
var lastmovex = 0;
var lastmovey = 0;
var mdown = 0;

function nodeEnter() {
	return function(d) {
		console.log(force.links);
	}
}

var generateDescription = function (d) {
 	return "Sent: " + d.sent + "<br/>Received: " + d.received + "<br/>Total: " + d.messages + (d.selfMessages ? ("<br/>Plus " + d.selfMessages + " message" + ((d.selfMessages == 1) ? "" : "s") + " to self") : "");
}

function nodeClick() {
	return function(d){
		mdown = 0
		displayInfoWindow(d.title, generateDescription(d));
	};
}

var myForce = new Object();

myForce.defaults = {
"defaultValues":{
		"charge":-150,
		"distance":100,
		"strength":4,
		"size":8,
		"area":220,
		"width":15,
		"shape":0
	},
	"mean":{
		"charge":-120,
		"distance":100,
		"strength":4,
		"size":8,
		"area":220,
		"width":15,
		"shape":5
	},
	"deviation":{
		"charge":50,
		"distance":15,
		"strength":0.4,
		"size":3,
		"area":100,
		"width":8,
		"shape":2
	},
	"min":{
		"distance":0,
		"strength":0,
		"size":0.1,
		"area":0,
		"width":1,
		"shape":3
	},
	"max":{
	},
	"inverted":{
		"distance":1
	},
	"direct":{
		"name":1,
		"colour":1,
		"source":1,
		"target":1
	}
}

myForce.displayVisualization = function(container, json) {
	
	var width = 700,
		height = 400;

	var force = d3.layout.force()
		.charge(function (d) {
			return isNaN(d.charge) ? myForce.defaults.defaultValues.charge : d.charge;
		})
		.linkDistance(function (d) {
			return isNaN(d.distance) ? myForce.defaults.defaultValues.distance : d.distance;
		})
		.linkStrength(function (d) {
			return isNaN(d.strength) ? myForce.defaults.defaultValues.strength : d.strength;
		})
		.size([width, height])
		.gravxy(width/2, height/2);

	var svg = d3.select("#" + container).append("svg")
		.attr("width", width)
		.attr("height", height);
		//.onClick = derp;
		
		document.getElementById(container).onmousedown = function(e){
			lastmovex = e.clientX;
			lastmovey = e.clientY;
			mdown = 1;
		};
		document.getElementById(container).onmouseup = function(e) {
			mdown = 0;
		};
		//document.getElementById(container).onmouseout = function(e) {
			//mdown = 0;
		//};
		document.getElementById(container).onmousemove = function(e) {
			if(force.alpha() == 0) { force.alpha(.0051); }
			if(mdown) {
				var deltax = e.clientX - lastmovex;
				var deltay = e.clientY - lastmovey;
				lastmovex = e.clientX;
				lastmovey = e.clientY;
				force.gravxy(force.gravxy().gx + deltax, force.gravxy().gy + deltay);
				force.alpha(0.05);
			}
		};
	
	force
      .nodes(json.nodes)
      .links(json.links)
      .start();

  var link = svg.selectAll("line.link")
      .data(json.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) {
			return Math.sqrt(isNaN(d.width) ? myForce.defaults.defaultValues.width : d.width);
		});
		
	var circleNodes = [];
	var polyNodes = [];
	for(var i in json.nodes) {
		if(isCircle(json.nodes[i])) {
			circleNodes[circleNodes.length] = json.nodes[i];
		}
		else {
			polyNodes[polyNodes.length] = json.nodes[i];
		}
	}

  var circleNode = svg.selectAll("circle.node")
      .data(circleNodes)
    .enter().append("circle")
      .attr("class", "node")
	  .attr("r", function(d) {
			return isNaN(d.size) ? myForce.defaults.defaultValues.size : d.size;
		})
      .style("fill", function(d) {
			return d.colour; 
		})
		.on("mouseup", nodeClick())
		.on("mousemove", function(d) {
			for(var i in force.links()) {
				if(force.links()[i].source.index == d.index || force.links()[i].target.index == d.index) {
					force.links()[i].highlighted = 1;
				}
			}
			if(mdown) {
				var deltax = e.clientX - lastmovex;
				var deltay = e.clientY - lastmovey;
				lastmovex = e.clientX;
				lastmovey = e.clientY;
				force.gravxy(force.gravxy().gx + deltax, force.gravxy().gy + deltay);
			}
			if(force.alpha() == 0) { force.alpha(.0051); }
		})
		.on("mouseout", function(d) {
			for(var i in force.links()) {
				if(force.links()[i].source.index == d.index || force.links()[i].target.index == d.index) {
					force.links()[i].highlighted = 0;
				}
			}
			if(force.alpha() == 0) { force.alpha(.0051); }
		});

  circleNode.append("title")
      .text(function(d) { return d.title; });
	  
	var polyNode = svg.selectAll("polygon.node")
      .data(polyNodes)
    .enter().append("polygon")
      .attr("class", "node")
      .style("fill", function(d) {
			return d.colour; 
		})
		.on("mouseup", nodeClick())
		.on("mousemove", function(d) {
			for(var i in force.links()) {
				if(force.links()[i].source.index == d.index || force.links()[i].target.index == d.index) {
					force.links()[i].highlighted = 1;
				}
			}
			if(mdown) {
				var deltax = e.clientX - lastmovex;
				var deltay = e.clientY - lastmovey;
				lastmovex = e.clientX;
				lastmovey = e.clientY;
				force.gravxy(force.gravxy().gx + deltax, force.gravxy().gy + deltay);
			}
			if(force.alpha() == 0) { force.alpha(.0051); }
		})
		.on("mouseout", function(d) {
			for(var i in force.links()) {
				if(force.links()[i].source.index == d.index || force.links()[i].target.index == d.index) {
					force.links()[i].highlighted = 0;
				}
			}
			if(force.alpha() == 0) { force.alpha(.0051); }
		});

  polyNode.append("title")
      .text(function(d) { return d.title; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })
		//.style("stroke-opacity", function(d) { return d.highlighted ? 1 : 0.6 })
		.style("stroke", function(d) { return d.highlighted ? '#000' : '#999' });

	polyNode.attr("points", function(d) {
		var shape = isNaN(d.shape) ? 3 : Math.round(d.shape);
		var size = isNaN(d.size) ? myForce.defaults.defaultValues.size : d.size;
		var inc = (2 * Math.PI) / shape;
		var currAngle = inc;
		var points = d.x + "," + (d.y - size);
		var x;
		var y;
		for(var i = 0; i < shape; i++) {
			x = Math.sin(currAngle);
			y = Math.cos(currAngle);
			x = x * size;
			y = y * size;
			points = points + " " + (d.x - Math.sin(currAngle) * size) + "," + (d.y - Math.cos(currAngle) * size);
			currAngle = currAngle + inc;
		}
		return points;
	});
	circleNode.attr("cx", function (d) { return d.x; })
		.attr("cy", function (d) { return d.y; });
  });
}