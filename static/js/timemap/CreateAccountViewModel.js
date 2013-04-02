;
define(['timemap', 'epl/Settings', 'lib/knockout', 'lib/knockout.validation'], function (epl, Settings, ko) {

return (function () {
    /**
    * Creates the ViewModel to back the Create Account screen.
    * @return void
    */
    var CreateAccountViewModel = function () {
        var self = this;

        // Load the ReCaptcha Library
        $.getScript("http://www.google.com/recaptcha/api/js/recaptcha_ajax.js")
        .done(function(script, textStatus) {
            Recaptcha.create("6LeKB94SAAAAAJobmSzc9kLGeGizn8VWjbiKDJ9p", 
            "recaptcha-section",
            {
            theme: "red"
            });
        });
        
        // Set up an empty account and login
        self.account = new Account();
        self.login = new Login();
        // Add knockout validation to the account
        ko.validation.configure({ insertMessages: false });
        self.account.errors = ko.validation.group(self.account);
        self.login.errors = ko.validation.group(self.login);

        // On submit, validate and save the account
        self.createAccountSubmit = function () {
            if (!self.account.isValid()) {
                self.account.errors.showAllMessages();
                return false;
            }

            // Disable the submit button to prevent resubmission
            $('#createAccountSubmit').attr('disabled', true);

            // Append the ReCaptcha Information
            self.account.recaptcha_challenge = $("#recaptcha-section #recaptcha_challenge_field").val();
            self.account.recaptcha_response = $("#recaptcha-section #recaptcha_response_field").val();
            // Create the account
            $.ajax(Settings.apiAccountUrl + "create", {
                data: ko.toJSON(self.account),
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                success: function () {
                    // top.location="#createAccountSuccess";
                }, 
                error: function (xhr) {
                     $('#createAccountSubmit').attr('disabled', false);
                    // Response code 409 indicates duplicate user.
                    if (xhr.status == 409) {
                        $("#ajaxErrorCreateAccount").text("Username is already taken. Please choose another username.");
                    } else {
                        $("#ajaxErrorCreateAccount").text("An error occurred while creating a new user." +
                           " Please try again or contact a system administrator if the problem persists.");
                    }
                }
            });
        };

        self.loginSubmit = function () {
            if (!self.login.isValid()) {
                self.login.errors.showAllMessages();
                return false;
            }
            // Login
            $.ajax('/account/login/centennial/', {
                type : 'post',
                contentType : 'application/json',
                processData : false,
                data : ko.toJSON(self.login),
                success : function (data) {
                    top.location="#loginSuccess";
                },
                error : function (data) {
                    $("#ajaxErrorLogin").text("Invalid username or password. Please try again.");
                }
            });
        };
    };

    function Login() {
        this.username = ko.observable().extend({
            required: { message: 'Username is required.' }
        });
        this.password = ko.observable().extend({
            required: { message: 'Password is required.' }
        });
    };
    
    function Account() {
        this.firstname = ko.observable().extend({
            required: { message: 'First name is required.' }
        });
        this.lastname = ko.observable().extend({
            required: { message: 'Last name is required.' }
        });
        this.username = ko.observable().extend({
            required: { message: 'Username is required.' },
            minLength: 3
        });
        this.email = ko.observable().extend({
            required: { message: 'Email is required.' },
            email: { message: 'Invalid email address.' }
        });
        this.password = ko.observable().extend({
            required: { message: 'Password is required.' },
            minLength: 6
        });
        this.passwordConfirmation = ko.observable().extend({
            validation: {
                validator: function (confirmPassword, password) {
                    if (password() != confirmPassword) {
                        return false;
                    } else {
                        return true;
                    }
                },
                message: 'Please confirm your password.',
                params: this.password
            }
        });

        this.recaptcha_response = "";
        this.recaptcha_challenge = "";
        this.agreeToTerms = ko.observable(false).extend({
            equal: { value: true, message: "Please agree to the Terms and Conditions." }
        });
    };
    
    // Modifies the json to be compatible with what is expected from the API
    Account.prototype.toJSON = function() {
        var copy = this;
        delete copy.passwordConfirmation;
        delete copy.errors;
    	return copy;
    }
    
    return CreateAccountViewModel;
})();

//End module
});
