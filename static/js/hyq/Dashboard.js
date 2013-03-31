;
define(['lib/knockout', 'epl/Settings', 'lib/jquery.iosslider'], function (ko, Settings) {

	var featuredEndpoint = 'featured',
		activeEndpoint = 'active'

	var Dashboard = function (viewport) {
		var self = this;
		this.viewport = viewport;

		this.data = {
			featuredQuests : ko.observable([]),
			activeQuests : ko.observable([]),
			initFeaturedSlider : function () {
				window.setTimeout(function () {
					$('.iosSlider.featured-quests').iosSlider({
						desktopClickDrag : true,
					});
				}, 100);
			},
			initActiveSlider : function () {
				window.setTimeout(function () {
					$('.iosSlider.active-quests').iosSlider({
						desktopClickDrag : true,
					});
				}, 100);
			}
		}

		this.getFeaturedQuests();
		this.getActiveQuests();

		ko.applyBindings(self.data, self.viewport[0]);
	};

	Dashboard.prototype.getFeaturedQuests = function () {
		var self = this;
		$.get(Settings.apiQuestSetsUrl + '/' + featuredEndpoint, function (data) {
			for(i in data.objects) {
				var questSet = data.objects[i];
				questSet.completedPoints = 0;
				for(var j in questSet.quests) {
					var quest = questSet.quests[j];
					quest.completedPoints = 0;
					for(var k in quest.tasks) {
						var task = quest.tasks[k];
						if(task.complete) {
							//If this task is completed, add its points to its quest
							quest.completedPoints += task.points;
						}
					}
					//If all of this quest's tasks were completed, then add its own points
					if(quest.complete) {
						quest.completedPoints += quest.points;
					}
				}
				//If all of this quest set's quests were completed, then add its own points
				if(questSet.complete) {
					questSet.completedPoints += questSet.points;
				}
				console.log(questSet.completedPoints);
			}
			self.data.featuredQuests(data.objects);
		});
	};

	Dashboard.prototype.getActiveQuests = function () {
		var self = this;
		$.get(Settings.apiQuestSetsUrl + '/' + activeEndpoint, function (data) {
			self.data.activeQuests(data.objects);
		});
	};

	return Dashboard;
});