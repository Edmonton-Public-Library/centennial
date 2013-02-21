var generateDescription = function (d) {
	var total = d.sent + d.received;
 	return "Sent: " + d.sent + "<br/>Received: " + d.received + "<br/>Total: " + total + (d.selfMessages ? ("<br/>Plus " + d.selfMessages + " message" + ((d.selfMessages == 1) ? "" : "s") + " to self") : "");
}

function groupClick() {
	return function(d){
		displayInfoWindow(d.title, generateDescription(d));
	};
}

function averageColours(c1, c2, w1, w2) {
	var tw = w1 + w2;
	if(isNaN(tw)) {
		tw = 1;
		w1 = 0.5;
		w2 = 0.5;
	}
	w1 = w1/tw;
	w2 = w2/tw;
	var c1a = c1.split("");
	var c2a = c2.split("");
	var c11 = c1a[1] + "" + c1a[2];
	var c12 = c1a[3] + "" + c1a[4];
	var c13 = c1a[5] + "" + c1a[6];
	var c21 = c2a[1] + "" + c2a[2];
	var c22 = c2a[3] + "" + c2a[4];
	var c23 = c2a[5] + "" + c2a[6];
	c11 = parseInt(c11, 16);
	c12 = parseInt(c12, 16);
	c13 = parseInt(c13, 16);
	c21 = parseInt(c21, 16);
	c22 = parseInt(c22, 16);
	c23 = parseInt(c23, 16);
	c11 = Math.round((c11*w1 + c21*w2));
	c12 = Math.round((c12*w1 + c22*w2));
	c13 = Math.round((c13*w1 + c23*w2));
	c11 = c11.toString(16);
	c12 = c12.toString(16);
	c13 = c13.toString(16);
	c11 = (c11.split("").length < 2 ? "0" + c11 : c11);
	c12 = (c12.split("").length < 2 ? "0" + c12 : c12);
	c13 = (c13.split("").length < 2 ? "0" + c13 : c13);
	var retVal = "#" + c11 + c12 + c13;
	return retVal;
}

var myChord = new Object();
myChord.displayVisualization = function (container, json) {

	

	// From http://mkweb.bcgsc.ca/circos/guide/tables/
	var chord = d3.layout.chord()
		.padding(.05)
		.sortSubgroups(d3.descending)
		.json(json);

	var width = 600,
		height = 600,
		innerRadius = Math.min(width, height) * .41,
		outerRadius = innerRadius * 1.1;

	var svg = d3.select("#" + container)
	  .append("svg")
		.attr("width", width)
		.attr("height", height)
	  .append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var c = svg.append("g")
	  .selectAll("path")
		.data(chord.groups)
	  .enter().append("path")
		.style("fill", function(d) { return d.colour;})
		.style("stroke", function(d) { return d.colour;})
		.attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
		.on("mouseover", fade(.1))
		.on("mouseout", fade(1))
		.on("mouseup", groupClick());
		
	c.append("title")
      .text(function(d) { return d.title; });

	var ticks = svg.append("g")
	  .selectAll("g")
		.data(chord.groups)
	  .enter().append("g")
	  .selectAll("g")
		.data(groupTicks)
	  .enter().append("g")
		.attr("transform", function(d) {
		  return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
			  + "translate(" + outerRadius + ",0)";
		});

	ticks.append("line")
		.attr("x1", 1)
		.attr("y1", 0)
		.attr("x2", 5)
		.attr("y2", 0)
		.style("stroke", "#000");

	ticks.append("text")
		.attr("x", 8)
		.attr("dy", ".35em")
		.attr("text-anchor", function(d) {
		  return d.angle > Math.PI ? "end" : null;
		})
		.attr("transform", function(d) {
		  return d.angle > Math.PI ? "rotate(180)translate(-16)" : null;
		})
		.text(function(d) { return d.label; });

	var test = svg.append("g")
		.attr("class", "chord")
	  .selectAll("path")
		.data(chord.chords)
	  .enter().append("path")
		//.style("fill", function(d) { return chord.groups()[d.target.index].colour;})
		.style("fill", function(d) { return d.source.colour ? d.source.colour : averageColours(chord.groups()[d.source.index].colour, chord.groups()[d.target.index].colour, Math.abs(d.source.startAngle - d.source.endAngle), Math.abs(d.target.startAngle - d.target.endAngle)); })
		.attr("d", d3.svg.chord().radius(innerRadius))
		.style("opacity", 1);
		
		test.append("title")
      .text(function(d) { return d.name; });

	/** Returns an array of tick angles and labels, given a group. */
	function groupTicks(d) {
	  var k = (d.endAngle - d.startAngle) / d.value;
	  var step = Math.round(json.totals[0].totalMessages / 90);
	  step = (step ? step : 1);
	  return d3.range(0, d.value, step).map(function(v, i) {
		return {
		  "angle": v * k + d.startAngle,
		  "label": (json.totals[0].totalMessages < 40) ? v : (i % 5 ? null : v)
		};
	  });
	}

	/** Returns an event handler for fading a given chord group. */
	function fade(opacity) {
	  return function(g, i) {
		svg.selectAll("g.chord path")
			.filter(function(d) {
			  return d.source.index != i && d.target.index != i;
			})
		  .transition()
			.style("opacity", opacity);
	  };
	}
}