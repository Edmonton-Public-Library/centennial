;
define(['timemap', 'epl/Settings', 'lib/knockout', 'lib/knockout.validation'], function (epl, Settings, ko) {

return (function () {

    /**
    * Creates the ViewModel to back the My Account screen.
    * @return void
    */
    var MyAccountViewModel = function () {
        var self = this;
        var oldEmail;
        
        // Obtain the current user that is logged in
        self.account = new MyAccount();
        $.getJSON (Settings.apiAccountUrl + "current", function(data) {
            self.account.firstname(data.firstname);
            self.account.lastname(data.lastname);
            self.account.email(data.email);
            oldEmail = (data.email);
            self.account.username(data.username);
        });

        // Add knockout validation to the account
        ko.validation.configure({ insertMessages: false });
        self.account.errors = ko.validation.group(self.account);

        // Make sure the user can't change their email or password without the old password
        self.account.oldpassword.subscribe(function () {
            if (!self.account.oldpassword.isValid() || self.account.oldpassword() == '') {
                self.account.email(oldEmail);
                self.account.newpassword("");
                self.account.passwordconfirmation("");
            }
        });

        // On submit, validate and save the updates
        self.submit = function () {
            if (!self.account.isValid()) {
                self.account.errors.showAllMessages();
                return false;
            }
            
            $.ajax(Settings.apiAccountUrl + "update", {
                data: ko.toJSON(self.account),
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                success: function () {
                    top.location="#updateAccountSuccess";
                }, 
                error: function (xhr) {
                    // 403 indicates that the old password was incorrect or the user is not logged in
                    if (xhr.status == 403) {
                        $("#ajaxError").text("Unable to update account information." +
                            " Please check that your password is correct.");
                    } else {
                        $("#ajaxError").text("An error occurred while updating your account information." +
                           " Please try again or contact a system administrator if the problem persists.");
                    }
                }
            });
            
        };
    };
    
    function MyAccount() {
        this.firstname = ko.observable().extend({
            required: { message: 'First name is required.' }
        });
        this.lastname = ko.observable().extend({
            required: { message: 'Last name is required.' }
        });
        this.username = ko.observable();
        this.email = ko.observable().extend({
            required: { message: 'Email is required.' },
            email: { message: 'Invalid email address.' }
        });
        this.newpassword = ko.observable('').extend({
            minLength: 6
        });
        this.oldpassword = ko.observable('').extend({
            minLength: 6 
        });
        this.passwordconfirmation = ko.observable().extend({
            validation: {
                validator: function (confirmPassword, newPassword) {
                    if (newPassword() != '' && newPassword() != confirmPassword) {
                        return false;
                    } else {
                        return true;
                    }
                },
                message: 'Please confirm your new password.',
                params: this.newpassword
            }
        });
    };

    // Modifies the json to be compatible with what is expected from the API
    MyAccount.prototype.toJSON = function() {
        var copy = this;
        delete copy.username;
        delete copy.passwordconfirmation;
        if (copy.oldpassword == '') delete copy.oldpassword;
        if (copy.newpassword == '') delete copy.newpassword;
        delete copy.errors;
        return copy;
    }

    return MyAccountViewModel;
})();

//End module
});
