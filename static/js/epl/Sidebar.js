;
define(function () {

	return (function () {

		var Sidebar = function (viewport) {

			//TODO: REMOVE! THIS IS FOR EXPERIMENTING ONLY!
			$('.search-box').eplInput({
				events: {
					onchange: {
						callback: function (e) { 
							$('.results').html('Results for: ' + e.currentValue);
						},

						interval: 100
					}
				}
			});

			$('.search-select').eplInput({
				events: {
					onchange: {
						callback: function (e) {
							console.log(e.currentValue);
						}
					}
				}
			});
		};

		return Sidebar;

	})();

});