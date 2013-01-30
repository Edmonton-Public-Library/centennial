;
var epl = epl || {};
define(['epl'], function () {

epl.map = (function () {

	var map = function (viewport) {
		this.viewport = $(viewport);

	};

	var init = function () {
		var mapOptions = {
			center: new google.maps.LatLng(-34.397, 150.644),
			zoom: 8,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  	}

	return map;

})();

return epl.map;
//End module
});