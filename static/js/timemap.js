;
//Create the application module
define(['timemap/Routes', 'epl/Settings', 'lib/csc/Nav', 'lib/knockout', 'timemap/EPLBar', 'timemap/Environment', 'timemap/Sidebar', 'lib/sammy', 'lib/less', 'lib/jquery-ui'], function (Routes, Settings, Nav, ko, EPLBar, Environment, Sidebar) {
var timemap = null;

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

		//Get the viewport ready
		$(document).ready(function () {

			//TODO: Extract the sidebar/EPL bar
			var eplBar = new EPLBar('#epl-bar');

			//Initialize the sidebar
			Environment.sidebar = new Sidebar($('#tm-sidebar'));
			//Select the first available tab by default
			Environment.sidebar.tab($($('#tm-sidebar').find('.tab')[0]).attr('data-tab'));

			Environment.sidebar.setFeaturedStoriesSource('all');

			self.initFacebook();

			ko.applyBindings({
				Environment: Environment
			}, $('[data-role=viewport]')[0]);
		});

		//Start accepting routes
		//Bootstrap components that depend on the DOM
		this.nav = new Nav(this.viewport, Routes.routes);

	};

	AppClass.prototype.initFacebook = function () {
		window.fbAsyncInit = function() {
			// init the FB JS SDK
			FB.init({
				appId      : Settings.apiKeys.facebook.connect, // App ID from the App Dashboard
				//channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File for x-domain communication
				status     : true, // check the login status upon init?
				cookie     : true, // set sessions cookies to allow your server to access the session?
				xfbml      : true  // parse XFBML tags on this page?
			});
		};

		// Load the SDK's source Asynchronously
		// Note that the debug version is being actively developed and might 
		// contain some type checks that are overly strict. 
		// Please report such bugs using the bugs tool.
		(function(d, debug){
		   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		   if (d.getElementById(id)) {return;}
		   js = d.createElement('script'); js.id = id; js.async = true;
		   js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
		   ref.parentNode.insertBefore(js, ref);
		 }(document, /*debug*/ false));
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