;
define(['lib/sammy', 'hyq/Dashboard', 'hyq/Environment'], function (Sammy, Dashboard, Environment) {

/******************************
 * Contains app-wide settings *
 *****************************/
return {
	//Set up application routes
	routes : Sammy(function () {

		var self = this;
		
		self.get('', function () {
			Environment.dashboard = new Dashboard($('#dashboard'));
		});

	})


};

//End module
});
