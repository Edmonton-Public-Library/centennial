;
define(['lib/knockout', 'lib/csc/View', 'lib/csc/Error', 'lib/jquery.hashchange'], function (ko, View, Error) {

/**
 * Facilitates view-based navigation using Sammy and Knockout.js
 * Dependencies: 	jQuery
 *					csc.View
 *					csc.Error
 *					knockout
 */
return (function () {

	var defaultViewportSelector = '[data-role=viewport]';

	var Nav = function (viewportSelector, router) {
		if(typeof viewportSelector == 'undefined') viewportSelector = defaultViewportSelector;
		this.viewport = $(viewportSelector);
		//Define a dummy view that just immediately fires callbacks
		this.currentView = new View('~', '~', function (a, b, callback) { callback(); }, function (a, b, callback) { callback(); });
		//Set up routing on hashchange, and ensure routing happens on every page load
		$(document).ready(function () {
			router.run();
		});
		$(window).hashchange(function () {
			router.run();
		});
	};

	/**
	 * Transition from one view to another
	 * @param	toView			The ID of the view to load
	 * @param	params			The provided URL parameters
	 * @param	forceRefresh	[Optional] 	Force Nav to perform the transition even if 
	 *										the to and from IDs are the same
	 */
	Nav.prototype.transition = function (toView, params, forceRefresh) {
		var self = this,
			fromView = this.currentView;
		//Make the URL parameters available
		this.params = params;
		//Ensure a csc.View was passed
		if(!toView instanceof View) throw new Error('002: wrongObjectType', [
			'1', 'Nav.transition', 'csc.View'
		]).getMessage();
		//If forceRefresh isn't enabled, don't transition on identical targets
		// if(!forceRefresh && this.currentView.id == toView.id) return;
		//Transition the current view out
		this.currentView.tranOut(toView, this.viewport, function () {
			//Ensure all handlers, etc. for the current view get destroyed
			self.viewport.find("*").andSelf().unbind();
			self.viewport.empty();
			//Get the nre
			self.currentView = toView;
			self.prepareTemplate(function () {
				self.currentView.tranIn(fromView, self.viewport); //Do any transitions, setup, etc. needed for the page
			});
		});
	};

	/**
	 * Prepare the template tag and container for the new view inside
	 * the specified viewport
	 * @param	callback	function	A callback function to invoke when
	 *									template loading is completed
	 */
	Nav.prototype.prepareTemplate = function (callback) {
		this.viewport.load(this.currentView.url(), callback);
	};

	ko.bindingHandlers.navClick = {
			init : function (element, value) {
				$(element).bind('click', function () {
					window.location.hash = value();
				});
			}
	};

	return Nav;

})();

//End module
});