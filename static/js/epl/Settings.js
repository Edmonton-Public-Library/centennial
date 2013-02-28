;
define(['lib/sammy'], function (Sammy) {

/******************************
 * Contains app-wide settings *
 *****************************/
return {
	//TODO: Need to keep these paths in either Settings **OR** Environment. Not both.
	siteUrl : 'http://localhost:8000',
	apiBranchUrl : '/api/v1/branch/',
	apiStoryUrl : '/api/v1/story/',
	viewDirectory : function () { return '/static/views'; },
	imageDirectory : '/static/images',

	//API Keys
	apiKeys : {
		google : {
			maps : 'AIzaSyA59Z_Kym_voRl--cHJzYkep3Cs-_71'
		}
	},

	//Set up application routes
	routes : Sammy(function () {

		var self = this;

		//Example route
		self.get('#example', function () {
			//The template within /static/views/example.html will be loaded into the viewport provided to the AppClass constructor
			//@see the csc.View constructor for information on transitioning between views using the parameters below
			require(['epl', 'views'], function (epl, views) {
				epl.nav.transition(views.example);
			});
		});
		
		//Route to Upload Story view
		this.get('#uploadStory', function () {
			require(['epl', 'views'], function (epl, views) {
				epl.nav.transition(views.uploadStory);
			});
		});

    		//branch view 
		this.get('#branch', function () {
                        require(['epl', 'views'], function (epl, views) {
                                epl.nav.transition(views.branch);
                        });
                });


		
		//Route to View Story view
		this.get('#viewStory/:id', function () {
			var self = this;
			require(['epl', 'views'], function (epl, views) {
				epl.nav.transition(views.viewStory, self.params);
			});
		});
		
		self.get('', function () {
			require(['epl', 'views'], function (epl, views) {
				epl.nav.transition(views.main);
			});
		});

	})
};

//End module
});
