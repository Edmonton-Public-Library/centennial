
  function isCircle(d) {
	return isNaN(d.shape) || d.shape < 2.5
  }

var makePair = function (fromObj, toObj) {
	var x = fromObj.author1;
	var y = fromObj.author2;
	if (x > y) {
		var temp = x;
		x = y;
		y = temp;
	}
	return x + " - " + y;
}

var addToOldValue = function (newValue, oldValue) {
	if(isNaN(oldValue)) {
		return newValue ? newValue : 0;
	}
	return oldValue + (newValue ? newValue : 0);
}

var nanIsZero = function (newValue, oldValue) {
	return (isNaN(oldValue)) ? 0 : oldValue;
}

var isNotFromSelf = function(obj) {
	if(obj == null) return false;
	return (obj.author1 != obj.author2);
}

var isFromSelf = function(obj) {
	if(obj == null) return false;
	return (obj.author1 == obj.author2);
}

var countNotZero = function(obj) {
	return (obj.count > 0);
}

var addThree = function(value) {
	return value + 3;
}

var timeAndStatsStrat = new Object();
timeAndStatsStrat.getStrat = function() {
	return [
		{
			"from":"ActivityStats",
			"to":"",
			"map":[
				{
					"from":"values",
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
					"to":"",
					"map":[
						{
							"from":"",
							"to":"people",
							"condition":isNotFromSelf,
							"unique":[
								{
									"from":"author1",
									"to":"title"
								}
							],
							"iterate":[
								{
									"from":"count",
									"to":"sent",
									"appendFunction":addToOldValue
								},
								{
									"from":"count",
									"to":"messages",
									"appendFunction":addToOldValue
								}
							]
						},
						{
							"from":"",
							"to":"people",
							"condition":isNotFromSelf,
							"unique":[
								{
									"from":"author2",
									"to":"title"
								}
							],
							"iterate":[
								{
									"from":"count",
									"to":"received",
									"appendFunction":addToOldValue
								}
							]
						},
						{
							"from":"",
							"to":"links",
							"unique":[
								{
									"function":makePair,
									"to":"pair"
								}
							],
							"iterate":[
								{
									"from":"author1",
									"to":"source"
								},
								{
									"from":"author2",
									"to":"target"
								},
								{
									"from":"count",
									"to":"messages",
									"appendFunction":addToOldValue
								}
							]
						}
					]
				}
			]
		},
		{
			"from":"timeActivity",
			"to":"",
			"map":[
				{
					"from":"values",
					"to":"tempValues2",
					"condition":countNotZero,
					"iterate":[
						{
							"from":"author",
							"to":"author",
							"filter":"author"
						},
						{
							"from":"workItem",
							"to":"workItem"
						},
						{
							"from":"activity",
							"to":"type",
							"filter":"activity"
						},
						{
							"from":"count",
							"to":"count"
						}
					]
				},
				{
					"remap":1,
					"from":"tempValues2",
					"to":"",
					"map":[
						{
							"from":"",
							"to":"people",
							"unique":[
								{
									"from":"author",
									"to":"title"
								}
							],
							"iterate":[
								{
									"value":0,
									"to":"messages",
									"appendFunction":addToOldValue
								}
							]
						},
						{
							"from":"",
							"to":"workItems",
							"unique":[
								{
									"from":"workItem",
									"to":"title"
								}
							],
							"iterate":[
								{
									"from":"count",
									"to":"size",
									"appendFunction":addToOldValue,
									"format":1
								}
							]
						},
						{
							"from":"",
							"to":"links",
							"unique":[
								{
									"from":"author",
									"to":"source"
								},
								{
									"from":"workItem",
									"to":"target"
								}
							],
							"iterate":[
								{
									"from":"count",
									"to":"messages",
									"appendFunction":addToOldValue
								}
							]
						}
					]
				}
			]
		},
		{
			"remap":1,
			"from":"people",
			"to":"nodes",
			"iterate":[
				{
					"from":"title",
					"to":"title"
				},
				{
					"from":"title",
					"index":"people"
				},
				{
					"from":"sent",
					"to":"sent",
					"appendFunction":nanIsZero //if sent hasn't been set, set it to zero
				},
				{
					"from":"received",
					"to":"received",
					"appendFunction":nanIsZero //if received hasn't been set, set it to zero
				},
				{
					"from":"title",
					"to":"colour",
					"toList":d3.scale.getcategory60(),
					"tag":"author",
					"legend":"author",
					"toType":"colour"
				},
				{
					"from":"messages",
					"to":"size",
					"format":1
				},
				{
					"value":1,
					"to":"shape"
				}
			]
		},
		{
			"remap":1,
			"from":"workItems",
			"to":"nodes",
			"append":1,
			"iterate":[
				{
					"from":"title",
					"to":"title"
				},
				{
					"from":"title",
					"index":"people"
				},
				{
					"from":"sent",
					"to":"sent",
					"appendFunction":nanIsZero //if sent hasn't been set, set it to zero
				},
				{
					"from":"received",
					"to":"received",
					"appendFunction":nanIsZero //if received hasn't been set, set it to zero
				},
				{
					"from":"title",
					"to":"colour",
					"toList":d3.scale.getcategory60c().concat(d3.scale.getcategory60c()),
					"tag":"workItem",
					"legend":"workItem",
					"toType":"colour"
				},
				{
					"from":"size",
					"to":"size"
				},
				{
					"value":4,
					"to":"shape"
				}
			]
		},
		{
			"to":"links",
			"iterate":[
				{
					"from":"source",
					"to":"source",
					"index":"people"
				},
				{
					"from":"target",
					"to":"target",
					"index":"people"
				},
				{
					"from":"messages",
					"to":"distance",
					"format":1,
					"mean":100,
					"min":50
				},
				/*{
					"from":"messages",
					"to":"strength",
					"format":1
				},*/
				{
					"from":"messages",
					"to":"width",
					"format":1
				}
			]
		}
	];
}