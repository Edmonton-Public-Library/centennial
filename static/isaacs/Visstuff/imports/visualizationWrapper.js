function clearAllNulls(json) {
	if(typeof json == "object"){
		if(json instanceof Array) {
			for(var i = json.length - 1; i >= 0; i--) {
				if(json[i] == null) {
					json.splice(i, 1);
				}
				else {
					json[i] = clearAllNulls(json[i]);
				}
			}
		}
		else {
			var keys = Object.keys(json);
			for(var i in keys) {
				json[keys[i]] = clearAllNulls(json[keys[i]]);
			}
		}
	}
	return json;
}

function followArrayPath(json, path, replace) {
	if(path.length == 0) {
		if(replace == undefined) {
			return json;
		}
		else {
			json = replace;
			return replace;
		}
	}
	if(json == undefined) {
		json = {};
	}
	var njson = json[path[0]];
	var npath = [];
	for(var i in path) {
		npath[i] = path[i];
	}
	npath.splice(0,1);
	if(replace == undefined) {
		return followArrayPath(njson, npath);
	}
	else {
		json[path[0]] =  followArrayPath(njson, npath, replace);
		return json;
	}
}

function followPath(json, path, replace) {
	var npath = (path == "") ? [] : path.split("/");
	return followArrayPath(json, npath, replace);
}

var indexMappings = {};

function indexMapping(value, tag) {
	if(indexMappings[tag] == undefined) {
		indexMappings[tag] = {};
	}
	if(indexMappings[tag][value] == undefined) {
		indexMappings[tag][value] = Object.keys(indexMappings[tag]).length;
	}
	return indexMappings[tag][value];
}

var discreteMappings = {};

function discreteMapping(value, toList, tag) {
	if(discreteMappings[tag] == undefined) {
		discreteMappings[tag] = {};
	}
	if(discreteMappings[tag][value] == undefined) {
		discreteMappings[tag][value] = Object.keys(discreteMappings[tag]).length;
	}
	return toList[discreteMappings[tag][value]];
}

function formatNumbers(toArray, mapping, defaults) {
	var toVar = mapping.to;
	var newMean = isNaN(mapping.mean) ? defaults.mean[toVar] : mapping.mean;
	var newDeviation = isNaN(mapping.deviation) ? defaults.deviation[toVar] : mapping.deviation;
	var isInverted = isNaN(mapping.inverted) ? defaults.inverted[toVar] : mapping.inverted;
	var min = isNaN(mapping.min) ? defaults.min[toVar] : mapping.min;
	var max = isNaN(mapping.max) ? defaults.max[toVar] : mapping.max;
	var oldMean = 0;
	var numOfObjects = 0;
	var oldNumbers = [];
	var oldIndexes = [];
	for(var i = 0; i < toArray.length; i++) {
		var temp = followPath(toArray[i], toVar);
		if(!isNaN(temp)) {
			numOfObjects++;
			oldMean += temp;
			oldIndexes.push(i);
			oldNumbers.push(temp);
		}
	}
	if(isNaN(oldMean)) {
		return toArray;
	}
	oldMean = oldMean / numOfObjects;
	if (isNaN(newMean)) {
		newMean = oldMean;
	}
	var oldNumbers2 = new Array();
	for(var i = 0; i < oldNumbers.length; i++) {
		if(!isNaN(oldNumbers[i])) {
			oldNumbers[i] = oldNumbers[i] - oldMean;
			oldNumbers2[i] = oldNumbers[i] * oldNumbers[i];
		}
	}
	var oldDeviation = 0;
	for(var i = 0; i < oldNumbers2.length; i++) {
		oldDeviation += oldNumbers2[i];
	}
	var modifier = 0;
	if(isNaN(newDeviation)) {
		modifier = 1;
	}
	else if(oldDeviation > 0) {
		oldDeviation = oldDeviation / numOfObjects;
		oldDeviation = Math.sqrt(oldDeviation);
		modifier = newDeviation / oldDeviation;
	}
	for(var i = 0; i < oldNumbers.length; i++) {
		if(!isNaN(oldNumbers[i])) {
			oldNumbers[i] = oldNumbers[i] * modifier;
			if(isInverted) {
				oldNumbers[i] = oldNumbers[i] * -1;
			}
			oldNumbers[i] += newMean;
			if(!isNaN(min) && oldNumbers[i] < min) {
				oldNumbers[i] = min;
			}
			else if(!isNaN(max) && oldNumbers[i] > max) {
				oldNumbers[i] = max;
			}
		}
	}
	for(var i = 0; i < oldNumbers.length; i++) {
		followPath(toArray[oldIndexes[i]], toVar, oldNumbers[i]);
	}
	return toArray;
}

function getUniqueIndex(obj, map, indexes, index, save) {
	var retVal;
	if(typeof(obj) == "object"){
		var path = [];
		for(var i in map) {
			path.push(followPath(obj, map[i].to));
		}
		retVal = followArrayPath(indexes, path);
		if(retVal == undefined || !Object.keys(indexes).length) {
			if(save) indexes = followArrayPath(indexes, path, index);
			return undefined;
		}
	}
	else {
		retVal = indexes[obj];
		if(retVal == undefined) {
			if(save) indexes[obj] = index;
			return undefined;
		}
	}
	return retVal
}

var uniqueIndexes = {};

function doMapping(json, njson, mapping, tpath, defaults) {
	if(njson == undefined) {
		njson = {};
	}
	else if(njson == null) {
		return null;
	}
	var from = mapping.from;
	var to = mapping.to;
	var fjson = json;
	if(from == undefined) {
		fjson = njson;
		from = to;
	}
	else if(mapping.remap) {
		fjson = njson;
	}
	fjson = followPath(fjson, from);
	if (to != undefined) {
		var fnjson = followPath(njson, to);
	}
	if(to && to != "") {
		tpath += "/" + to;
	}
	if (mapping.iterate || mapping.unique) {
		if(fnjson == undefined || !fnjson.length) {
			fnjson = [];
		}
		if(uniqueIndexes[tpath] == undefined) {
			uniqueIndexes[tpath] = {};
		}
		var iterArray = fjson;
		if(!(fjson instanceof Array)){
			iterArray = [fjson];
		}
		for(var i in iterArray) {
			if((!mapping.condition || mapping.condition(iterArray[i])) && iterArray[i] != null) {
				if(mapping.unique) {
					var currVal = {};
					if(typeof mapping.unique == "object") {
						currVal = doMapping(iterArray[i],currVal, {"from":"","to":"","map":mapping.unique}, tpath, defaults);
					}
					if(currVal != null) {
						var index = 0;
						if(typeof mapping.unique == "object") {
							index = getUniqueIndex(currVal, mapping.unique, uniqueIndexes[tpath], fnjson.length);
						}
						if(isNaN(index)) {
							index = fnjson.length;
							var currVal2 = currVal;
							if(mapping.iterate) {
								currVal2 = doMapping(iterArray[i], $.extend(true, {}, currVal), {"from":"","to":"","map":mapping.iterate}, tpath + "/" + index, defaults);
							}
							if(currVal2 != null) {
								getUniqueIndex(currVal, mapping.unique, uniqueIndexes[tpath], index, true);
								fnjson[index] = currVal2;
							}
						}
						else
						{
							if(mapping.iterate) {
								currVal = doMapping(iterArray[i], $.extend(true, {}, fnjson[index]), {"from":"","to":"","map":mapping.iterate}, tpath + "/" + index, defaults);
							}
							if(currVal != null) fnjson[index] = currVal;
						}
					}
				}
				else {
					if(mapping.append) {
						fnjson.push(doMapping(iterArray[i], {}, {"from":"","to":"","map":mapping.iterate}, tpath + "/" + fnjson.length, defaults));
					}
					else {
						fnjson[i] = doMapping(iterArray[i], fnjson[i], {"from":"","to":"","map":mapping.iterate}, tpath + "/" + i, defaults);
					}
				}
			}
			else{
				fnjson[i] = (fnjson[i] == undefined) ? null : fnjson[i];
			}
		}
		for(var j in mapping.iterate) {
			if(mapping.iterate[j].format) {
				fnjson = formatNumbers(fnjson, mapping.iterate[j], defaults);
			}
		}
	}
	else {
		if(mapping.condition && !mapping.condition(json)) return njson;
		if(mapping.map) {
			var filterSuccess = false;
			for(var i in mapping.map) {
				fnjson = doMapping(fjson, fnjson, mapping.map[i], tpath, defaults);
				if(mapping.filter) {
					if(mapping.map[i].to && doFilter(fnjson[mapping.map[i].to], mapping.filter)) {
						filterSuccess = true;
					}
					if(mapping.map[i].from && doFilter(fnjson[mapping.map[i].from], mapping.filter)) {
						filterSuccess = true;
					}
				}
				else if(fnjson == null) return null;
			}
			if(mapping.filter && !filterSuccess) return null;
		}
		else if(mapping.value != undefined) {
			fnjson = mapping.value;
		}
		else
		{
			fnjson = fjson;
		}
	}
	
	
	if(mapping.function) {
		fnjson = mapping.function(json, njson);
	}
	
	if(mapping.filter && mapping.map == undefined) {
		if(!doFilter(fnjson, mapping.filter)) return null;
	}
	if(fnjson != null) {
		if(mapping.toList != undefined) {
			fnjson = discreteMapping(fnjson, mapping.toList, mapping.tag);
		}
		
		if(mapping.index) {
			fnjson = indexMapping(fnjson, mapping.index);
		}
	}
	
	if(mapping.appendFunction) {
		fnjson = mapping.appendFunction(fnjson, followPath(njson, to));
	}
	
	
	
	if(mapping.legend) {
		if (mapping.iterate || mapping.unique) {
			for(var i in mapping.legend) {
				for(var j in fnjson) {
					if(fnjson != null) addToLegend(followPath(fnjson[j], mapping.legend[i].from), followPath(fnjson[j], mapping.legend[i].to), mapping.legend[i]);
				}
			}
		}
		else {
			addToLegend(fjson, fnjson, mapping);
		}
	}
	
	if(to == undefined) return njson;
	return followPath(njson, to, fnjson);
}

function applyVisualizationStrategy(json, strategy, defaults) {
	uniqueIndexes = {};
	return doMapping(json, {}, {"from":"", "to":"", "map":strategy}, "", defaults);
}

function doRefresh(dataFile, container, obj, strat) {
	var temp = d3.select("#" + container).node();
	while (temp.hasChildNodes()) {
		temp.removeChild(temp.lastChild);
	}
	onLoad(dataFile, container, obj, strat);
}

function onLoad(dataFile, container, obj, stratObj) {
	initializeVisLoad();
	var strat = stratObj.getStrat();
	d3.json("data/"+dataFile, function(json) {
		if(obj.defaults == undefined){
			obj.defaults = {};
		}
		var njson = clearAllNulls(applyVisualizationStrategy(json, strat, obj.defaults));
		obj.displayVisualization(container, njson);
		finalizeVisLoad();
	});
}