;
define(['lib/knockout', 'epl/Settings', 'lib/jquery.iosslider'], function (ko, Settings) {

	var featuredEndpoint = 'featured',
		activeEndpoint = 'active'

	var Dashboard = function (viewport) {
		var self = this;
		this.viewport = viewport;

		this.data = {
			featuredQuests : ko.observable([]),
			activeQuests : ko.observable([])
		}

		this.getFeaturedQuests();

		$(document).ready(function () {
			ko.applyBindings(self.data, self.viewport[0]);
			// window.setTimeout(function () {
			// 	// Initialize the quest sliders
			// 	$('.iosSlider').iosSlider({
			// 		desktopClickDrag : true,
			// 	});
			// }, 100);
		});

	};

	Dashboard.prototype.getFeaturedQuests = function () {
		var self = this;
		$.get(Settings.apiQuestSetsUrl + '/' + featuredEndpoint, function (data) {
			console.log(data);
			self.data.featuredQuests(data.objects);
		});
	};

	ko.bindingHandlers.iosSlider = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			$('.iosSlider').iosSlider({
				desktopClickDrag : true
			});
		}
	};

	return Dashboard;
});