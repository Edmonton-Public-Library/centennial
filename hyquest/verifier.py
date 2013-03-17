from django.contrib.auth.models import User
from hyquest.models import Task, UserTaskAction, TaskCode
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime

def completeCodeTask(user, code):
    task = getTaskForCode(code)
    if task == None:
        return None
    action = getUserAction(user, task)
    if action == None or action.complete:
        return None
    burnCode(code)
    finishAction(action)
    return Task
        
def completeSocialTask(user, social):
    task = getTaskForSocial(social)
    if task == None:
        return None
    action = getUserAction(user, task)
    if action == None or action.complete:
        return None
    finishAction(action)
    return Task

def getTaskForCode(code):
    #This should include verification that the quest-set it comes from is open
    try:
        tcode = TaskCode.objects.get(code=code)
        if tcode.uses_remaining<1:
            return None
        task = tcode.task
        if task.quest.quest_set.active:
            return task
        return None
    except ObjectDoesNotExist:
        return None

def burnCode(code):
    try:
        taskcode = TaskCode.objects.get(code=code)
        taskcode.uses_remaining -= 1
        taskcode.save()
    except ObjectDoesNotExist:
        pass
    return

def getTaskForSocial(social):
    #This should include verification that the quest-set it comes from is open
    return None

def getUserAction(user, task):
    try:
        action = UserTaskAction.objects.get(user=user, task=task)
        return action
    except ObjectDoesNotExist:
        return None
