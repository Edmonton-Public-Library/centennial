;
define(['lib/sammy'], function (Sammy) {

/******************************
 * Contains app-wide settings *
 *****************************/
return {
	//Set up application routes
	routes : Sammy(function () {

		var self = this;
		
		self.get('', function () {
			console.log('test!');
			// require(['timemap', 'views'], function (epl, views) {
			// 	epl.nav.transition(views.main);
			// });
		});

	})
};

//End module
});
