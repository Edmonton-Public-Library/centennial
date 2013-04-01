;
define(['timemap/Authentication', 'lib/knockout', 'timemap/Environment', 'hyq/Environment', 'epl/Settings'], function (Authentication, ko, TimemapEnvironment, HYQEnvironment, Settings) {

return (function () {

	var loginEndpoint = '/account/login/centennial/';
	var accountInfoEndpoint = '/account/current';

	var EPLBar = function (selector) {
		var self = this;

		EPLBar.getUserInfo();

		//Don't try to initialize before the page is ready
		$(document).ready(function () {
			self.element = $(selector);
			self.initButtons();
			ko.applyBindings({Environment: TimemapEnvironment, Settings: Settings}, self.element[0]);
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

	EPLBar.getUserInfo = function () {
		$.get(accountInfoEndpoint, function(data) {
			TimemapEnvironment.user(data);
			HYQEnvironment.user(data);
		});
	};

	ko.bindingHandlers.loginForm = {
		init: function (element) {
			var loginForm = $(element);
			$(element).bind('submit', function (e) {
				$.ajax(loginEndpoint, {
					type : 'post',
					contentType : 'application/json',
					processData : false,
					data : JSON.stringify({username : loginForm.find('[data-role=username]').val(),
						password : loginForm.find('[data-role=password]').val()}),

					success : function (data) {
						//TODO: Make more elegant after demo
						var username = $(element).find('[data-role=username]').val();
						var accountButton = $(element).parents().find('[data-role=account]').find('[data-role=name]').html(username);
						$(element).parents().find('.menu').html('Logged in!');
						window.setTimeout(function () {
							$(document).click();
						}, 2000);
					},

					error : function (data) {

					}
				});
				e.stopPropagation();
				return false;
			});
		}
	};

	return EPLBar;

})();

});