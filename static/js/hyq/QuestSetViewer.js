;
define(['hyq', 'epl/Settings', 'lib/knockout', 'hyq/Environment', 'hyq/Dashboard'], function (hyq, Settings, ko, Environment, Dashboard) {

    var QuestSetViewer = function (questSetId, viewport) {
        var self = this;
        this.questSet = new QuestSet(questSetId);
        
        ko.applyBindings({
            Environment : Environment,
            questSet : this.questSet
        }, viewport[0]);
    };

    function QuestSet(questSetId) {
        self.questSetTitle = ko.observable();
        self.questSetDesc = ko.observable();
        self.questSetPoints = ko.observable();
        self.questSetComplete = ko.observable();
        self.quests = ko.observableArray();
        // Get the quest set, including nested quests and tasks
        $.getJSON (Settings.apiBaseUrl + "questset/" + questSetId, function(data) {
            self.questSetTitle(data.title);
            self.questSetDesc(data.description);
            self.questSetPoints(data.points);
            self.questSetComplete(data.complete);
            for (var i = 0; i < data.quests.length; i++) {
                var questJson = data.quests[i];
                var quest = new Quest();
                quest.questTitle = questJson.title;
                quest.questPoints = questJson.points;
                quest.questComplete = questJson.complete;
                self.quests.push(quest);
                for (var j = 0; j < questJson.tasks.length; j++) {
                    var taskJson = questJson.tasks[j];
                    var task = new Task();
                    task.taskId = taskJson.id;
                    task.taskTitle = taskJson.title;
                    task.taskPoints = taskJson.points;
                    task.taskType = taskJson.type;
                    task.taskComplete = taskJson.complete;
                    quest.tasks.push(task);
                }
            }
        });
    };

    function Quest() {
        this.questTitle = ko.observable();
        this.questPoints = ko.observable();
        this.questComplete = ko.observable();
        this.tasks = ko.observableArray();
    };

    function Task() {
        var self = this;
        this.taskId = ko.observable();
        this.taskTitle = ko.observable();
        this.taskPoints = ko.observable();
        this.taskType = ko.observable();
        this.taskComplete = ko.observable();
        this.code = ko.observable();
        this.checkCode = function() {
            var code = this.code();
            if(code != null && code.length == 10) {
                codePrefix = code.substring(0, 5);
                codeSuffix = code.substring(5, 10);
                code = codePrefix + '-' + codeSuffix;
            }
            $.ajax(Settings.apiQuestBaseUrl + "code/?code=" + code, {
                processData : false,
                type : 'get',
                success : function(data) {
                    require(['hyq'], function (hyq) {
                        hyq.storage.questPopUp.checkTasks(data);
                    });
                    var errorElement = $("#codeError" + self.taskId);
                    errorElement.addClass("hidden");
                },
                error : function(data) {
                    var errorElement = $("#codeError" + self.taskId);
                    errorElement.removeClass("hidden");
                    errorElement.text(JSON.parse(data.responseText).Response);
                }
            });
        }
        //Checks Bibliocommons tasks
        this.checkBiblio = function() {
            var errorElement = $("#biblioError" + self.taskId);
            errorElement.removeClass("hidden");
            errorElement.html('Checking...');
            $('#checkBiblio').attr('disabled', true);
            $.ajax(Settings.apiQuestBaseUrl + "bibliocommons", {
                processData : false,
                type : 'get',
                success : function(data) {
                    $('#checkBiblio').attr('disabled', false);
                    require(['hyq'], function (hyq) {
                        hyq.storage.questPopUp.checkTasks(data);
                    });
                    var errorElement = $("#biblioError" + self.taskId);
                    errorElement.addClass("hidden");

                    var qID = hyqGlobal_WindowOpen;
                    window.location.reload();
                    Dashboard.doOpenQuestSetViewer(qID);
                },
                error : function(data) {
                    $('#checkBiblio').attr('disabled', false);
                    var errorElement = $("#biblioError" + self.taskId);
                    errorElement.removeClass("hidden");
                    errorElement.text(JSON.parse(data.responseText).Response);
                }
            });
        }
    };

    return QuestSetViewer;

//End module
});
