function displayInfoWindow(title, description, link) {
	var temp = d3.select("#infoWindow").html("");
	temp = temp.append("windowTitle")
			.attr("class", "info_head");
	if(link) {
		temp = temp.append("a")
			.attr("href", link)
			.attr("style", "text-decoration:none;")
	}
	temp.html(title);
	d3.select("#infoWindow").append("text")
			.html(description);
}