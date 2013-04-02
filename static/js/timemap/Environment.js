;
define(['lib/knockout'], function (ko) {

	var Environment = new(function () {
		var self = this;

		this.page = 'timemap';

		this.components = new (function () {
			this.sidebar = {};
		});

		this.user = ko.observable(null);

		this.chrome = new (function () {
			var chrome = this;
			this.timeline = {
				displayHeight: 80,
				height: ko.observable(0),
				disable: function () { chrome.timeline.height(0); },
				enable: function () { chrome.timeline.height(chrome.timeline.displayHeight); }
			};
		})();

		//Display characteristics
		this.display = new (function () {
			var display = this;

			this.width = ko.observable($(window).width());
			this.height = ko.observable($(window).height());

			this.mouseX = ko.observable(0);
			this.mouseY = ko.observable(0);

			this.sideBarWidth = ko.observable(350); //in pixels
			this.topBarHeight = ko.computed(function () {
				return 60 + self.chrome.timeline.height();
				// return 139;
			}); //pixels

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
			this.staticDirectory = '/static';
			this.imageDirectory = this.staticDirectory + '/images';
			this.styleDirectory = this.staticDirectory + '/styles';
		})();
	})();

	//Keep the display values up to date
	$(window).resize(function () {
		Environment.display.width($(window).width());
		Environment.display.height($(window).height());
	});

	//Keep mouse movements up to date
	$(window).mousemove(function (e) {
		Environment.display.mouseX(e.pageX);
		Environment.display.mouseY(e.pageY);
	}).click(function (e) {
		Environment.display.mouseX(e.pageX);
		Environment.display.mouseY(e.pageY);
	});

	return Environment;
});