;
define(['timemap/Environment', 'lib/knockout'], function (Environment, ko) {

return (function () {

	var Authentication = function () { };

	Authentication.logIn = function (credentials, success, error) {
		$.ajax(Environment.apiBase + '/account/login/centennial', {
			data : credentials,
			dataType : 'json',
			success : success,
			error: error
		});
	};

	ko.bindingHandlers.authenticateSubmit = function (form, fieldIDs) {
		//Write code!
	};

	return Authentication;

})();

});