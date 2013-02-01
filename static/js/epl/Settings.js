;
define(['lib/sammy'], function (epl) {

/******************************
 * Contains app-wide settings *
 *****************************/
return {
	siteUrl : 'http://localhost:8000',
	viewDirectory : function () { return '/static/views'; },

	//API Keys
	apiKeys : {
		'google' : {
			'maps' : 'AIzaSyA59Z_Kym_voRl--cHJzYkep3Cs-_71'
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
				epl.nav.transition(epl.views.example);
			});
		});
		
		//Route to Upload Story view
		this.get('#uploadStory', function () {
			epl.nav.transition(epl.views.uploadStory);
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