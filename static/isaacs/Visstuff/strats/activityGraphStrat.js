var parseDate = function(value) {
	if(!value) return "";
	var dateAndTime = value.split("T");
	var retVal = dateAndTime[0];
	return retVal;
}

var addToOldValue = function (newValue, oldValue) {
	if(isNaN(oldValue)) {
		return newValue ? newValue : 0;
	}
	return oldValue + (newValue ? newValue : 0);
}

var valueNotZero = function(obj) {
	if(!obj) return false;
	return (obj.value > 0);
}

var laterDate = function (newDate, oldDate) {
	if(oldDate == undefined) return newDate;
	var d1 = new Date(newDate);
	var d2 = new Date(oldDate);
	var retVal = (d1 > d2) ? newDate : oldDate;
	return retVal;
}

var earlierDate = function (newDate, oldDate) {
	if(oldDate == undefined) return newDate;
	var d1 = new Date(newDate);
	var d2 = new Date(oldDate);
	var retVal = (d1 < d2) ? newDate : oldDate;
	return retVal;
}

var activityGraphStrat = new Object();
activityGraphStrat.getStrat = function() {
	return [
		{
			"from":"returnValue",
			"to":"",
			"map":[
				{
					"from":"values",
					"to":"tempValues",
					//"condition":countNotZero,
					"iterate":[
						{
							"from":"author1",
							"to":"author1",
							"filter":"People"
						},
						{
							"from":"author2",
							"to":"author2",
							"filter":"People"
						},
						{
							"from":"activitiesType",
							"to":"type",
							"filter":"Type"
						},
						{
							"from":"count",
							"to":"count",
							"appendFunction":addToOldValue
						},
						{
							"from":"date",
							"to":"date",
							"appendFunction":parseDate
						}
					]
				},
				{
					"remap":1,
					"from":"tempValues",
					"to":"data",
					"unique":[
						{
							"from":"date",
							"to":"date"
						}
					],
					"iterate":[
						{
							"from":"count",
							"to":"value",
							"appendFunction":addToOldValue
						}
					]
				},
				{
					"remap":1,
					"from":"data",
					"to":"stats",
					"condition":valueNotZero,
					"unique":1,
					"iterate":[
						{
							"from":"date",
							"to":"lastDate",
							"appendFunction":laterDate
						},
						{
							"from":"date",
							"to":"firstDate",
							"appendFunction":earlierDate
						}
					]
				}
			]
		}
	];
}