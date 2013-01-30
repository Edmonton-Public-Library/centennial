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
		//Load the Google Maps API
		require(['epl.map'], function () {
			var map = new epl.map($('#tm-canvas'));
		});
	}, 

	//out
	function (toView, viewport, callback) {
		callback();
	}
);

/**************************************
 * An example view to test navigation *
 *************************************/
epl.views.example = new csc.View('example', 'Example', 
	function (fromView, viewport, callback) {
		callback();
	}, 

	//out
	function (toView, viewport, callback) {
		callback();
	}
);

//End module
});