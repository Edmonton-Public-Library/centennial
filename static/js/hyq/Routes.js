;
define(['lib/sammy', 'hyq/Dashboard', 'hyq/QuestPopUp'], function (Sammy, Dashboard, QuestPopUp) {

/******************************
 * Contains app-wide settings *
 *****************************/
return {
	//Set up application routes
	routes : Sammy(function () {

		var self = this;
		
		self.get('', function () {
			var dash = new Dashboard($('#dashboard'));
		});

	})


};

//End module
});
