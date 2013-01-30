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
		var self = this,
			mapCanvas = $('#tm-canvas');
		
		//Persist the map between navigations
		epl.storage.map = epl.storage.map || null;

		//Load the Google Maps API if not already loaded
		if (epl.storage.map == null) {
			require(['epl.Map'], function () {
				epl.storage.map = new epl.Map(function () {
					epl.storage.map.render(mapCanvas);
				});
			});
		//Otherwise display the loaded map
		} else {
			epl.storage.map.render(mapCanvas);
		}
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