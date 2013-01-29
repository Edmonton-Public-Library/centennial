;
var epl = {};

//Dependencies for the base application
//These will be erased upon initialization
epl.dependencies = [
	//General
	'lib/jquery-ui',
	//Navigation
	'lib/csc.Nav',
	'lib/sammy',

	//Layout
	'lib/knockout',
	'lib/less'
];

//Create the application module
define(epl.dependencies, function () {

var AppClass = (function () {

	var AppClass = function (viewport) {
		var self = this;
		this.viewport = viewport;
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
		$(document).ready(function () {
			self.nav = new csc.Nav(this.viewport, self.settings.routes);
		});
	};

	return AppClass;

})();

//Start the app in the specified viewport
epl = new AppClass('[data-role=viewport]');
//Start application initialization
require(['epl.settings', 'views'], function () {
	//Once we have settings to use, start loading the app
	epl.init();
});

//End module
return epl;
});