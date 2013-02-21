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

var colourList2 = {
	"author":d3.scale.getcategory60(),
	"activity":d3.scale.getcategory60b(),
	"workItem":d3.scale.getcategory60c().concat(d3.scale.getcategory60c())
}

var wheelStrat = new Object();
wheelStrat.getStrat = function() {
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
					"to":"workItem"
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
					"from":getOption("col1from"),
					"to":"name",
					"appendFunction":noName
				}
			],
			"iterate":[
				{
					"remap":1,
					"from":"name",
					"to":"colour",
					"toList":colourList2[getOption("col1from")],
					"tag":getOption("col1from"),
					"legend":getOption("col1from"),
					"toType":"colour"
				},
				{
					"from":"",
					"to":"children",
					"unique":[
						{
							"from":getOption("col2from"),
							"to":"name",
							"appendFunction":noName
						}
					],
					"iterate":[
						{
							"remap":1,
							"from":"name",
							"to":"colour",
							"toList":colourList2[getOption("col2from")],
							"tag":getOption("col2from"),
							"legend":getOption("col2from"),
							"toType":"colour"
						},
						{
							"from":"",
							"to":"children",
							"unique":[
								{
									"from":getOption("col3from"),
									"to":"name",
									"appendFunction":noName
								}
							],
							"iterate":[
								{
									"remap":1,
									"from":"name",
									"to":"colour",
									"toList":colourList2[getOption("col3from")],
									"tag":getOption("col3from"),
									"legend":getOption("col3from"),
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