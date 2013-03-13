;
define(['epl', 'epl/Settings', 'lib/knockout', 'lib/knockout.validation'], function (epl, Settings, ko) {

return (function () {
    /**
    * Creates the ViewModel to back the Create Account screen.
    * @return void
    */

    // Load the ReCaptcha Library
    $.getScript("http://www.google.com/recaptcha/api/js/recaptcha_ajax.js")
    .done(function(script, textStatus) {
        Recaptcha.create("6LeKB94SAAAAAJobmSzc9kLGeGizn8VWjbiKDJ9p", 
        "recaptcha-section",
        {
           theme: "red"
        });
    });
    var CreateAccountViewModel = function () {
        var self = this;
        
        // Set up an empty account
        self.account = new Account();
        // Add knockout validation to the account
        ko.validation.configure({ insertMessages: false });
        self.account.errors = ko.validation.group(self.account);

        

        // On submit, validate and save the account
        self.submit = function () {
            if (!self.account.isValid()) {
                self.account.errors.showAllMessages();
                return false;
            }
            // Append the ReCaptcha Information
            self.account.recaptcha_challenge = $("#recaptcha-section #recaptcha_challenge_field").val();
            // Create the account - untested!
            $.ajax(Settings.apiAccountUrl + "create", {
                data: ko.toJSON(self.account),
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                success: function (result) {
                    alert('success');
                }, 
                error: function (result) {
                    alert('error');
                }
            });
            
        };
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
            minLength: 3,
            maxLength: 10
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

        this.recaptcha_response = ko.observable();
            $("#recaptcha-section #recaptcha_response_field").attr("data-bind", "value: ReCaptchaResponse");
        this.recaptcha_challenge = "";
        this.agreeToTerms = ko.observable(false);
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
