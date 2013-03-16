;
define(['lib/sammy'], function (Sammy) {

/******************************
 * Contains app-wide settings *
 *****************************/
return {
	//Set up application routes
	routes : Sammy(function () {

		var self = this;
		
		//Route to Create Account view
		this.get('#createAccount', function () {
			require(['timemap', 'views'], function (epl, views) {
				epl.nav.transition(views.createAccount);
			});
		});

		//Route to Create Account Success view
		this.get('#createAccountSuccess', function () {
			require(['timemap', 'views'], function (epl, views) {
				epl.nav.transition(views.createAccountSuccess);
			});
		});
		
		//Route to Upload Story view
		this.get('#uploadStory', function () {
			require(['timemap', 'views'], function (epl, views) {
				epl.nav.transition(views.uploadStory);
			});
		});

		//Route to Upload Story Success view
		this.get('#uploadStorySuccess', function () {
			require(['timemap', 'views'], function (epl, views) {
				epl.nav.transition(views.uploadStorySuccess);
			});
		});

    		//branch view 
		this.get('#branch/:id', function () {
			var self = this;
			require(['timemap', 'views'], function (epl, views) {
				epl.nav.transition(views.branch, self.params);
			});
		});
		
		//Route to View Story view
		this.get('#viewStory/:id', function () {
			var self = this;
			require(['timemap', 'views'], function (epl, views) {
				epl.nav.transition(views.viewStory, self.params);
			});
		});
		
		self.get('', function () {
			require(['timemap', 'views'], function (epl, views) {
				epl.nav.transition(views.main);
			});
		});

	})
};

//End module
});
