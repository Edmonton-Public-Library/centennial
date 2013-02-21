var builtFilters = false;
var filterMap = {};

function doFilter(value, filter) {
	if(!value) {
		return false;
	}
	if(builtFilters) {
		var dropdown = document.getElementById("filter-" + filter);
		if(dropdown.options[0].selected) return true;
		for(var i in dropdown.options) {
			if(dropdown.options[i].value == value) {
				return (dropdown.options[i].selected);
			}
		}
	}
	else {
		if(filterMap[filter] == undefined) {
			filterMap[filter] = {};
			d3.select("#filters").append("select")
				.attr("id", "filter-" + filter)
				.attr("multiple", "true")
				.append("option")
					.attr("value", "All")
					.text("All");
			document.getElementById("filter-" + filter).selectedIndex = 0;
		}
		if(filterMap[filter][value] == undefined) {
			filterMap[filter][value] = 1;
			d3.select("#" + "filter-" + filter).append("option")
				.attr("value", value)
				.text(value);
		}
	}
	return true;
}