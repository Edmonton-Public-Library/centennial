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
				if(epl.nav.params) {
					var date = new Date();
					date.setYear(epl.nav.params.year);
				} else {
					date = epl.storage.selectedDate;
				}

				//Load the Google Maps API if not already loaded
				if (epl.storage.map == null) {
					epl.storage.map = new Map(function () {
						epl.storage.map.resetPins();
						epl.storage.map.render(mapCanvas);
						Environment.chrome.timeline.enable();
						epl.storage.timeline = new Timeline('#timeline', epl.storage.map, date);
					});
					ko.applyBindings({
						Environment : Environment
					}, mapCanvas[0]);
				//Otherwise display the loaded map
				} else {
					epl.storage.map.render(mapCanvas);
					Environment.chrome.timeline.enable();
					epl.storage.map.resetPins();
					epl.storage.timeline = new Timeline('#timeline', epl.storage.map, date);
				}
			});
		}, 

		//out
		function (toView, viewport, callback) {
			epl.storage.selectedDate = epl.storage.timeline.getCurrentDate();
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

/**************************************
 * Email Confirmation View *
 *************************************/
emailConfirmation : new View('emailConfirmation', 'emailConfirmation', 
		function (fromView, viewport, callback) {
			Environment.chrome.timeline.disable();
			callback();
		}, 

		//out
		function (toView, viewport, callback) {
			callback();
		}),

/**************************************
 * Email Reconfirm View *
 *************************************/
emailReconfirm : new View('emailReconfirm', 'emailReconfirm', 
		function (fromView, viewport, callback) {
			Environment.chrome.timeline.disable();
			callback();
		}, 

		//out
		function (toView, viewport, callback) {
			callback();
		}),


/**************************************
 * Login Success view *
 *************************************/
loginSuccess : new View('loginSuccess', 'Login Success', 
		//in
		function (fromView, viewport, callback) {
			Environment.chrome.timeline.disable();
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
			require(['timemap', 'timemap/Branch', 'timemap/Map', 'timemap/Timeline'], function (epl, Branch, Map, Timeline) { 
				Environment.chrome.timeline.enable();
				Map.withBranchInfo(epl.nav.params.id, function (branchData) {
					var branch = new Branch($('#branch-viewer'));
					branch.setData(branchData);

					epl.storage.timeline = new Timeline('#timeline', {}, epl.storage.selectedDate, epl.nav.params.id, branch);

					Environment.sidebar.setFeaturedStoriesSource('branch', epl.nav.params.id);
				});
			});
			callback();
		},

		//out
		function (toView, viewport, callback) {
			//Reset the displayed Featured Stories set to 'all stories'
			Environment.sidebar.setFeaturedStoriesSource('all');
			epl.storage.selectedDate = epl.storage.timeline.getCurrentDate();
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
            var storyId = epl.nav.params['id'];
            epl.updateQuest({
				story : storyId,
				onMap : false
			});
            require(['timemap/StoryViewModel', 'lib/jquery.jplayer', 'lib/pdfobject'], function (StoryViewModel) {
                // Obtain the story id from the URL param
                var story = new StoryViewModel(storyId);
                ko.applyBindings(story, $('#tm-content-panel')[0]);

                Environment.chrome.timeline.disable();
                if (story.content_type() == "audio") {
                    $("#audio").addClass('visible');
                    $("#audio_jplayer").jPlayer({
                        ready: function () {
                            $(this).jPlayer("setMedia", {
                                mp3: story.media_file() + "?nocache=" + new Date().getTime()
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
                                m4v: story.media_file() + "?nocache=" + new Date().getTime()
                            });
                        },
                        supplied: "m4v",
                        swfPath: "/static/swf/Jplayer.swf"
                    });
                } else if (story.content_type() == "pdf") {
                    $("#pdf").addClass('visible');
                    var pdf = new PDFObject({
                        url: story.media_file(),
                        width: "650px",
                        height: "500px"
                    }).embed("pdf");
                } else if (story.content_type() == "image") {
                    $("#image").addClass('visible');
                } else if (story.content_type() == "link") {
                    $("#link").addClass('visible');
                } else if (story.content_type() == "text") {
                    $("#text").addClass('visible');
                }

                $.get('/preferences/', function(json) {
                    baseURL = json.base_url;
                });

                var commentsDiv = $('#fb-comments')[0];
                commentsDiv.innerHTML = "<fb:comments href='" +
                    baseURL + "/timemap/#viewStory/" + storyId +
                    "' num_posts=5 width='600'></fb:comments>";  
                FB.XFBML.parse(commentsDiv);

                //load the facebook buttons here
                var facebookDiv = $('#my-facebook-share-button')[0];
                facebookDiv.innerHTML = 
                    '<div class="fb-like" data-send="false" data-width="450"\
                        data-show-faces="false" data-font="arial"\
                        data-colorscheme="dark" data-action="like"></div>'
                FB.XFBML.parse(facebookDiv, function () {
                	FB.Event.subscribe('edge.create', function(href, widget) {
						epl.updateSocialQuest({
							story : storyId
						});
					});
                });

                //load the twitter button here
                var twitterDiv = $('#my-twitter-share-button')[0];
                twitterDiv.innerHTML = 
                    '<a href="https://twitter.com/share" class="twitter-share-button" data-text="'+ story.title() + '" data-lang="en" data-hashtags="epl"></a>';
                $.getScript('http://platform.twitter.com/widgets.js', function() {
                    twttr.widgets.load(twitterDiv);
                    twttr.events.bind('tweet', function(event) {
                        epl.updateSocialQuest({
                        	story : storyId
                        });
                    });
                });

                //load the googlePlus share button here
                var googlePlusDiv = $('#my-googleplus-share-button')[0];
                var pageCannonicalHref = baseURL + "/timemap/#viewStory/" + storyId;
                googlePlusDiv.innerHTML = '<div class="g-plus" data-action="share" data-annotation="bubble" href="'+pageCannonicalHref+'"></div>';
                var gpd = $(googlePlusDiv).find('.g-plus')[0];
                $.getScript("https://apis.google.com/js/plusone.js" , function() {
                    gapi.plusone.go(gpd);
                    /*epl.updateSocialQuest({
	                	story : storyId
	                });*/
                });
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
