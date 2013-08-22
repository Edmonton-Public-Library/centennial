from django.core.exceptions import ObjectDoesNotExist
from django.db.models import F
from hyquest.models import Quest, Task, UserTaskAction, UserQuestAction, UserQuestSetAction

from datetime import datetime

# This is a central location for other classes to call, that handles bookkeeping and integrity
# management for User Actions with the Quest structure.

# All begin___ methods cascade downwards (QuestSet->Task), 
# and all complete___ methods cascade upwards (Task->QuestSet)

def beginQuestSet(user, questset):
    #Create the UserQuestSetAction Object
    uqsa = UserQuestSetAction.objects.create(user=user, questset=questset, beginTime=datetime.now())
    uqsa.save()
    #Delegate for all Quests in QuestSet
    for quest in Quest.objects.filter(quest_set=questset):
        beginQuest(user, quest)

def beginQuest(user, quest):
    #Create the UserQuestAction Object
    uqa = UserQuestAction.objects.create(user=user, quest=quest, beginTime=datetime.now())
    uqa.save()
    #Delegate for all Tasks in Quest
    for task in Task.objects.filter(quest=quest):
        beginTask(user, task)

def beginTask(user, task):
    #Create the UserTaskAction Object
    uta = UserTaskAction.objects.create(user=user, task=task, beginTime=datetime.now())
    uta.save()

def completeQuestSet(user, questset):
    #Check that all tasks for this questset are complete
    complete = True
    for uqa in UserQuestAction.objects.filter(quest__quest_set=questset):
        if not uqa.complete:
            complete = False

    if complete:
        #If so, Load and Complete the UserQuestSetAction
        try:
            uqa = UserQuestSetAction.objects.get(user=user, questset=questset)
            uqa.complete = True
            uqa.completionTime = datetime.now()
            uqa.save()
            givePoints(user, questset.points)
        except ObjectDoesNotExist:
            pass

def completeQuest(user, quest):
    raise Exception('checking challenge')
    #Check that all tasks for this quest are complete
    complete = True
    for uta in UserTaskAction.objects.filter(task__quest=quest):
        if not uta.complete:
            complete = False

    if complete:
        #If so, Load and Complete the UserQuestAction
        try:
            uqa = UserQuestAction.objects.get(user=user, quest=quest)
            uqa.complete = True
            uqa.completionTime = datetime.now()
            uqa.save()
            givePoints(user, quest.points)
            completeQuestSet(user=user, questset=uqa.quest.quest_set)
        except ObjectDoesNotExist:
            pass

def completeTask(user, task):
    #Load and Complete the UserTaskAction
    try:
        uta = UserTaskAction.objects.get(user=user, task=task)
        uta.complete = True
        uta.completionTime = datetime.now()
        uta.save()
        givePoints(user, task.points)
        completeQuest(user=user, quest=uta.task.quest)
    except ObjectDoesNotExist:
        pass

def givePoints(user, points):
    user.profile.points = F('points')+points
    user.profile.save()
