;
define(['epl/Environment'], function (Environment) {

return (function () {

	var BranchPin = function (options) {

		var pinIcons = {
			std: Environment.routes.staticDirectory + '/images/std-pin.png',
			'bookmobile-bus': Environment.routes.staticDirectory + '/images/bookmobile-bus-pin.png',
			'bookmobile-trolley': Environment.routes.staticDirectory + '/images/bookmobile-bus-pin.png'
		};

		this.type = 'std';
		this.id = '';
		this.name = '';
		this.description = '';
		this.lat = 0;
		this.lng = 0;
		this.storyCount = 0;
		this.marker = null;
		this.iconUrl = pinIcons[this.type];

		for(option in options) {
			if(typeof this[option] != 'undefined') {
				this[option] = options[option];
			}
		}
	};

	return BranchPin;

})();

//End module
});