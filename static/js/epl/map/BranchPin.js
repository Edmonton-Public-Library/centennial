;
define(function () {

return (function () {

	var BranchPin = function (options) {

		this.type = 'std';
		this.id = '';
		this.name = '';
		this.description = '';
		this.lat = 0;
		this.lng = 0;
		this.storyCount = 0;
		this.marker = null;

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