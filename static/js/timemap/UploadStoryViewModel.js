;
define(['timemap', 'epl/Settings', 'lib/csc/Error', 'lib/knockout', 'timemap/Environment','lib/knockout.validation', 'lib/ajaxfileupload'], function (epl, Settings, Error, ko, Environment) {

return (function () {

    /**
     * Creates the ViewModel to back the Upload Story screen.
     * @return void
     */
     var UploadStoryViewModel = function () {
        var self = this;

        // Obtain branches for the 'Branches' drop down
        self.branchOptions = ko.observableArray([]);
        $.ajax({
            type : "GET",
            dataType : "json",
            url : Settings.apiBranchUrl,
            success : function(response) {
                self.branchOptions(response.objects);
            },
            error : function(response) {
                Error.throwNewError(new Error('UploadStory.branchesAjax'));
            }
        });

        // Obtain the current user who is logged in
        self.user = ko.observable();
        $.getJSON (Settings.apiAccountUrl + "current", function(data) {
            if (data.username != null) {
                self.user(data.username);
            }
        });

        self.imagesDirectory = ko.observable(Environment.routes.imageDirectory);
        self.closeView = function () {
            window.location = '#';
        };

        // Set up empty story and form validation
        self.story = new Story();
        ko.validation.configure({
            insertMessages: false
        });
        self.story.errors = ko.validation.group(self.story);

        // Ensure that when the user changes the story type,
        // the previous story field is cleared
        self.story.content_type.subscribe(function (previousValue) {
            if (previousValue == "text") {
                self.story.story_text("");
            } else if (previousValue == "link") {
                self.story.link_url("");
            }
        }, self.story, "beforeChange");

        // On submit, upload the story
        self.submitStory = function () {
            if (!self.story.isValid()) {
                self.story.errors.showAllMessages();
                return false;
            }
            // First, save the story without the media file (if present) 
            $.ajax(Settings.apiStoryUrl, {
                data: ko.toJSON(self.story),
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                success: function (result) {
                    // Upload the media file in a separate ajax call
                    if (self.story.content_type() == "media") {
                        $.ajaxFileUpload({
                            // Obtain the story id from the response
                            url: '/upload/' + result.id + '/', 
                            secureuri: false,
                            fileElementId: 'fileInput',
                            success: function (data, status) {
                                var jsonData = jQuery.parseJSON($(data).text());
                                if (jsonData != null && jsonData.errors) {
                                    var error = "" + jsonData.errors;
                                    self.story.errorMessage(error);
                                } else {
                                    top.location="#uploadStorySuccess";   
                                }
                            },
                            error: function (data, status, e) {
                                if(typeof data == "object") {
                                    self.story.errorMessage("An error has occured");
                                }
                                else {
                                    self.story.errorMessage(data);
                                }
                            }
                        });
                    } else {
                        top.location="#uploadStorySuccess";
                    }
                }, 
                error: function (result) {
                    self.story.errorMessage(result.responseText);
                }
            });
        };
    };
	
    function Story() {
        this.title = ko.observable().extend({
            required: { message: 'Title is required.' }
        });
        this.description = ko.observable().extend({
            required: { message: 'Description is required.' }
        });
        this.content_type = ko.observable().extend({
            required: { message: 'Story type must be selected.' }
        });
        this.story_text = ko.observable().extend({
            validation: {
                validator: function (val, content_type) {
                    if (content_type() == "text" && (val == null || val == "")) {
                        return false;
                    } else {
                        return true;
                    }
                },
                message: 'Story text must be entered.',
                params: this.content_type
            }
        });
        this.link_url = ko.observable().extend({
            validation: {
                validator: function (val, content_type) {
                    if (content_type() == "link" && (val == null || val == "")) {
                        return false;
                    } else {
                        return true;
                    }
                },
                message: 'Link URL must be entered.',
                params: this.content_type
            }
        });
        this.branch = ko.observable();
        this.year = ko.observable().extend({
            required: { message: 'Year is required.' }
        });
        this.month = ko.observable();
        this.day = ko.observable();
        this.public_approved = ko.observable(false);
        this.anonymous = ko.observable(false);
        this.custom_keywords = ko.observable();
        this.preset_keywords = ko.observableArray([]);
        this.keywords = ko.computed(function() {
            // Returns an array of the checked predefined keywords, 
            // as well as the comma separated user-entered keywords
            if (this.custom_keywords() != null) {
                var splitCustomKeywords = this.custom_keywords().split(",");
                return this.preset_keywords().concat(splitCustomKeywords);
            } else {
                return this.preset_keywords();
            }
        }, this);
        this.errorMessage = ko.observable();
    };
    
    // Modifies the json to be compatible with what is expected from the API
    Story.prototype.toJSON = function() {
        var copy = this;
        delete copy.custom_keywords;
        delete copy.preset_keywords;
        delete copy.errors;
        delete copy.errorMessage;
        if (copy.branch == null) {
            copy.branch = null;
        } else {
            copy.branch = Settings.apiBranchUrl + copy.branch + "/";
        }
        if (copy.month == null || copy.month == '') {
            delete copy.month;
        }
        if (copy.day == null || copy.day == '') {
            delete copy.day;
        }
    	return copy;
    }
    
    return UploadStoryViewModel;
})();

//End module
});
