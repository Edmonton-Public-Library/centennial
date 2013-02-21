var simParseDate = function(value) {
	if(!value) return "";
	var dateAndTime = value.split(" ");
	var ymd = dateAndTime[0].split("-");
	var retVal = ymd[1] + " " + ymd[2] + " " + ymd[0] + " " + dateAndTime[1];
	return retVal;
}

var laterDate = function (newDate, oldDate) {
	//newDate = parseDate(newDate);
	if(oldDate == undefined) return newDate;
	var d1 = new Date(newDate);
	var d2 = new Date(oldDate);
	var retVal = (d1 > d2) ? newDate : oldDate;
	return retVal;
}

var earlierDate = function (newDate, oldDate) {
	//newDate = parseDate(newDate);
	if(oldDate == undefined) return newDate;
	var d1 = new Date(newDate);
	var d2 = new Date(oldDate);
	var retVal = (d1 < d2) ? newDate : oldDate;
	return retVal;
}

var parseTitle = function(value) {
	if(!value) return "";
	var val = document.createElement("a");
	val.innerHTML = value;
	return $(val.children[0]).text();
}

var parseColour = function(value) {
	if(!value) return "";
	var val = document.createElement("a");
	val.innerHTML = value;
	return val.children[0].style.color;
}

var hasEndDate = function(fromObj) {
	return (fromObj.startdate == fromObj.enddate || fromObj.enddate == undefined) ? false : true;
};

var addImagesFolder = function(value) {
	return imageURLPrefix + value;
}

var parseAction = function(value) {
	return value.split(" ")[1];
}

var timelineStrat = new Object();
timelineStrat.getStrat = function(){
	return [
		{
			"from":"returnValue/values",
			"to":"",
			"map":[
				{
					"from":"",
					"to":"events",
					"iterate":[
						{
							"from":"author",
							"to":"author",
							"filter":"students"
						},
						{
							"from":"icon",
							"to":"icon",
							"appendFunction":addImagesFolder
						},
						{
							"from":"title",
							"to":"title",
							"appendFunction":parseTitle
						},
						{
							"remap":1,
							"from":"title",
							"to":"action",
							"appendFunction":parseAction
						},
						{
							"from":"title",
							"to":"textColor",
							"appendFunction":parseColour
						},
						{
							"from":"title",
							"to":"header"
						},
						{
							"from":"description",
							"to":"description"
						},
						{
							"from":"image",
							"to":"image"
						},
						{
							"from":"link",
							"to":"link"
						},
						{
							"from":"startdate",
							"to":"start",
							"appendFunction":simParseDate
						},
						{
							"from":"enddate",
							"to":"end",
							"condition":hasEndDate,
							"appendFunction":simParseDate
						}
					],
					"legend":[
						{
							"legend":"Students",
							"from":"author",
							"to":"textColor",
							"toType":"colour"
						},
						{
							"legend":"Actions",
							"from":"action",
							"to":"icon",
							"toType":"image"
						}
					]
				},
				{
					"remap":1,
					"from":"events",
					"to":"stats",
					"unique":1,
					"iterate":[
						{
							"from":"start",
							"to":"lastDate",
							"appendFunction":laterDate
						},
						{
							"from":"start",
							"to":"firstDate",
							"appendFunction":earlierDate
						}
					]
				}
			]
		}
	];
}