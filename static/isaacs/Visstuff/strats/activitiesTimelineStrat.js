var parseDate = function(value) {
	if(!value) return "";
	var dateAndTime = value.split("T");
	var ymd = dateAndTime[0].split("-");
	var time = dateAndTime[1].split(".");
	var retVal = ymd[1] + " " + ymd[2] + " " + ymd[0] + " " + time[0];
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

var countNotZero = function(obj) {
	return (obj.count > 0);
}

var generateDescription = function(obj) {
	return obj.count + " " + obj.activitiesType;
}

var activitiesTimelineStrat = Object();
activitiesTimelineStrat.getStrat = function() {
	return [
		{
			"from":"",
			"to":"",
			"map":[
				{
					"from":"returnValue/values",
					"to":"events",
					"condition":countNotZero,
					"unique":[
						{
							"from":"",
							"to":"",
							"filter":"author",
							"map":[
								{
									"from":"author1",
									"to":"author1"
								},
								{
									"from":"author2",
									"to":"author2"
								}
							]
						},
						{
							"from":"activitiesType",
							"to":"activitiesType",
							"filter":"type"
						},
						{
							"from":"date",
							"to":"start",
							"appendFunction":parseDate
						}
					],
					"iterate":[
						{
							"from":"activitiesType",
							"to":"icon",
							"toList":["dark-green-circle.png", "dark-red-circle.png", "dark-blue-circle.png"],
							"tag":"activitiesType",
							"appendFunction":addImagesFolder,
							"legend":"Activities Type",
							"toType":"image"
						},
						{
							"from":"authorpair",
							"to":"title"
						},
						{
							"from":"author1",
							"to":"textColor",
							"toList":d3.scale.getcategory60(),
							"tag":"author",
							"legend":"author",
							"toType":"colour"
						},
						{
							"from":"authorpair",
							"to":"header"
						},
						{
							"function":generateDescription,
							"to":"description"
						},
						{
							"value":"",
							"to":"image"
						},
						{
							"from":"_eQualifiedClassName",
							"to":"link"
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