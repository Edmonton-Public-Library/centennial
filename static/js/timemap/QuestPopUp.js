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
	}

	QuestPopUp.prototype.hidePopUp = function() {
		var self = this;
		self.popUpMessages = [];
		self.currentPopUp = 0;
		self.viewport.animate({
			bottom: '-240px'
		}, null, function() {
			self.viewport.css('visibility', 'hidden');
		});
	}

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
		self.viewport.find('.questPopUpPoints').html(self.popUpMessages[self.currentPopUp].points + "pts");
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
	}

	QuestPopUp.prototype.shiftPopUpRight = function() {
		var self = this;
		if(self.currentPopUp == self.popUpMessages.length - 1) return;

		self.currentPopUp++;
		self.updatePopUp();
	}

	QuestPopUp.prototype.shiftPopUpLeft = function() {
		var self = this;
		if(self.currentPopUp == 0) return;

		self.currentPopUp--;
		self.updatePopUp();
	}

	QuestPopUp.prototype.completeTask = function(task, discovered) {

	}

	QuestPopUp.prototype.completeTasks = function(taskList, discovered) {
		var self = this;

		for(task in taskList) {
			self.completeTask(task, discovered);
		}
	}

	return QuestPopUp;
});