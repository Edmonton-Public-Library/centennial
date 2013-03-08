;
define(['epl/Authentication', 'lib/knockout'], function (Authentication, ko) {

return (function () {

	var EPLBar = function (selector) {
		var self = this;

		//Don't try to initialize before the page is ready
		$(document).ready(function () {
			self.element = $(selector);
			self.initButtons();

			ko.applyBindings({}, self.element[0]);
		});
	};

	/**
	 * Initializes any buttons in the EPLBar to work with menu drop-downs 
	 * like the Account button
	 */
	EPLBar.prototype.initButtons = function () {
		this.element.find('.buttons').find('li').bind('click', function(e) {
			var button = $(this);
			button.addClass('active');
			e.stopPropagation();

			//TODO: Better event handler cleanup
			$(document).bind('click', function () {
				button.removeClass('active');
			});
		});
	};

	return EPLBar;

})();

});