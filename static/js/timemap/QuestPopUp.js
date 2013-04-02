;
define(['lib/knockout'], function (ko) {

	var QuestPopUp = function (viewport) {
		var self = this;
		self.viewport = $(viewport);
		self.popUpMessages = [];
		self.currentPopUp = 0;

		self.viewport.click(function(e) {
			window.location = "/hyq";
		});

		self.viewport.find('.questPopUpCloseButton').click(function(e) {
			self.hidePopUp();
			e.stopPropagation();
		});

		self.viewport.find('.questPopUpLeftArrow').click(function(e) {
			self.shiftPopUpLeft();
			e.stopPropagation();
		});

		self.viewport.find('.questPopUpRightArrow').click(function(e) {
			self.shiftPopUpRight();
			e.stopPropagation();
		});

	};
				

	QuestPopUp.prototype.showPopUp = function(title, description, points, discovered) {
		var self = this;

		if(self.viewport.css('visibility') == "visible") {
			
			self.currentPopUp = self.popUpMessages.length;

		}
		else {
			self.viewport.css('visibility', 'visible');

			self.popUpMessages = [];
			self.currentPopUp = 0;

			self.viewport.animate({
				bottom: '0px'
			});
		}
		
		self.popUpMessages.push({
			title: title,
			description: description,
			points: points,
			discovered: discovered
		});

		self.updatePopUp();
	};

	QuestPopUp.prototype.hidePopUp = function() {
		var self = this;
		self.popUpMessages = [];
		self.currentPopUp = 0;
		self.viewport.animate({
			bottom: '-240px'
		}, null, function() {
			self.viewport.css('visibility', 'hidden');
		});
	};

	QuestPopUp.prototype.updatePopUp = function() {
		var self = this;

		if(self.popUpMessages[self.currentPopUp].discovered) {
			self.viewport.removeClass('questPopUpCompleted');
			self.viewport.addClass('questPopUpDiscovered');
		}
		else {
			self.viewport.removeClass('questPopUpDiscovered');
			self.viewport.addClass('questPopUpCompleted');
		}

		self.viewport.find('.questPopUpTitle').html(self.popUpMessages[self.currentPopUp].title);
		self.viewport.find('.questPopUpDescription').html(self.popUpMessages[self.currentPopUp].description);
		self.viewport.find('.questPopUpPoints').html(self.popUpMessages[self.currentPopUp].points);
		self.viewport.find('.questPopUpCurrentNumber').html((self.currentPopUp + 1).toString());
		self.viewport.find('.questPopUpTotalNumber').html((self.popUpMessages.length).toString());

		if(self.currentPopUp == self.popUpMessages.length - 1){
			self.viewport.find('.questPopUpRightArrow').css('visibility', 'hidden');
		}
		else {
			self.viewport.find('.questPopUpRightArrow').css('visibility', 'visible');
		}

		if(self.currentPopUp == 0){
			self.viewport.find('.questPopUpLeftArrow').css('visibility', 'hidden');
		}
		else {
			self.viewport.find('.questPopUpLeftArrow').css('visibility', 'visible');
		}

		if(self.popUpMessages.length > 1) {
			self.viewport.find('.questPopUpArrows').css('visibility', 'visible');
		}
		else {
			self.viewport.find('.questPopUpArrows').css('visibility', 'hidden');
		}

		if(self.popUpMessages[self.currentPopUp].discovered) {
			self.viewport.find('.questPopUpPointsDisplay').css('visibility', 'hidden');
		}
		else {
			self.viewport.find('.questPopUpPointsDisplay').css('visibility', 'visible');
		}
	};

	QuestPopUp.prototype.shiftPopUpRight = function() {
		var self = this;
		if(self.currentPopUp == self.popUpMessages.length - 1) return;

		self.currentPopUp++;
		self.updatePopUp();
	};

	QuestPopUp.prototype.shiftPopUpLeft = function() {
		var self = this;

		if(self.currentPopUp == 0) return;

		self.currentPopUp--;
		self.updatePopUp();
	};

	QuestPopUp.prototype.popUp_DisplayDiscovery = function(title) {
		this.showPopUp("Quest Discovered!", "You have discovered the quest '" + title + "'! <br/> <br/>Check it it out in your Hundred Year Quest page!", 0, true);
	};

	QuestPopUp.prototype.popUp_DisplayCompletion = function(title, type1, type2, points) {
		var popUpTitle = type1 + " Completed!";
		var popUpDescription = "You have completed the " + type2 + " '" + title + "' for " + points + " points! <br/> <br/>Check it it out in your Hundred Year Quest page!";

		this.showPopUp(popUpTitle, popUpDescription, points, false);
	};

	QuestPopUp.prototype.completeTask = function(task, discovered) {
		var self = this;

		var taskPoints = task.points;
		var challengePoints = taskPoints + task.quest.points;
		var setPoints = challengePoints + task.questset.points;

		if(task.questset.completed == task.questset.total) {
			self.popUp_DisplayCompletion(task.questset.title, "Quest", "quest", setPoints);
		}
		else if(task.quest.completed == task.quest.total) {
			self.popUp_DisplayCompletion(task.quest.title, "Challenge", "challenge", challengePoints);
		}
		else {
			self.popUp_DisplayCompletion(task.title, "Task", "task", taskPoints);
		}

		if(discovered) {
			self.popUp_DisplayDiscovery(task.questset.title);
		}
	};

	QuestPopUp.prototype.completeTasks = function(taskList, discovered) {
		var self = this;

		for(task in taskList) {
			self.completeTask(taskList[task], discovered);
		}
	};

	QuestPopUp.prototype.checkTasks = function(taskLists) {
		this.completeTasks(taskLists.completedTasks, false);
		this.completeTasks(taskLists.discoveredTasks, true);
	}

	return QuestPopUp;
});