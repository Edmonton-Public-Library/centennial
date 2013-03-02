;
//Create a module to contain client-side views
define(['epl', 'lib/csc/View', 'lib/knockout', 'epl/Environment', 'epl/map/StoryPin'], function(epl, View, ko, Environment, StoryPin) {

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

			require(['epl/Map', 'epl/Sidebar', 'lib/epl/Input', 'epl/map/BranchPin', 'epl/Timeline'], function(Map, Sidebar, Input, BranchPin, Timeline) {

				epl.initFacebook();
				//Persist the map and timeline between navigations
				epl.storage.map = epl.storage.map || null;
				epl.storage.timeline = epl.storage.timeline || null;

				//Load the Google Maps API if not already loaded
				if (epl.storage.map == null) {
					epl.storage.map = new Map(function () {
						epl.storage.map.render(mapCanvas);
						epl.storage.timeline = new Timeline('#timeline', epl.storage.map);
					});
					ko.applyBindings({
						Environment : Environment
					}, mapCanvas[0]);
				//Otherwise display the loaded map
				} else {
					epl.storage.map.render(mapCanvas);
				}

				//Initialize the sidebar
				sidebar = new Sidebar($('#tm-sidebar'));
				//Select the first available tab by default
				sidebar.tab($(viewport.find('.tab')[0]).attr('data-tab'));
			});
		}, 

		//out
		function (toView, viewport, callback) {
			callback();
		}),

/**************************************
 * Create Account View *
 *************************************/
createAccount : new View('createAccount', 'createAccount', 
		function (fromView, viewport, callback) {
			require(['epl/CreateAccountViewModel'], function (CreateAccountViewModel) {
				var createAccountViewModel = new CreateAccountViewModel();
				ko.applyBindings(createAccountViewModel);
			});
			callback();
		}, 

		//out
		function (toView, viewport, callback) {
			callback();
		}),

/**************************************
 * Terms and Conditions *
 *************************************/
termsAndConditions : new View('termsAndConditions', 'termsAndConditions', 
		function (fromView, viewport, callback) {
			callback();
		}, 

		//out
		function (toView, viewport, callback) {
			callback();
		}),

/*************************************
* Branch View 
*************************************/
branch : new View('branch', 'Branch',
		function (fromView, viewport, callback) {
			require(['epl/Branch'], function (Branch) { 
				var brch = new Branch($('#BranchView'), "/static/sample.gif");
				brch.showPin(new StoryPin("video", "1", "Jan1")); 
				brch.showPin(new StoryPin("audio", "2", "Jan2")); 
			  	brch.showPin(new StoryPin("text", "3", "Jan3")); 
				brch.showPin(new StoryPin("video", "4", "Jan4")); 
				brch.showPin(new StoryPin("link", "5", "Jan5")); 
				brch.showPin(new StoryPin("image", "6", "Jan6")); 
				brch.showPin(new StoryPin("pdf", "7", "Jan7")); 

			});
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
		}),

/**************************************
 * Upload Story Success view *
 *************************************/
uploadStorySuccess : new View('uploadStorySuccess', 'Upload Story Success', 
		//in
		function (fromView, viewport, callback) {
			callback();
		}, 

		//out
		function (toView, viewport, callback) {
			callback();
		}),

/**************************************
 * View Story view *
 *************************************/
viewStory : new View('viewStory', 'View Story', 
        //in
        function (fromView, viewport, callback) {
            require(['epl/StoryViewModel', 'lib/jquery.jplayer', 'lib/pdfobject'], function (StoryViewModel) {
                // Obtain the story id from the URL param
                var story = new StoryViewModel(epl.nav.params['id']);
                ko.applyBindings(story);
                
                if (story.content_type() == "audio") {
                    $("#audio").addClass('visible');
                    $("#audio_jplayer").jPlayer({
                        ready: function () {
                            $(this).jPlayer("setMedia", {
                                mp3: story.media_file()
                            });
                        },
                        supplied: "mp3", 
                        swfPath: "/static/swf/Jplayer.swf"
                    });
                } else if (story.content_type() == "video") {
                    $("#video").addClass('visible');
                    $("#jquery_jplayer_1").jPlayer({
                        ready: function () {
                            $(this).jPlayer("setMedia", {
                                m4v: story.media_file()
                            });
                        },
                        supplied: "m4v",
                        swfPath: "/static/swf/Jplayer.swf"
                    });
                } else if (story.content_type() == "pdf") {
                    $("#pdf").addClass('visible');
                    var pdf = new PDFObject({
                        url: story.media_file(),
                        width: "700px",
                        height: "500px"
                    }).embed("pdf");
                }
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
