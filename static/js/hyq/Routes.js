;
define(['lib/sammy', 'hyq/Dashboard'], function (Sammy, Dashboard) {

/******************************
 * Contains app-wide settings *
 *****************************/
return {
	//Set up application routes
	routes : Sammy(function () {

		var self = this;
		
		self.get('', function () {
			//Initialize the quest sliders
			$('.iosSlider').iosSlider({
				desktopClickDrag : true,
			});

			var dash = new Dashboard($('#dashboard'));
		});

	})
};

//End module
});
