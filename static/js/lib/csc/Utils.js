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

	/**
	 * Merges two objects together, favoring the values in object1
	 *	(useful for merging default with user-supplied settings)
	 * @param	object1		object		The object to merge from
	 * @param	object2		object		The object to merge onto
	 * @return	The merged object
	 */
	Utils.mergeObjects = function (object1, object2) {
		for(var i in object1) {
			if(typeof object1[i] == 'object') {
				if(typeof object2[i] == 'object') {
					Utils.mergeObjects(object1[i], object2[i]);
				} else {
					object2[i] = object1[i];
				}
			} else {
				object2[i] = object1[i];
			}
		}

		return object2;
	};

	return Utils;

})();

//End module
});