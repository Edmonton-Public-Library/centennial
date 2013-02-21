;
define(['epl', 'epl/Settings', 'lib/knockout'], function (epl, Settings, ko) {

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
        self.year = ko.observable();
        self.month = ko.observable();
        self.day = ko.observable();
        self.keywords = ko.observableArray();
        self.public_approved = ko.observable();
        self.content_type = ko.observable();
        self.date = ko.computed(function() {
            if (self.day() != null && self.month() != null) {
                return self.day() + "/" + self.month() + "/" + self.year();
            } else {
                return self.year();
            }
        }, this);

        $.getJSON(Settings.apiStoryUrl + storyId, function(data) {
            self.title(data.title);
            self.description(data.description);
            self.story_text(data.story_text);
            self.media_file(data.media_file);
            self.link_url(data.link_url);
            self.branch(data.branch);
            self.year(data.year);
            self.month(data.month);
            self.day(data.day);
            self.keywords(data.keywords);
            self.content_type(data.content_type);
            self.public_approved(data.public_approved);
            $.getJSON(self.branch(), function(branchData) {
                self.branch_name(branchData.name);
            });
        });
    };
    return StoryViewModel;
})();

//End module
});