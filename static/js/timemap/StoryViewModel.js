;
define(['timemap', 'epl/Settings', 'lib/knockout'], function (epl, Settings, ko) {

return (function () {
    /**
    * Creates the ViewModel to back viewing a story.
    * @return void
    */
    var StoryViewModel = function (storyId) {
        var self = this;
        self.title = ko.observable();
        self.description = ko.observable();
        self.story_text = ko.observable();
        self.link_url = ko.observable();
        self.media_file = ko.observable();
        self.branch = ko.observable();
        self.branch_name = ko.observable();
        self.branch_id = ko.observable();
        self.year = ko.observable();
        self.month = ko.observable();
        self.day = ko.observable();
        self.username = ko.observable();
        self.keywords = ko.observableArray();
        self.keywordsCommaSeparated = ko.computed(function() {
            return self.keywords().join(", ");
        });
        self.content_type = ko.observable();
        self.date = ko.computed(function() {
            if (self.day() != null && self.month() != null) {
                return self.day() + "/" + self.month() + "/" + self.year();
            } else {
                return self.year();
            }
        }, this);

        // Need to set ajax to be synchronous so that we don't apply the 
        // knockout bindings until the story data is populated.
        $.ajaxSetup ({
            "async": false
        });
        $.getJSON (Settings.apiStoryUrl + storyId, function(data) {
            self.title(data.title);
            self.description(data.description);
            self.story_text(data.story_text);
            self.media_file(data.media_file);
            self.link_url(data.link_url);
            self.branch(data.branch);
            self.year(data.year);
            self.month(data.month);
            self.day(data.day);
            self.username(data.user);
            self.keywords(data.keywords);
            self.content_type(data.content_type);
            $.getJSON(self.branch(), function(branchData) {
                self.branch_name(branchData.name);
                self.branch_id(branchData.id);
            });
        });

        // If a story does not exist for the ID parameter, redirect to the main view
        if (self.title() == null) {
            top.location="#";
        }

    };
    return StoryViewModel;
})();

//End module
});