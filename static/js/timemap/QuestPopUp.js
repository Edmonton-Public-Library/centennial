;
define(['lib/knockout'], function (ko) {

	var QuestPopUp = function (viewport) {
		var self = this;
		self.viewport = $(viewport);
		self.popUpMessages = [];
		self.currentPopUp = 0;

		self.viewport.find('.questPopUpText').click(function(e) {
			window.open("/hyq", "_blank");
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
				
	/**
	 * Shows the quest popup, or adds to a currently-showed popup
	 * @param	title			string		The title of the popup
	 * @param	description		string		The popup description
	 * @param	points			int			The number of points gathered
	 * @param	type			string		The type of popup (completed/discovered)
	 */
	QuestPopUp.prototype.showPopUp = function(title, description, points, type) {
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
			type: type
		});

		self.updatePopUp();
	};

	/**
	 * Hides the popup
	 */
	QuestPopUp.prototype.hidePopUp = function() {
		var self = this;
		self.popUpMessages = [];
		self.currentPopUp = 0;
		self.viewport.animate({
			bottom: '-208px'
		}, null, function() {
			self.viewport.css('visibility', 'hidden');
		});
	};

	/**
	 * Updates an existing popup
	 */
	QuestPopUp.prototype.updatePopUp = function() {
		var self = this;

		if(self.popUpMessages[self.currentPopUp].type == 'discovery') {
			self.viewport.removeClass('questPopUpTask');
			self.viewport.removeClass('questPopUpChallenge');
			self.viewport.removeClass('questPopUpQuest');
			self.viewport.addClass('questPopUpDiscovered');
		}
		else if(self.popUpMessages[self.currentPopUp].type == 'task') {
			self.viewport.removeClass('questPopUpChallenge');
			self.viewport.removeClass('questPopUpQuest');
			self.viewport.removeClass('questPopUpDiscovered');
			self.viewport.addClass('questPopUpTask');
		}
		else if(self.popUpMessages[self.currentPopUp].type == 'challenge') {
			self.viewport.removeClass('questPopUpTask');
			self.viewport.removeClass('questPopUpQuest');
			self.viewport.removeClass('questPopUpDiscovered');
			self.viewport.addClass('questPopUpChallenge');
		}
		else if(self.popUpMessages[self.currentPopUp].type == 'quest') {
			self.viewport.removeClass('questPopUpChallenge');
			self.viewport.removeClass('questPopUpTask');
			self.viewport.removeClass('questPopUpDiscovered');
			self.viewport.addClass('questPopUpQuest');
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

		if(self.popUpMessages[self.currentPopUp].type == "discovery") {
			self.viewport.find('.questPopUpPointsDisplay').css('visibility', 'hidden');
		}
		else {
			self.viewport.find('.questPopUpPointsDisplay').css('visibility', 'visible');
		}
	};

	/**
	 * Shifts a popup over to make room for another type
	 */
	QuestPopUp.prototype.shiftPopUpRight = function() {
		var self = this;
		if(self.currentPopUp == self.popUpMessages.length - 1) return;

		self.currentPopUp++;
		self.updatePopUp();
	};

	/**
	 * If a popup to the right is hidden, shifts this popup back to 
	 * the edge of the screen
	 */
	QuestPopUp.prototype.shiftPopUpLeft = function() {
		var self = this;

		if(self.currentPopUp == 0) return;

		self.currentPopUp--;
		self.updatePopUp();
	};

	/** 
	 * Display a quest discovery popup
	 * @param	title		string		The title of the popup
	 */
	QuestPopUp.prototype.popUp_DisplayDiscovery = function(title) {
		this.showPopUp("Quest Discovered!", "You have discovered the quest: <br/> <br/><i>" + title + "</i>! <br/> <br/>Check it it out in your Hundred Year Quest page!", 0, 'discovery');
	};

	/** 
	 * Display a quest completion popup
	 * @param	title		string		The title of the popup
	 * @param	type1		string
	 * @param	type2		string
	 * @param	points		int			The number of acquired points
	 */
	QuestPopUp.prototype.popUp_DisplayCompletion = function(title, type1, type2, points) {
		var popUpTitle = type1 + " Completed!";
		var popUpDescription = "You have completed the " + type2 + ": <br/> <br/><i>" + title + "</i>!";

		this.showPopUp(popUpTitle, popUpDescription, points, type2);
	};

	/**
	 * Displays a popup for a completed task item
	 * @param	task		object		The object from the API
	 * @param	discovered	boolean		Whether this task was just discovered
	 */
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

	/**
	 * Shows any popups required from a list of completed tasks
	 * @param	taskList	object		The task list from the API
	 * @param	discovered	boolean		If these tasks were just discovered
	 */
	QuestPopUp.prototype.completeTasks = function(taskList, discovered) {
		var self = this;

		for(task in taskList) {
			self.completeTask(taskList[task], discovered);
		}
	};

	/**
	 * Runs all required popup processing on a list of tasks
	 * @param	taskLists	object	The list of completed and discovered tasks from the API
	 */
	QuestPopUp.prototype.checkTasks = function(taskLists) {
		this.completeTasks(taskLists.completedTasks, false);
		this.completeTasks(taskLists.discoveredTasks, true);
	}

	return QuestPopUp;
});