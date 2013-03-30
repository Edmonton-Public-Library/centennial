;
//Create the application module
define(['timemap/Routes', 'epl/Settings', 'lib/csc/Nav', 'lib/knockout', 'timemap/EPLBar', 'timemap/Environment', 'timemap/Sidebar', 'lib/sammy', 'lib/less', 'lib/jquery-ui', 'lib/jquery.hammer'], function (Routes, Settings, Nav, ko, EPLBar, Environment, Sidebar) {
var timemap = null;

//Only start the app once the page has loaded
var AppClass = (function () {

	var AppClass = function (viewport) {
		var self = this;
		this.viewport = viewport;
		this.storage = {
			map : null,
			timeline : null
		}; //Persistent storage (for the current page load) for the views
	};

	/**
	 * Initialize the application
	 * 	- Routing,
	 *  - Viewport setup
	 */
	AppClass.prototype.init = function () {

		var self = this;

		//Get the viewport ready
		$(document).ready(function () {

			//TODO: Extract the sidebar/EPL bar
			var eplBar = new EPLBar('#epl-bar');

			//Initialize the sidebar
			Environment.sidebar = new Sidebar($('#tm-sidebar'));
			//Select the first available tab by default
			Environment.sidebar.tab($($('#tm-sidebar').find('.tab')[0]).attr('data-tab'));

			Environment.sidebar.setFeaturedStoriesSource('all');

			baseURL = ko.observable();
			$.get('/preferences/', function(json) {
				baseURL(json.base_url);
			});

			//self.initFacebook();

			ko.applyBindings({
				Environment: Environment,
				baseURL: baseURL
			}, $('[data-role=viewport]')[0]);
		});

		//Start accepting routes
		//Bootstrap components that depend on the DOM
		this.nav = new Nav(this.viewport, Routes.routes);

	};

	AppClass.prototype.updateQuest = function (data) {
		console.log(data);
		$.ajax(Settings.apiQuestUrl,{
			data : JSON.stringify(data),
			dataType : 'json',
			processData : false,
			type : 'post',
			success : function(data) {
				console.log(data);
			}
		});
	};

	return AppClass;

})();

//Start the app in the specified viewport
timemap = new AppClass('[data-role=viewport]');
//Start application initialization
timemap.init();

//End module

return timemap;
});
