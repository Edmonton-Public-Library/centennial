;
define(['lib/knockout'], function (ko) {

	var Environment = new(function () {

		//Display characteristics
		this.display = new (function () {
			var display = this;

			this.width = ko.observable($(window).width());
			this.height = ko.observable($(window).height());

			this.sideBarWidth = ko.observable(350); //in pixels
			this.topBarHeight = ko.observable(60); //pixels

			this.viewportWidth = ko.computed(function () {
				return display.width() - display.sideBarWidth();
			});

			this.viewportHeight = ko.computed(function () {
				return display.height() - display.topBarHeight();
			});
		})();

		//Server paths and other route information
		this.routes = new (function () {
			this.baseUri = 'http://localhost:8000'; //TODO: Make this portable
			this.apiBase = '/api/v1';
		})();
	})();

	//Keep the display values up to date
	$(window).resize(function () {
		Environment.display.width($(window).width());
		Environment.display.height($(window).height());
	});

	return Environment;
});