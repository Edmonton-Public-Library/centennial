;
define(['epl', 'epl/Settings', 'lib/csc/Error', 'lib/knockout', 'epl/Environment'], function (epl, Settings, Error, ko, Environment) {

return (function () {

	/**
	 * This is the class object. Put private things in here.
	 */
	var Branch = function (viewport) {
	  this.data = {
		stories: ko.observable,
		image: ko.observable('')
	  };
	  ko.applyBindings(this.data, viewport[0]);
	};

	/**
	 * Make instance methods like this
	 */
	Branch.prototype.setData = function (floorPlan, userData) {
	this.data.stories(userData);
	this.data.image(floorPlan); 
	
<div data-bind="css: {backgroundImage: image}"></div>	
	};

	/**
	 * Make static methods like this
	 */
	Branch.staticMethod = function () {

	};

	return Branch;

})();

//End module
});
