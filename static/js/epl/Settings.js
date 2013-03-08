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
	apiAccountUrl : '/account/',
	viewDirectory : function () { return '/static/views'; },
	imageDirectory : '/static/images',

	//API Keys
	apiKeys : {
		google : {
			maps : 'AIzaSyA59Z_Kym_voRl--cHJzYkep3Cs-_71'
		},
		facebook : {
			connect : '150662938425048'
		}
	},

	//Set up application routes
	routes : Sammy(function () {

		var self = this;

		//Route to Terms and Conditions
		this.get('#termsAndConditions', function () {
			require(['epl', 'views'], function (epl, views) {
				epl.nav.transition(views.termsAndConditions);
			});
		});
		
		//Route to Create Account view
		this.get('#createAccount', function () {
			require(['epl', 'views'], function (epl, views) {
				epl.nav.transition(views.createAccount);
			});
		});

		//Route to Create Account Success view
		this.get('#createAccountSuccess', function () {
			require(['epl', 'views'], function (epl, views) {
				epl.nav.transition(views.createAccountSuccess);
			});
		});
		
		//Route to Upload Story view
		this.get('#uploadStory', function () {
			require(['epl', 'views'], function (epl, views) {
				epl.nav.transition(views.uploadStory);
			});
		});

		//Route to Upload Story Success view
		this.get('#uploadStorySuccess', function () {
			require(['epl', 'views'], function (epl, views) {
				epl.nav.transition(views.uploadStorySuccess);
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
