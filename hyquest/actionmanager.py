from django.contrib.auth.models import User

from hyquest.models import QuestSet, Quest, Task, UserTaskAction, UserQuestAction, UserQuestSetAction

from datetime import datetime

def beginQuestSet(user, questset):
    #Create the UserQuestSetAction Object
    #Delegate for all Quests in QuestSet

def beginQuest(user, quest):
    #Create the UserQuestAction Object
    uqa=UserQuestAction.create(user=user, quest=quest, begintime=datetime.now())
    uqa.save()
    #Delegate for all Tasks in Quest
    for task in Task.objects.filter(quest=quest):
        beginTask(user, task)

def beginTask(user, task):
    #Create the UserTaskAction Object
    uta=UserTaskAction.create(user=user, task=task, begintime=datetime.now())
    uta.save()

def completeQuestSet(user, questset):
    #Check that all quests for this set are complete
    #If so, Load and complete the UserQuestSetAction

def completeQuest(user, quest):
    #Check that all tasks for this quest are complete
    #If so, Load and Complete the UserQuestAction
    #and Delegate upwards to the QuestSet 

def completeTask(user, task):
    #Load and Complete the UserTaskAction
    #Delegate upwards to the quest
