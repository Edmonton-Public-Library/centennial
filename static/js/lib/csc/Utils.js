;
define(function() {

/**
 * Provides abstract utility functions for convenience
 */
return (function () {
	
	var Utils = function () { };

	Utils.isFunction = function (object) {
		return !!(object && object.constructor && object.call && object.apply);
	};

	/**
	 * Creates a psuedo GUID in the RFC-4122 specification
	 */
	Utils.guid = function () {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		    return v.toString(16);
		});
	};

	return Utils;

})();

//End module
});