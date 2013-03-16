;
//Create the application module
define(['hyq/Routes', 'epl/Settings', 'lib/csc/Nav', 'lib/knockout', 'lib/sammy', 'lib/less', 'lib/jquery-ui'], function (Routes, Settings, Nav, ko) {
var hyq = null;

//Only start the app once the page has loaded
var AppClass = (function () {

	var AppClass = function (viewport) {
		var self = this;
		this.viewport = viewport;
		this.storage = {}; //Persistent storage (for the current page load) for the views
	};

	/**
	 * Initialize the application
	 * 	- Routing,
	 *  - Viewport setup
	 */
	AppClass.prototype.init = function () {

		var self = this;

		//Start accepting routes
		//Bootstrap components that depend on the DOM
		this.nav = new Nav(this.viewport, Routes.routes);

	};

	return AppClass;

})();

//Start the app in the specified viewport
hyq = new AppClass('[data-role=viewport]');
//Start application initialization
hyq.init();

//End module

return hyq;
});