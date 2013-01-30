;
var epl = epl || {};
define(['epl', 'epl.settings'], function () {

epl.map = (function () {

	var map = function (viewport) {
		var self = this;
		this.mapOptions = null;
		this.map = null;
		this.viewport = $(viewport);
		require(['https://maps.googleapis.com/maps/api/js?key=' + epl.settings.apiKeys.google.maps + 'luc&sensor=true&callback=init'], function () {
		});

		window.init = function () {

			//Set up the map
			self.mapOptions = {
				center : new google.maps.LatLng(53.5472, -113.5006),
				zoom : 11,
				mapTypeId : google.maps.MapTypeId.ROADMAP,
			};

			//Run the map loader
			self.map = new google.maps.Map(self.viewport[0], self.mapOptions);
		};
	};

	return map;

})();

return epl.map;
//End module
});