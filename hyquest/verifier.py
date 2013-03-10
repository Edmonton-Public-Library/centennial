from django.contrib.auth.models import User
from hyquest.models import Task, UserAction, TaskCode
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime

def completeCodeTask(user, code):
    task = getTaskForCode(code)
    if task == None:
        return None
    action = getUserAction(user, task)
    if action == None:
        return None
    burnCode(code)
    finishAction(action)
    return Task
        
def completeSocialTask(user, social):
    task = getTaskForSocial(social)
    if task == None:
        return None
    action = getUserAction(user, task)
    if action == None:
        return None
    finishAction(action)
    return Task

def getTaskForCode(code):
    #This should include verification that the quest-set it comes from is open
    try:
        task = TaskCode.objects.get(code=code).task
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
        action = UserAction.objects.get(user=user, task=task)
        return action
    except ObjectDoesNotExist:
        return None

def beginAction(user, task):
    action = UserAction.objects.create(user=user, task=task, beginTime=datetime.now())
    action.save()
    return action
    
def finishAction(action):
    action.complete=True
    action.completionTime=datetime.now()
    action.save()
    return action
