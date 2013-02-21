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

var forceStrat = new Object();
forceStrat.getStrat = function(){
	return [
		{
			"from":"returnValue",
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
							"to":"type",
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
							"to":"nodes",
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
								},
								{
									"from":"author1",
									"index":"people"
								}
							]
						},
						{
							"from":"",
							"to":"nodes",
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
								},
								{
									"from":"count",
									"to":"messages",
									"appendFunction":addToOldValue
								},
								{
									"from":"author2",
									"index":"people"
								}
							]
						},
						{
							"to":"nodes",
							"iterate":[
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
									"toList":d3.scale.getcategory20(),
									"tag":"author",
									"legend":"author",
									"toType":"colour"
								},
								{
									"value":"1",
									"to":"shape"
								},
								{
									"from":"messages",
									"to":"size",
									"format":1
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
									"to":"source",
									"index":"people"
								},
								{
									"from":"author2",
									"to":"target",
									"index":"people"
								},
								{
									"from":"count",
									"to":"distance",
									"appendFunction":addToOldValue,
									"format":1
								},
								{
									"from":"count",
									"to":"strength",
									"appendFunction":addToOldValue,
									"format":1
								},
								{
									"from":"count",
									"to":"width",
									"appendFunction":addToOldValue,
									"format":1
								}
							]
						}
					]
				}
			]
		}
	];
}