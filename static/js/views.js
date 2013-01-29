;
var epl = epl || {};
epl.views = epl.views || {};

//Create a module to contain client-side views
define(['lib/csc.View'], function() {

/*************************
 * The main TimeMap view *
 ************************/
epl.views.main = new csc.View('timemap', 'Home', 
	//in
	function (fromView, viewport, callback) {
		alert('home');
		callback();
	}, 

	//out
	function (toView, viewport, callback) {
		alert('leaving home');
		callback();
	}
);

/**************************************
 * An example view to test navigation *
 *************************************/
epl.views.example = new csc.View('example', 'Example', 
	function (fromView, viewport, callback) {
		alert('example');
		callback();
	}, 

	//out
	function (toView, viewport, callback) {
		alert('leaving example');
		callback();
	}
);

//End module
});