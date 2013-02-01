;
//Create the application module
define(['epl/Settings', 'lib/csc/Nav', 'lib/knockout', 'lib/sammy', 'lib/less', 'lib/jquery-ui'], function (Settings, Nav, ko) {
var epl = null;

//Only start the app once the page has loaded
$(document).ready(function () {

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
		//Start accepting routes
		//Bootstrap components that depend on the DOM
		this.nav = new Nav(this.viewport, Settings.routes);
	};

	return AppClass;

})();

//Start the app in the specified viewport
epl = new AppClass('[data-role=viewport]');
//Start application initialization
epl.init();

//End module
});

return epl;
});