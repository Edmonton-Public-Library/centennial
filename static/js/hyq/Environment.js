;
define(['lib/knockout'], function (ko) {

	var Environment = new(function () {
		var self = this;
		this.routes = new (function () {
			this.staticDirectory = '/static';
			this.imageDirectory = this.staticDirectory + '/images';
		});

		this.user = ko.observable({});
	});

	return Environment;
});