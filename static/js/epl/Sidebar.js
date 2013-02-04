;
define(function () {

	return (function () {

		var Sidebar = function (viewport) {

			//TODO: REMOVE! THIS IS FOR EXPERIMENTING ONLY!
			$('.search-box').eplInput({
				events: {
					textChanged: {
						callback: function (element, value, oldValue) { 
							$('.results').html('Results for: ' + value);
						},

						interval: 0
					}
				}
			});
		};

		return Sidebar;

	})();

});