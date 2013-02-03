;
define(['epl', 'epl/Settings', 'lib/csc/Error', 'lib/knockout', 'lib/ajaxfileupload'], function (epl, Settings, Error, ko) {
//, 'lib/jquery.form.js'
return (function () {

	/**
	 * Creates the ViewModel to back the Upload Story screen.
	 * @return	void
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

	    // Upload the story when the form is submitted
	    self.submitStory = function() {
			$.ajaxFileUpload({
                url: '/upload/' + 1 + '/', 
                secureuri: false,
                fileElementId: 'file',
                success: function (data, status) {
                    if(typeof(data.error) != 'undefined') {
                        if(data.error != '') {
                            alert(data.error);
                        } else {
                            alert(data.msg);
                        }
                    }
					alert(status);
                },
                error: function (data, status, e) {
                    alert(status);
                }
	        });
			
	        /*$.ajax(Settings.apiStoryUrl, {
	            data: ko.toJSON(self.story),
	            type: "POST",
	 			contentType: "application/json",
	            success: function(result) {
		 			
					if (content_type == "media") {
						// Upload image
					}
				}, 
				error: function(result) {
					// Handle errors
				}
	        });*/
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
	Story.prototype.toJSON = function(){
	    var copy = this;
		delete copy.custom_keywords;
		delete copy.preset_keywords
		copy.branch = Settings.apiBranchUrl + copy.branch + "/";
	    return copy;
	}

	return UploadStoryViewModel;
})();

//End module
});