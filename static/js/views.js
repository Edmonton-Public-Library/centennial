;
//Create a module to contain client-side views
define(['timemap', 'lib/csc/View', 'lib/knockout', 'timemap/Environment', 'timemap/map/StoryPin', 'lib/epl/Input', 'timemap/EPLBar'], function(epl, View, ko, Environment, StoryPin, Input, EPLBar) {

return {

/*************************
 * The main TimeMap view *
 ************************/
main : new View('timemap', 'Home', 
		//in
		function (fromView, viewport, callback) {
			var self = this,
				mapCanvas = $('#tm-canvas'),
				sidebar = null,
				catchKey = true;

			require(['timemap/Map', 'lib/epl/Input', 'timemap/map/BranchPin', 'timemap/Timeline'], function(Map, Input, BranchPin, Timeline) {

				//Persist the map and timeline between navigations
				epl.storage.map = epl.storage.map || null;
				epl.storage.timeline = epl.storage.timeline || null;
				Environment.chrome.timeline.enable();

				//Load the Google Maps API if not already loaded
				if (epl.storage.map == null) {
					epl.storage.map = new Map(function () {
						epl.storage.map.render(mapCanvas);
						epl.storage.timeline = new Timeline('#timeline', epl.storage.map);
						Environment.chrome.timeline.enable();
					});
					ko.applyBindings({
						Environment : Environment
					}, mapCanvas[0]);
				//Otherwise display the loaded map
				} else {
					epl.storage.map.render(mapCanvas);
				}

				$('.buttons').find('#auth-username').eplInput();
				$('.buttons').find('#auth-password').eplInput();
			});
		}, 

		//out
		function (toView, viewport, callback) {
			callback();
		}),

/**************************************
 * My Account View *
 *************************************/
myAccount : new View('myAccount', 'myAccount', 
		function (fromView, viewport, callback) {
			require(['timemap/MyAccountViewModel'], function (MyAccountViewModel) {
				var myAccountViewModel = new MyAccountViewModel();
				ko.applyBindings(myAccountViewModel, $('#tm-content-panel')[0]);
				Environment.chrome.timeline.disable();
			});
		}, 

		//out
		function (toView, viewport, callback) {
			callback();
		}),

/**************************************
 * Update Account Success View *
 *************************************/
updateAccountSuccess : new View('updateAccountSuccess', 'updateAccountSuccess', 
		function (fromView, viewport, callback) {
			Environment.chrome.timeline.disable();
			callback();
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
			require(['timemap/CreateAccountViewModel'], function (CreateAccountViewModel) {
				var createAccountViewModel = new CreateAccountViewModel();
				ko.applyBindings(createAccountViewModel, $('#tm-content-panel')[0]);
				Environment.chrome.timeline.disable();
			});

			// Set the URL for the Terms and Conditions link
			var termsAndConditionsURL = Environment.routes.staticDirectory + "/views/termsAndConditions.html";
			$("#termsAndConditions").attr("href", termsAndConditionsURL);
			callback();
		}, 

		//out
		function (toView, viewport, callback) {
			callback();
		}),

/**************************************
 * Create Account Success View *
 *************************************/
createAccountSuccess : new View('createAccountSuccess', 'createAccountSuccess', 
		function (fromView, viewport, callback) {
			Environment.chrome.timeline.disable();
			callback();
		}, 

		function (toView, viewport, callback) {
			callback();
		}),

/*************************************
* Branch View 
*************************************/
branch : new View('branch', 'Branch',
		function (fromView, viewport, callback) {
			require(['timemap', 'timemap/Branch', 'timemap/Map'], function (epl, Branch, Map) { 
				Map.withBranchInfo(epl.nav.params.id, function (branchData) {
					var branch = new Branch($('#branch-viewer'));
					branch.setData(branchData);

					Environment.sidebar.setFeaturedStoriesSource('branch', epl.nav.params.id);
				});
				// brch.showPin(new StoryPin("video", "1", "a Video")); 
				// brch.showPin(new StoryPin("audio", "2", "some audio")); 
			 //  	brch.showPin(new StoryPin("text", "3", "Fred's story")); 
				// brch.showPin(new StoryPin("video", "4", "second video")); 
				// brch.showPin(new StoryPin("link", "5", "link to somewhere")); 
				// brch.showPin(new StoryPin("pdf", "7", "a pdf"));

				// ko.applyBindings({Environment: Environment}, $('#BranchView')[0]); 
			});
			callback();
		},

		//out
		function (toView, viewport, callback) {
			//Reset the displayed Featured Stories set to 'all stories'
			Environment.sidebar.setFeaturedStoriesSource('all');
			callback();
		}),

/**************************************
 * Upload Story view *
 *************************************/
uploadStory : new View('uploadStory', 'Upload Story', 
		//in
		function (fromView, viewport, callback) {
			require(['timemap/UploadStoryViewModel', 'lib/epl/Input'], function (UploadStoryViewModel) {
				var uploadStoryViewModel = new UploadStoryViewModel();
				ko.applyBindings(uploadStoryViewModel, $('#tm-content-panel')[0]);
				Environment.chrome.timeline.disable();
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
			Environment.chrome.timeline.disable();
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
            require(['timemap/StoryViewModel', 'lib/jquery.jplayer', 'lib/pdfobject'], function (StoryViewModel) {
                // Obtain the story id from the URL param
                var story = new StoryViewModel(epl.nav.params['id']);
                ko.applyBindings(story, $('#tm-content-panel')[0]);

                Environment.chrome.timeline.disable();
                if (story.content_type() == "audio") {
                    $("#audio").addClass('visible');
                    $("#audio_jplayer").jPlayer({
                        ready: function () {
                            $(this).jPlayer("setMedia", {
                                mp3: story.media_file()
                            });
                        },
                        solution: 'flash',
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
                        width: "690px",
                        height: "500px"
                    }).embed("pdf");
                } else if (story.content_type() == "image") {
                    $("#image").addClass('visible');
                } else if (story.content_type() == "link") {
                    $("#link").addClass('visible');
                } else if (story.content_type() == "text") {
                    $("#text").addClass('visible');
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
