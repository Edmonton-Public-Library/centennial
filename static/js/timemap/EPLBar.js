;
define(['timemap/Authentication', 'lib/knockout', 'timemap/Environment', 'hyq/Environment', 'epl/Settings', 'timemap/CreateAccountViewModel', 'timemap/MyAccountViewModel'], function (Authentication, ko, TimemapEnvironment, HYQEnvironment, Settings, CreateAccountViewModel, MyAccountViewModel) {

return (function () {

	var loginEndpoint = '/account/login/centennial/';
	var accountInfoEndpoint = '/account/current';

	var EPLBar = function (selector) {
		var self = this;

		EPLBar.updateUserInfo();

		this.data = {
			Environment : TimemapEnvironment,
			Settings : Settings,
			createAccount : new CreateAccountViewModel(),
			manageAccount : new MyAccountViewModel(),
			logOut : EPLBar.logOut,
			loginError : ko.observable(false),
			linkError : ko.observable(false),
			linkAccount : EPLBar.linkAccount,
			hideLoginMenu : function () {
				console.log(self.element);
				//Hide the login box after the user is logged in successfully
				self.element.find('[data-role=account]').removeClass('active');
			},
			loginMenu : {
				authenticated : ko.observable(false),
				currentTab : ko.observable('')
			}
		};

		//Don't try to initialize before the page is ready
		$(document).ready(function () {
			self.element = $(selector);
			self.initButtons();
			ko.applyBindings(self.data, self.element[0]);
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

	EPLBar.updateUserInfo = function (callback) {
		$.ajax(accountInfoEndpoint, {
			method : 'get',
			success : function(data) {
				TimemapEnvironment.user(data);
				HYQEnvironment.user(data);
				if(typeof callback == 'function') callback(data);
			},
			error : function () {
				TimemapEnvironment.user(null);
				HYQEnvironment.user(null);
			}
		});
	};

	EPLBar.logOut = function () {
		$.get(Settings.apiAccountUrl + 'logout', function () {
			EPLBar.updateUserInfo();
		});
	};

	EPLBar.linkAccount = function () {

	};

	ko.bindingHandlers.linkForm = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			var linkForm = $(element);
			$(element).bind('submit', function (e) {
				console.log('sub');
				$.ajax(Settings.apiAccountUrl + 'link/bibliocommons', {
					type : 'post',
					contentType : 'application/json',
					processData : false,
					data : JSON.stringify({username : linkForm.find('[data-role=username]').val(),
						password : linkForm.find('[data-role=password]').val()}),
					success : function (data) {

						viewModel.linkError(false);
					},
					error : function (data) {
						viewModel.linkError(true);
					}
				});
				e.stopPropagation();
				return false;
			});
		}
	};

	ko.bindingHandlers.loginForm = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			var loginForm = $(element);
			$(element).bind('submit', function (e) {
				$.ajax(loginEndpoint, {
					type : 'post',
					contentType : 'application/json',
					processData : false,
					data : JSON.stringify({username : loginForm.find('[data-role=username]').val(),
						password : loginForm.find('[data-role=password]').val()}),

					success : function (data) {
						EPLBar.updateUserInfo();
						viewModel.hideLoginMenu();
						viewModel.loginError(false);
					},

					error : function (data) {
						viewModel.loginError(true);
					}
				});
				e.stopPropagation();
				return false;
			});
		}
	};

	ko.bindingHandlers.eplBarTabs = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			var tabs = $(element).find('.tab').click(function () {
				var tabID = $(this).attr('data-tab');
				viewModel.loginMenu.currentTab(tabID);
			});
			// console.log($(element).parents().find('.menu').find('.tab-contents[data-tab=' + tabID + ']'));
		}
	}

	return EPLBar;

})();

});