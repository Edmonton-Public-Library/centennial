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
				// $('.iosSlider.featured-quests').iosSlider({
				// 	desktopClickDrag : true,
				// });

				// $('.iosSlider.active-quests').iosSlider({
				// 	desktopClickDrag : true,
				// });
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

		self.featuredGetCount = 0;
		self.maxFeaturedGetCount = 5;

		self.doGetFeaturedQuests = function(data) {
			self.featuredGetCount++;
			if(self.featuredGetCount <= self.maxFeaturedGetCount) {
				$.get(Settings.apiQuestSetsUrl + '/' + featuredEndpoint, function (data) {
					if(data.objects.length > 0) {
						Dashboard.insertPoints(data);
						self.data.featuredQuests(data.objects);
					}
					else {
						self.doGetFeaturedQuests(data);
					}
				});
			}
			else {
				Dashboard.insertPoints(data);
				self.data.featuredQuests(data.objects);
			}
		}

		self.doGetFeaturedQuests();
	};

	/**
	 * Gets active quest data
	 */
	 Dashboard.prototype.getActiveQuests = function () {
		var self = this;

		self.activeGetCount = 0;
		self.maxActiveGetCount = 5;

		self.doGetActiveQuests = function(data) {
			self.activeGetCount++;
			if(self.activeGetCount <= self.maxActiveGetCount) {
				$.get(Settings.apiQuestSetsUrl + '/' + activeEndpoint, function (data) {
					if(data.objects.length > 0) {
						Dashboard.insertPoints(data);
						self.data.activeQuests(data.objects);
					}
					else {
						self.doGetActiveQuests(data);
					}
				});
			}
			else {
				Dashboard.insertPoints(data);
				self.data.activeQuests(data.objects);
			}
		}

		self.doGetActiveQuests();
	};

	/**
	 * Gets completed quest data
	 */
	 Dashboard.prototype.getCompletedQuests = function () {
		var self = this;

		self.completedGetCount = 0;
		self.maxCompletedGetCount = 5;

		self.goGetCompeltedQuests = function(data) {
			self.completedGetCount++;
			if(self.completedGetCount <= self.maxCompletedGetCount) {
				$.get(Settings.apiBaseUrl + completedEndpoint + '/?format=json&complete', function (data) {
					if(data.objects.length > 0) {
						self.data.completedQuests.removeAll();
						data.objects.forEach(function(ele) {
							self.data.completedQuests.push(ele);
						});
					}
					else {
						self.goGetCompeltedQuests(data);
					}
				});
			}
			else {
				self.data.completedQuests.removeAll();
				data.objects.forEach(function(ele) {
					self.data.completedQuests.push(ele);
				});
			}
		}

		self.goGetCompeltedQuests();
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
		data.objects.forEach(function(questSet) {
			questSet.completedPoints = 0;
			//questSet.totalPoints = questSet.points;
			questSet.totalPoints = 0;
			questSet.quests.forEach(function(quest) {
				quest.completedPoints = 0;
				quest.totalPoints = quest.points;
				quest.tasks.forEach(function(task) {
					quest.totalPoints += task.points;
					if(task.complete) {
						//If this task is completed, add its points to its quest
						quest.completedPoints += task.points;
					}
				});
				questSet.totalPoints += quest.totalPoints;
				//If all of this quest's tasks were completed, then add its own points
				if(quest.complete) {
					quest.completedPoints += quest.points;
				}
				questSet.completedPoints += quest.completedPoints;
			});
			//If all of this quest set's quests were completed, then add its own points
			if(questSet.complete) {
				//questSet.completedPoints += questSet.points;
			}
		});	
	};

	ko.bindingHandlers.iosSlider = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			if($(element).find('.slide') != 0) {
				// $(element).iosSlider({
				// 	desktopClickDrag : true
				// });
			}
		}
	}

	Dashboard.doOpenQuestSetViewer = function(qID) {
		if(!hyqGlobal_WindowOpen) {
			$('#quest-set-viewer-decoy').clone().attr("id", "quest-set-viewer").appendTo("body");
			hyqGlobal_WindowOpen = true;
			$(document).scrollTop(0);
			$('#quest-set-viewer').removeClass('hidden');
			$('#dashboard').fadeTo(500, 0.2);
			questSetView = new QuestSetViewer(qID, $('#quest-set-viewer'));
		}
	}

	//Opens the Quest Set Viewer when clicking on a quest in a widget
	ko.bindingHandlers.openQuestSetViewer = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			$(element).click(function () {
				Dashboard.doOpenQuestSetViewer(valueAccessor().questSetId);
			});
		}
	};

	Dashboard.doCloseQuestSetViewer = function() {
		hyqGlobal_WindowOpen = false;
		//$('#quest-set-viewer').addClass('hidden');
		$("#quest-set-viewer").remove();
		$('#dashboard').fadeTo(500, 1);
		// Reload the page to prevent weird behaviour with the knockout bindings...
		//window.location.reload();
	}

	//Closes the Quest Set Viewer when clicking the close button
	ko.bindingHandlers.closeQuestSetViewer = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			$(element).click(function () {
				Dashboard.doCloseQuestSetViewer();
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
				$(element).eplInput();
				$(element).keyup(function (e) {
					var code = $(e.target).val();
					if((code.length == 10 && code.indexOf('-') == -1) || (code.length == 11 && code.indexOf('-') > -1)) {
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
								$(element).removeClass('error').addClass('success');
								window.setTimeout(function () {
									$(element).val('').removeClass('success');
								}, 1000);
							},
							error : function () {
								$(e.target).removeClass('success').addClass('error');
							}
						});
					} else {
						$(element).removeClass('error').removeClass('success');
					}
				});
			});
		}
	}

	return Dashboard;
});