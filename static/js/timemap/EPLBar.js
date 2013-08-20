;
define(['timemap/Authentication', 'lib/knockout', 'timemap/Environment', 'hyq/Environment', 'epl/Settings', 'timemap/CreateAccountViewModel', 'timemap/MyAccountViewModel', 'lib/epl/Input'], function (Authentication, ko, TimemapEnvironment, HYQEnvironment, Settings, CreateAccountViewModel, MyAccountViewModel) {

return (function () {

	var loginEndpoint = '/account/login/centennial/';
	var accountInfoEndpoint = '/account/current';

	var EPLBar = function (selector, page) {
		var self = this;

		EPLBar.updateUserInfo();

		if(page == 'hyq') Environment = HYQEnvironment;
		if(page == 'timemap') Environment = TimemapEnvironment;

		this.data = {
			Environment : Environment,
			Settings : Settings,
			createAccount : new CreateAccountViewModel(),
			manageAccount : new MyAccountViewModel(),
			logOut : EPLBar.logOut,
			loginError : ko.observable(false),
			linkError : ko.observable(false),
			linkAccount : EPLBar.linkAccount,
			baseURL : ko.observable(Settings.siteUrl),
			hideLoginMenu : function () {
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

			//$('.buttons').find('#auth-username').eplInput();
			//$('.buttons').find('#auth-password').eplInput();
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

			//Automatically focus username field when opening the login menu
			if(button.attr('data-role') == 'account' && button.attr("hasFocused") != "true") {
				//button.find('.tab-contents[data-tab=login]').find('input[type=text].auto-focus').focus();
				button.attr("hasFocused", "true");
			}

			//TODO: Better event handler cleanup
			$(document).bind('click', function () {
				button.removeClass('active');
				button.attr("hasFocused", "false");
			});
		});
	};

	/**
	 * Grabs updated user data from the API, and stores it in the Environment
	 * @param	callback	function	A callback function to be run once the 
	 *									user data has been gathered
	 */
	EPLBar.updateUserInfo = function (callback) {
		$.ajax(accountInfoEndpoint, {
			method : 'get',
			success : function(data) {
				TimemapEnvironment.user(data);
				HYQEnvironment.user(data);
				$(".menu-section #username").text(data.username);
				//manageAccount.account.firstname = data.firstname;
				//manageAccount.account.lastname = data.lastname;
				//manageAccount.account.email = data.email;
				if(typeof callback == 'function') callback(data);
			},
			error : function () {
				TimemapEnvironment.user(null);
				HYQEnvironment.user(null);
			}
		});
	};

	/**
	 * Logs the user out and triggers a user info update
	 */
	EPLBar.logOut = function () {
		$.get(Settings.apiAccountUrl + 'logout', function () {
			EPLBar.updateUserInfo();
		});
	};

	//Allows EPL accounts to be linked from the EPLBar
	ko.bindingHandlers.linkForm = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			var linkForm = $(element);
			$(element).bind('submit', function (e) {
				$.ajax(Settings.apiAccountUrl + 'link/bibliocommons', {
					type : 'post',
					contentType : 'application/json',
					processData : false,
					data : JSON.stringify({username : linkForm.find('[data-role=username]').val(),
						password : linkForm.find('[data-role=password]').val()}),
					success : function (data) {
						if(data.result.toLowerCase().indexOf("error") > -1) {
							viewModel.linkError(true);
						} else {
							EPLBar.updateUserInfo();
							viewModel.linkError(false);
						}
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

	//Allows users to log in through the EPLBar
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
						//Load the Dashboard information when the user logs in, if they weren't previously logged in.
						if(viewModel.Environment.page == 'hyq') {
							viewModel.Environment.dashboard.getData();
						}
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

	//Allows users to choose user management tabs
	ko.bindingHandlers.eplBarTabs = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			var tabs = $(element).find('.tab').click(function () {
				var tabID = $(this).attr('data-tab');
				viewModel.loginMenu.currentTab(tabID);
			});
		}
	}

	return EPLBar;

})();

});