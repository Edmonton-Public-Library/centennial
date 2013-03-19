from django.contrib.auth.models import User
from hyquest.models import Task, UserTaskAction, TaskCode
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime
from hyquest.actionmanager import completeTask

##
##  CODE COMPLETION TASKS
##
def completeCodeTask(user, code):
    task = getTaskForCode(code)
    if task == None:
        return None
    action = getUserAction(user, task)
    if action == None or action.complete:
        return None
    burnCode(code)
    completeTask(user, task)
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

##
##  SOCIAL MEDIA TASKS
##
def completeSocialTask(user, social):
    task = getTaskForSocial(social)
    if task == None:
        return None
    action = getUserAction(user, task)
    if action == None or action.complete:
        return None
    completeTask(user, task)
    return Task

def getTaskForSocial(social):
    #This should include verification that the quest-set it comes from is open
    return None

def getUserAction(user, task):
    try:
        action = UserTaskAction.objects.get(user=user, task=task)
        return action
    except ObjectDoesNotExist:
        return None
## 
##  TIMEMAP Tasks
##
def completeTimeMapTask(user, timeMapState):
    userTasks = UserTaskAction.objects.filter(user=user, task__type=4)
    print "User "+str(user)+" has "+str(userTasks.count())+" TimeMap tasks open"
    for userAction in userTasks:
        if timeMapMatches(userAction.task, timeMapState):
            completeTask(user, userAction.task)
            return userAction.task
    return None

def timeMapMatches(task, timeMapState):
    reqs = task.getTimeMapReqs()
    if 'minYear' in reqs and ('year' not in timeMapState or int(timeMapState['year']) < int(reqs['minYear'])):
        print "year before minYear"
        return False
    if 'maxYear' in reqs and ('year' not in timeMapState or int(timeMapState['year']) > int(reqs['maxYear'])):
        print "year after maxYear"
        return False
    if 'branch' in reqs and ('branch' not in timeMapState or reqs['branch'] != str(timeMapState['branch'])):
        print "incorrect branch"
        return False
    if 'story' in reqs and ('story' not in timeMapState or reqs['story'] != str(timeMapState['story'])):
        print "incorrect story"
        return False
    if 'onMap' in reqs and ('onMap' not in timeMapState or reqs['onMap'] != str(timeMapState['onMap'])):
        print "On Map does not match"
        return False
    return True
##
## BIBLIOCOMMONS TASKS
##
