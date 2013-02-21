var noName = function(value) {
	return (value ? value : "??");
}

var countNotZero = function(obj) {
	return (obj.count > 0);
}

var addToOldValue = function (newValue, oldValue) {
	if(isNaN(oldValue)) {
		return newValue ? newValue : 0;
	}
	return oldValue + (newValue ? newValue : 0);
}

var colourList = {
	"author1":d3.scale.getcategory60(),
	"author2":d3.scale.getcategory60(),
	"activitiesType":d3.scale.getcategory60c()
}

var tagList = {
	"author1":"author",
	"author2":"author",
	"activitiesType":"activity"
}

var commWheelStrat = Object();

commWheelStrat.addOptions = function() {
	addOption("commcol1from", "commcol1", ["author1","author2","activitiesType"]);
	addOption("commcol2from", "commcol2", ["author2","author1","activitiesType"]);
	addOption("commcol3from", "commcol3", ["activitiesType","author1","author2"]);
}

commWheelStrat.getStrat = function() {
	return [
		{
			"from":"returnValue/values",
			"to":"tempValues",
			"condition":countNotZero,
			"iterate":[
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
					"from":"count",
					"to":"count"
				}
			]
		},
		{
			"remap":1,
			"from":"tempValues",
			"to":"children",
			"unique":[
				{
					"from":getOption("commcol1from"),
					"to":"name",
					"appendFunction":noName
				}
			],
			"iterate":[
				{
					"remap":1,
					"from":"name",
					"to":"colour",
					"toList":colourList[getOption("commcol1from")],
					"tag":tagList[getOption("commcol1from")],
					"legend":tagList[getOption("commcol1from")],
					"toType":"colour"
				},
				{
					"from":"",
					"to":"children",
					"unique":[
						{
							"from":getOption("commcol2from"),
							"to":"name",
							"appendFunction":noName
						}
					],
					"iterate":[
						{
							"remap":1,
							"from":"name",
							"to":"colour",
							"toList":colourList[getOption("commcol2from")],
							"tag":tagList[getOption("commcol2from")],
							"legend":tagList[getOption("commcol2from")],
							"toType":"colour"
						},
						{
							"from":"",
							"to":"children",
							"unique":[
								{
									"from":getOption("commcol3from"),
									"to":"name",
									"appendFunction":noName
								}
							],
							"iterate":[
								{
									"remap":1,
									"from":"name",
									"to":"colour",
									"toList":colourList[getOption("commcol3from")],
									"tag":tagList[getOption("commcol3from")],
									"legend":tagList[getOption("commcol3from")],
									"toType":"colour"
								},
								{
									"from":"count",
									"to":"value",
									"appendFunction":addToOldValue
								}
							]
						}
					]
				}
			]
		}
	];
}