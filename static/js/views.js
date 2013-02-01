;
//Create a module to contain client-side views
define(['epl', 'lib/csc/View'], function(epl, View) {

return {

/*************************
 * The main TimeMap view *
 ************************/
main : new View('timemap', 'Home', 
		//in
		function (fromView, viewport, callback) {
			var self = this,
				mapCanvas = $('#tm-canvas');
			
			//Persist the map between navigations
			epl.storage.map = epl.storage.map || null;

			//Load the Google Maps API if not already loaded
			if (epl.storage.map == null) {
				require(['epl/Map'], function (Map) {
					epl.storage.map = new Map(function () {
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
		}),

/**************************************
 * An example view to test navigation *
 *************************************/
example : new View('example', 'Example', 
		function (fromView, viewport, callback) {
			callback();
		}, 

		//out
		function (toView, viewport, callback) {
			callback();
		})

};

/**************************************
 * Upload Story view *
 *************************************/
epl.views.uploadStory = new csc.View('uploadStory', 'Upload Story', 
	//in
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