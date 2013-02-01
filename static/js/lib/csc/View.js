;
define(['epl/Settings' ,'lib/csc/Utils'], function(Settings, Utils) {
	
/**
 * Wraps view functionality for use with csc.Nav
 * Dependencies:	epl
 *					csc.Utils
 */
return (function () {

	//TODO: Find a better way to do this without the rest of CSC app framework
	var viewDirectory = function () { return Settings.viewDirectory() || '/'; }; //requires EPL to be initialized

	var View = function (viewID, viewTitle, inFunction, outFunction) {
		this.id = viewID;
		this.title = viewTitle;
		this.url = function () { return viewDirectory() + '/' + this.id + '.html' };
		this.inFunction = inFunction || function (a, b, callback) { callback(); };
		this.outFunction = outFunction || function (a, b, callback) { callback(); };

	};

	/**
	 * Invokes this view's 'in' transition function and
	 * then invokes the callback
	 * @param	fromView	csc.View	The view being transitioned from
	 *									(allows different transitions from 
	 *									different sources)
	 * @param	callback	function	The callback to invoke when done transitioning
	 */
	View.prototype.in = function (fromView, viewport, callback) {
		this.inFunction(fromView, viewport, function () {
			if(!Utils.isFunction(callback)) return;
			callback();
		});
	};

	/**
	 * Invokes this view's 'out' transition function and
	 * then invokes the callback
	 * @param	toView	csc.View	The view being transitioned to
	 *								(allows different transitions to 
	 *								different targets)
	 * @param	callback	function	The callback to invoke when done transitioning
	 */
	View.prototype.out = function (toView, viewport, callback) {
		this.outFunction(toView, viewport, function () {
			if(!Utils.isFunction(callback)) return;
			callback();	
		});
	};

	return View;

})();

//End module
});