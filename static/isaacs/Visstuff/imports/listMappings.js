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

function preloadMapping(newMap) {
	discreteMappings = newMap;
}