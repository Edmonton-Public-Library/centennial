;
//Create the application module
define(['timemap/Routes', 'epl/Settings', 'lib/csc/Nav', 'lib/knockout', 'timemap/EPLBar', 'timemap/Environment', 'timemap/Sidebar', 'timemap/QuestPopUp', 'lib/sammy', 'lib/less', 'lib/jquery-ui', 'lib/jquery.hammer'], function (Routes, Settings, Nav, ko, EPLBar, Environment, Sidebar, QuestPopUp) {
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

			$('#siteTitle').find('.timeMapTitle').click(function() {
				window.location.href = '/timemap/';
			});

			$('#siteTitle').find('.hyqTitle').click(function() {
				window.location.href = '/hyq/';
			});

			self.storage.questPopUp = new QuestPopUp($('#questPopUp'));

			//TODO: Extract the sidebar/EPL bar
			globalEPLBar = new EPLBar('#epl-bar', 'timemap');

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

			window.fbAsyncInit = function() {
				// init the FB JS SDK
				FB.init({
	                appId      : KEYS.FB_KEY,
					//appId      : Settings.apiKeys.facebook.connect, // App ID from the App Dashboard
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
			   js = d.createElement('script'); js.id = id; js.async = false;
			   js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
			   ref.parentNode.insertBefore(js, ref);
			 }(document, /*debug*/ false));

		});

		//Start accepting routes
		//Bootstrap components that depend on the DOM
		this.nav = new Nav(this.viewport, Routes.routes);

	};

	/**
	 * Send the current app state to the quest checking service
	 * @param	data	object		The game state
	 */
	AppClass.prototype.updateQuest = function (data) {
		var self = this;
		$.ajax(Settings.apiQuestUrl,{
			data : JSON.stringify(data),
			dataType : 'json',
			processData : false,
			type : 'post',
			success : function(data) {
				self.storage.questPopUp.checkTasks(data);
			}
		});
	};

	/**
	 * Send the current app state to the quest checking service
	 * @param	data	object		The game state
	 */
	AppClass.prototype.updateSocialQuest = function (data) {
		var self = this;
		$.ajax(Settings.apiSocialQuestUrl,{
			data : JSON.stringify(data),
			dataType : 'json',
			processData : false,
			type : 'post',
			success : function(data) {
				self.storage.questPopUp.checkTasks(data);
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
