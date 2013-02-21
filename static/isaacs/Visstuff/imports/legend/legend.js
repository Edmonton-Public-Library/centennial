var rowHeight = 30;
var colPadding = 12;
var centerPadding = 4;
var dividingChar = ":";
var leftAlign = 100;	
	var width = 700,
		height = 700;
		
		


var legendTags = [];
var legend = {};
var legendMap = {};

function drawLegendElement(svg, value, type, cx, cy, isRight) {
	if(type == "colour" || type == "color") {
		return svg.append("circle")
			.attr("class", "circle")
			.attr("r", 8)
			.style("fill", value)
			.attr("cx", cx + (isRight ? 8 : -8))
			.attr("cy", cy)
			.node().getBBox();
	}
	else if(type == "shape") {
		cx = cx + (isRight ? 8 : -8);
		if(value < 3) {
			return svg.append("circle")
			.attr("class", "shape")
			.attr("r", 8)
			.style("fill", "#ffffff")
			.attr("cx", cx)
			.attr("cy", cy)
			.node().getBBox();
		}
		else {
			var shape = value;
			var size = 8;
			var inc = (2 * Math.PI) / shape;
			var currAngle = inc;
			var points = cx + "," + (cy - size);
			var x;
			var y;
			for(var i = 0; i < shape; i++) {
				x = Math.sin(currAngle);
				y = Math.cos(currAngle);
				x = x * size;
				y = y * size;
				points = points + " " + (cx - Math.sin(currAngle) * size) + "," + (cy - Math.cos(currAngle) * size);
				currAngle = currAngle + inc;
			}
			return svg.append("polygon")
				.attr("class", "shape")
				.style("fill", "#ffffff")
				.attr("points", points)
				.node().getBBox();
		}
	}
	else if(type == "image") {
		var size = 16;
		return svg.append("image")
			.attr("x", cx - (isRight ? 0 : size))
			.attr("y", cy - (size/2))
			.attr("width", size)
			.attr("height", size)
			.attr("xlink:href", value)
			.node().getBBox();
	}
	else {
		return svg.append("text")
			.attr("x", cx)
			.attr("y", cy + 4)
			.attr("fill","#000")
			.attr("text-anchor", (isRight ? "start" : "end"))
			.text(value)
			.node().getBBox();
	}
}


function addALegendElement(svg, json, i) {
	drawLegendElement(svg, json[i].from, json[i].fromType, colInc/2 + leftAlign, (i * rowInc) + rowInc);
	drawLegendElement(svg, ":", "string", colInc + leftAlign, (i * rowInc) + rowInc);
	drawLegendElement(svg, json[i].to, json[i].toType, colInc + (colInc/2) + leftAlign, (i * rowInc) + rowInc);
}

function createLegend(container) {
	if(legendTags.length) {

		var legendContainer = d3.select("#" + container);
		var svg = legendContainer.append("svg")
			.attr("width", width)
			.attr("height", height);
		
		var colWidths = [];
		var leftColWidths = [];
		var rightColWidths = [];
		var centerWidth = drawLegendElement(svg, dividingChar, "string", 0, 0).width + (2 * centerPadding);
		for(var i in legendTags) {
			colWidths[i] = drawLegendElement(svg, legendTags[i], "string", 0, 0).width + (2 * colPadding);
			leftColWidths[i] = 0;
			rightColWidths[i] = 0;
			for(var j in legend[legendTags[i]]) {
				var currLeft = drawLegendElement(svg, legend[legendTags[i]][j].from, legend[legendTags[i]][j].fromType, 0, 0);
				var currRight = drawLegendElement(svg, legend[legendTags[i]][j].to, legend[legendTags[i]][j].toType, 0, 0);
				leftColWidths[i] = (leftColWidths[i] > currLeft.width) ? leftColWidths[i] : currLeft.width;
				rightColWidths[i] = (rightColWidths[i] > currRight.width) ? rightColWidths[i] : currRight.width;
			}
			var currColWidth = leftColWidths[i] + rightColWidths[i] + centerWidth + (2 * colPadding);
			colWidths[i] = (colWidths[i] > currColWidth) ? colWidths[i] : currColWidth;
		}
		
		/*var temp = svg.node()
		while (temp.lastChild) {
			temp.removeChild(temp.lastChild);
		}*/
		legendContainer.removeChild(svg);
		
		var svg = legendContainer.append("svg")
			.attr("width", width)
			.attr("height", height);
		
		var currColLeft = 0;
		for(var i in legendTags) {
			svg.append("text")
				.attr("x", currColLeft + colWidths[i]/2)
				.attr("y", rowHeight)
				.attr("fill","#000")
				.attr("text-anchor", "middle")
				.text(legendTags[i]);
			
			for(var j in legend[legendTags[i]]) {
				var temp = rowHeight * j;
				temp = temp + rowHeight + rowHeight;
				drawLegendElement(svg, legend[legendTags[i]][j].from, legend[legendTags[i]][j].fromType, currColLeft + colPadding + leftColWidths[i], temp, 0);
				svg.append("text")
					.attr("x", currColLeft + colPadding + leftColWidths[i] + (centerWidth / 2))
					.attr("y", temp + 4)
					.attr("fill","#000")
					.attr("text-anchor", "middle")
					.text(dividingChar);
				drawLegendElement(svg, legend[legendTags[i]][j].to, legend[legendTags[i]][j].toType, currColLeft + colPadding + leftColWidths[i] + centerWidth, temp, 1);
			}
			currColLeft += colWidths[i];
		}
	}
}

function addToLegend(from, to, mapping) {
	if(from != null && to != null) {
		var legendIDs = legendMap[mapping.legend];
		if(!legendIDs) {
			legendMap[mapping.legend] = {};
			legend[mapping.legend] = [];
			legendTags.push(mapping.legend);
		}
		var index = legendMap[mapping.legend][from];
		if(index == undefined) {
			index = legend[mapping.legend].length;
			legendMap[mapping.legend][from] = index;
		}
		legend[mapping.legend][index] = {
			"from":from,
			"to":to,
			"fromType":mapping.fromType,
			"toType":mapping.toType
		};
	}
}