;
define(['epl', 'epl/Settings', 'lib/csc/Error', 'lib/knockout', 'lib/ajaxfileupload'], function (epl, Settings, Error, ko) {

return (function () {

    /**
     * Creates the ViewModel to back the Upload Story screen.
     * @return void
     */
     var UploadStoryViewModel = function () {
        var self = this;
        self.story = new Story();
        self.branchOptions = ko.observableArray([]);

        // Obtain branches for the 'Branches' drop down
        $.ajax({
            type : "GET",
            dataType : "json",
            url : Settings.apiBranchUrl,
            success : function(response) {
                self.branchOptions(response.objects);
            },
            error : function(response) {
                Error.throw(new Error('UploadStory.branchesAjax'));
            }
        });

        // On submit, upload the story
        self.submitStory = function () {
            // First, save the story without the media file (if present) 
            $.ajax(Settings.apiStoryUrl, {
                data: ko.toJSON(self.story),
                type: "POST",
                contentType: "application/json",
                success: function(result) {
                    // Upload the media file in a separate ajax call
                    if (self.story.content_type == "media") {
                        $.ajaxFileUpload({
                            // TODO: Remove hardcoded story id!
                            // Obtain the story id from the response
                            url: '/upload/' + 1 + '/', 
                            secureuri: false,
                            fileElementId: 'fileInput',
                            success: function (data, status) {
                                if (typeof(data.error) != 'undefined') {
                                    if (data.error != '') {
                                        alert(data.error);
                                    } else {
                                        alert(data.msg);
                                    }
                                }
                            },
                            error: function (data, status, e) {
                                alert(status);
                            }
                        });
                    }
                }, 
                error: function(result) {
                    // Handle errors
                }
            });
        };
    };
	
    function Story() {
        this.title = ko.observable();
        this.description = ko.observable();
        this.story_text = ko.observable();
        this.link_url = ko.observable();
        this.branch = ko.observable();
        this.year = ko.observable();
        this.month = ko.observable();
        this.day = ko.observable();
        this.public_approved = ko.observable();
        this.anonymous_ind = ko.observable();
        this.contentType = ko.observable();
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
    };
    
    // Modifies the json to be compatible with what is expected from the API
    Story.prototype.toJSON = function() {
        var copy = this;
        delete copy.custom_keywords;
        delete copy.preset_keywords;
        copy.branch = Settings.apiBranchUrl + copy.branch + "/";
    	return copy;
    }

    return UploadStoryViewModel;
})();

//End module
});