;
//Create a module to contain client-side views
define(['epl', 'lib/csc/View', 'lib/knockout', 'epl/Environment'], function(epl, View, ko, Environment) {

return {

/*************************
 * The main TimeMap view *
 ************************/
main : new View('timemap', 'Home', 
		//in
		function (fromView, viewport, callback) {
			var self = this,
				mapCanvas = $('#tm-canvas'),
				sidebar = null;

			require(['epl/Map', 'epl/Sidebar', 'lib/epl/Input'], function(Map, Sidebar) {
				
				//Persist the map between navigations
				epl.storage.map = epl.storage.map || null;

				//Load the Google Maps API if not already loaded
				if (epl.storage.map == null) {
					epl.storage.map = new Map(function () {
						epl.storage.map.render(mapCanvas);
					});
					ko.applyBindings({
						Environment : Environment
					});
				//Otherwise display the loaded map
				} else {
					epl.storage.map.render(mapCanvas);
				}

				//Initialize the sidebar
				sidebar = new Sidebar($('#tm-sidebar'));

			});
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
		}),

/**************************************
 * Upload Story view *
 *************************************/
uploadStory : new View('uploadStory', 'Upload Story', 
		//in
		function (fromView, viewport, callback) {
			require(['epl/UploadStoryViewModel', 'lib/epl/Input'], function (UploadStoryViewModel) {
			    var uploadStoryViewModel = new UploadStoryViewModel();
				ko.applyBindings(uploadStoryViewModel);
			});
			callback();
		}, 

		//out
		function (toView, viewport, callback) {
			callback();
		})
};

//End module
});