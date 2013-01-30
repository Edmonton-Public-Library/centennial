;
var epl = epl || {};
define(['epl'], function () {

/******************************
 * Contains app-wide settings *
 *****************************/
var settings = {
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

		//Example route
		this.get('#example', function () {
			//The template within /static/views/example.html will be loaded into the viewport provided to the AppClass constructor
			//@see the csc.View constructor for information on transitioning between views using the parameters below
			epl.nav.transition(epl.views.example);
		});

		this.get('', function () {
			epl.nav.transition(epl.views.main);
		});

	})
};

//Apply the settings
epl.settings = settings;

//End module
});