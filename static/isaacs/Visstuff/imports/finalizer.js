var numLoaded = 0;
var visNum = 0;

function initializeVisLoad() {
	visNum++;
}

function finalizeVisLoad() {
	numLoaded++;
	if(numLoaded >= visNum) {
		hasFinalized = true;
		builtFilters = true;
		builtOptions = true;
		createLegend("legend");
		visNum = 0;
		numLoaded = 0;
	}
}

function startLoads() {
	if(visNum > 0) {
		return false;
	}
	visNum = 1;
	return true;
}

function doneStartingLoads(){
	visNum--;
}