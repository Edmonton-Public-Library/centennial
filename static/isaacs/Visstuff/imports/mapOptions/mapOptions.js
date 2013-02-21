var mapChoices = {};
var mapOptions = {};
var builtOptions = false;

function getOption(option) {
	return mapOptions[option].options[mapChoices[mapOptions[option].tag]];
}

function buildOptions() {
	if(typeof mapOptions != "undefined" && !builtOptions) {
		var opts = {};
		var options = Object.keys(mapOptions);
		for(var i in options) {
			var currTag = mapOptions[options[i]].tag;
			var currOptions = mapOptions[options[i]].options;
			if(!opts[currTag]) {
				var dropdown = d3.select("#mapChoices").append("select")
					.attr("id", "choices-" + currTag);
				for(var j in currOptions) {
					dropdown.append("option")
						.attr("value", currOptions[j])
						.text(currOptions[j]);
				}
				mapChoices[currTag] = 0;
				opts[currTag] = 1;
			}
		}
	}
}

function populateOptions() {
	var choices = Object.keys(mapChoices);
	for(var i in choices) {
		mapChoices[choices[i]] = document.getElementById("choices-" + choices[i]).selectedIndex;
	}
}

function addOption(optName, optTag, optValues) {
	var temp = {}
	temp["tag"] = optTag;
	temp["options"] = optValues;
	mapOptions[optName] = temp;
}

function doOptions() {
	buildOptions();
	populateOptions();
}