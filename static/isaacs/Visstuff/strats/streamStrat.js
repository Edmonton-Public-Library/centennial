var parseDate = function(value) {
	if(!value) return "";
	var dateAndTime = value.split("T");
	var ymd = dateAndTime[0].split("-");
	var time = dateAndTime[1].split(".");
	var retVal = ymd[1] + " " + ymd[2] + " " + ymd[0] + " " + time[0];
	return retVal;
}

var streamStrat = new Object();


streamStrat.getStrat = function() {
	return [
		{
			"from":"returnValue/values",
			"to":"tempValues",
			"condition":countNotZero,
			"iterate":[
				{
					"from":"author",
					"to":"author",
					"filter":"author"
				},
				{
					"from":"activity",
					"to":"activity",
					"filter":"activity"
				},
				{
					"from":"workItem",
					"to":"workItem",
					"filter":"workItem"
				},
				{
					"from":"count",
					"to":"count"
				},
				{
					"from":"date",
					"to":"date",
					"appendFunction":"parseDate"
				}
			]
		},
		{
			"remap":1,
			"from":"tempValues",
			"to":"paths",
			"unique":[
				{
					"from":"author",
					"to":"title"
				}
			],
			"iterate":[
				{
					"from":"title",
					"to":"colour",
					"toList":studentColours,
					"tag":"Students",
					"legend":"Students",
					"toType":"colour"
				},
				{
					"from":"",
					"to":"days",
					"unique":[
						"from":"date",
						"to":"date"
					],
					"iterate":[
						{
							"from":"count",
							"to":"value",
							"appendFunction":addToOldValue
						}
					]
				}
			]
		},
		{
			"remap":1,
			"from":"tempValues",
			"to":"stats",
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