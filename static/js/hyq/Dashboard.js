;
define(['lib/knockout', 'epl/Settings'], function (ko, Settings) {

	var featuredEndpoint = 'featured',
		activeEndpoint = 'active'

	var Dashboard = function (viewport) {
		this.viewport = viewport;

		this.data = {
			featuredQuests : ko.observable([]),
			activeQuests : ko.observable([])
		}

		this.getFeaturedQuests();
		ko.applyBindings(this.data, this.viewport[0]);
	};

	Dashboard.prototype.getFeaturedQuests = function () {
		var self = this;
		$.get(Settings.apiQuestSetsUrl + '/' + featuredEndpoint, function (data) {
			var questSets = data;
			for(i in questSets.objects) {
				var questSet = questSets.objects[i];
				$.get(Settings.apiQuestsUrl + '/?format=json&questset=' + questSet.id, function (data) {
					questSet.quests = data.objects;
				});
			}
			self.data.featuredQuests(questSets);
		});
	};

	return Dashboard;
});