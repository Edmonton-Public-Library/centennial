;
define(['hyq', 'lib/knockout', 'epl/Settings', 'hyq/Environment', 'timemap/EPLBar', 'timemap/QuestPopUp', 'hyq/QuestSetViewer', 'lib/jquery.iosslider', 'lib/jquery.tablesorter'], function (hyq, ko, Settings, Environment, EPLBar, QuestPopUp, QuestSetViewer) {

	var featuredEndpoint = 'featured',
		activeEndpoint = 'active',
		completedEndpoint = 'questset',
		lastCode = '';

	var Dashboard = function (viewport) {
		var self = this;
		this.viewport = viewport;

		this.data = {
			widgetWidth : 400,
			featuredQuests : ko.observable([]),
			activeQuests : ko.observable([]),
			completedQuests : ko.observableArray([]),
			completionPoints : ko.observable(0),
			sortOrder : {}, //Used to store the most recent sort order for each column
			Environment: Environment,
			//Refreshes the displayed quest data when the user enters a code, logs in, etc
			refreshData : function () {
				self.getData();
			},
			//Initializes the widget sliders
			loadWidgets : function () {
				$('.iosSlider.featured-quests').iosSlider({
					desktopClickDrag : true,
				});

				$('.iosSlider.active-quests').iosSlider({
					desktopClickDrag : true,
				});
				window.setTimeout(function (){
					$('.enter-code').eplInput();
				}, 100);
			},
			//Enables sorting of the completed quests table
			sortCompletedQuests : function(column, order) {
				var sortFunction = function () {},
					lastSortOrder = self.data.sortOrder[column];

				if(typeof lastSortOrder == 'undefined') {
					if(typeof order == 'undefined') order = 'desc';
				} else {
					order = lastSortOrder;
				}

				switch(lastSortOrder) {
					case 'desc' :
						self.data.sortOrder[column] = 'asc';
					break;
					case 'asc' :
						self.data.sortOrder[column] = 'desc';
					break;
					default:
						self.data.sortOrder[column] = 'asc';
					break;
				}

				switch(order) {
					case 'asc' :
						sortFunction = function(left, right) {
							if(left[column] == right[column]) return 0;
							if(left[column] < right[column]) return -1;
							if(left[column] >= right[column]) return 1;
						}
					break;
					case 'desc' :
						sortFunction = function(left, right) {
							if(left[column] == right[column]) return 0;
							if(left[column] >= right[column]) return -1;
							if(left[column] < right[column]) return 1;
						}
					break;
				}

				self.data.completedQuests.sort(sortFunction);
			}
		};

		this.getData();

		ko.applyBindings(self.data, self.viewport[0]);
	};

	/**
	 * Gets all of the Quest data ready for Knockout
	 */
	Dashboard.prototype.getData = function () {
		this.getFeaturedQuests();
		this.getActiveQuests();
		this.getCompletedQuests();
		this.getCompletionPoints();
	};

	/**
	 * Gets featured quest data
	 */
	Dashboard.prototype.getFeaturedQuests = function () {
		var self = this;
		$.get(Settings.apiQuestSetsUrl + '/' + featuredEndpoint, function (data) {
			Dashboard.insertPoints(data);
			self.data.featuredQuests(data.objects);
		});
	};

	/**
	 * Gets active quest data
	 */
	Dashboard.prototype.getActiveQuests = function () {
		var self = this;
		$.get(Settings.apiQuestSetsUrl + '/' + activeEndpoint, function (data) {
			Dashboard.insertPoints(data);
			self.data.activeQuests(data.objects);
		});
	};

	/**
	 * Gets completed quest data
	 */
	Dashboard.prototype.getCompletedQuests = function () {
		var self = this;
		$.get(Settings.apiBaseUrl + completedEndpoint + '/?format=json&complete', function (data) {
			for(i in data.objects) {
				self.data.completedQuests.push(data.objects[i]);
			}
		});
	};

	/**
	 * Gets the number of points required to advance to the next level
	 */
	Dashboard.prototype.getCompletionPoints = function () {
		var self = this;
		EPLBar.updateUserInfo(function (user) {		
			$.get(Settings.apiBaseUrl + 'level/' + user.level + '/?format=json', function (data) {
				if(data.end_exp > -1) {
					self.data.completionPoints(data.end_exp);
				} else {
					self.data.completionPoints(0);
				}
			});
		});
	}

	/**
	 * Computes acquired QuestSet, Quest, and Task points for display in 
	 * the widgets and progress bars
	 * @param	data	questset	The data from the questset/complete endpoint
	 */
	Dashboard.insertPoints = function(data) {
		for(i in data.objects) {
			var questSet = data.objects[i];
			questSet.completedPoints = 0;
			questSet.totalPoints = questSet.points;
			for(var j in questSet.quests) {
				var quest = questSet.quests[j];
				quest.completedPoints = 0;
				quest.totalPoints = quest.points;
				for(var k in quest.tasks) {
					var task = quest.tasks[k];
					quest.totalPoints += task.points;
					if(task.complete) {
						//If this task is completed, add its points to its quest
						quest.completedPoints += task.points;
					}
				}
				questSet.totalPoints += quest.totalPoints;
				//If all of this quest's tasks were completed, then add its own points
				if(quest.complete) {
					quest.completedPoints += quest.points;
				}
				questSet.completedPoints += quest.completedPoints;
			}
			//If all of this quest set's quests were completed, then add its own points
			if(questSet.complete) {
				questSet.completedPoints += questSet.points;
			}
		}	
	};

	//Opens the Quest Set Viewer when clicking on a quest in a widget
	ko.bindingHandlers.openQuestSetViewer = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			$(element).click(function () {
				$('#quest-set-viewer').removeClass('hidden');
				$('#dashboard').fadeTo(500, 0.2);
				questSetView = new QuestSetViewer(valueAccessor().questSetId, $('#quest-set-viewer'));
			});
		}
	};

	//Closes the Quest Set Viewer when clicking the close button
	ko.bindingHandlers.closeQuestSetViewer = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			$(element).click(function () {
				$('#quest-set-viewer').addClass('hidden');
				$('#dashboard').fadeTo(500, 1);
				// Reload the page to prevent weird behaviour with the knockout bindings...
				window.location.reload();
			});
		}
	};

	//Triggers completed quest sorting
	ko.bindingHandlers.sortQuests = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			$(element).click(function () {
				viewModel.sortCompletedQuests(valueAccessor().column, valueAccessor().order);
			});
		}
	};

	//Allows checking codes in the profile panel
	ko.bindingHandlers.checkCode = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			require(['hyq'], function (hyq) {
				$(element).keyup(function (e) {
					var code = $(e.target).val();
					if(code.length == 10 || code.length == 11) {
						if(code.length == 10) {
							codePrefix = code.substring(0, 5);
							codeSuffix = code.substring(5, 10);
							code = codePrefix + '-' + codeSuffix;
						}
						//Prevent duplicate submission
						if(code == lastCode) return;
						lastCode = code;
						$.ajax(Settings.apiCodeUrl + '/?format=json&code=' + code, {
							method : 'get',
							success : function (data) {
								hyq.storage.questPopUp.checkTasks(data);
								viewModel.refreshData();
								EPLBar.updateUserInfo();
								$(element).css({
									'background-color' : '#67F211'
								});
								window.setTimeout(function () {
									$(element).css({
									'background-color' : 'white'
									}).val('');
								}, 1000);
							},
							error : function () {
								$(e.target).css({
									'background-color' : '#ED1330'
								});
							}
						});
					} else {
						$(element).css({
							'background-color' : 'white'
						});
					}
				});
			});
		}
	}

	return Dashboard;
});