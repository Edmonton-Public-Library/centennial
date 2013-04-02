;
//Create the application module
define(['hyq/Routes', 'epl/Settings', 'lib/csc/Nav', 'timemap/QuestPopUp', 'lib/knockout', 'timemap/EPLBar', 'hyq/QuestSetViewer', 'lib/sammy', 'lib/less', 'lib/jquery-ui', 'lib/jquery.iosslider'], function (Routes, Settings, Nav, QuestPopUp, ko, EPLBar, QuestSetViewer) {
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
		var eplBar = new EPLBar('#epl-bar', 'hyq');

		self.storage.questPopUp = new QuestPopUp($('#questPopUp'));

		//Start accepting routes
		//Bootstrap components that depend on the DOM
		this.nav = new Nav(this.viewport, Routes.routes);
	};

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

	return AppClass;

})();

//Start the app in the specified viewport
hyq = new AppClass('[data-role=viewport]');
//Start application initialization
hyq.init();

//End module

return hyq;
});