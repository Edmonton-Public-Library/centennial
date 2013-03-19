from django.contrib.auth.models import User
from hyquest.models import Task, UserTaskAction, TaskCode
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime
from hyquest.actionmanager import completeTask

import centennial.bibliocommons

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
        
def completeSocialTask(user, social):
    task = getTaskForSocial(social)
    if task == None:
        return None
    action = getUserAction(user, task)
    if action == None or action.complete:
        return None
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

def getTaskForSocial(social):
    #This should include verification that the quest-set it comes from is open
    return None

def getUserAction(user, task):
    try:
        action = UserTaskAction.objects.get(user=user, task=task)
        return action
    except ObjectDoesNotExist:
        return None

def completeTimeMapTask(user, timeMapState):
    userTasks = UserTaskAction.objects.filter(user=user, task__type=4)
    print "User "+str(user)+" has "+str(userTasks.count())+" TimeMap tasks open"
    for userAction in userTasks:
        if timeMapMatches(userAction.task, timeMapState):
            completeTask(user, userAction.task)
            return userAction.task
    return None

def timeMapMatches(task, timeMapState):
    reqs = getTimeMapReqs(task)
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

def getTimeMapReqs(task):
    taskReqs = task.taskinfo.split(';')
    requirements = {}
    for req in taskReqs:
        if '=' in req:
            reqSplit = req.split('=')
            requirements[reqSplit[0]] = reqSplit[1]
    return requirements

def verifyBibliocommonsAccount(user):
    try:
        bibliolink = BibliocommonsLink.objects.get(user=user)
        if bibliolink.biblioid == -1:
            print "Doing Bibliocommons User ID Lookup for "+bibliolink.biblioname+"..."
            bibliolink.biblioid = int(centennial.bibliocommons.userID(bibliolink.biblioname))
            print bibliolink.biblioname+" --> "+str(bibliolink.biblioid)
            bibliolink.save()
        return True
    except ObjectDoesNotExist:
        print "Warning: User account "+str(user)+" does not have linked Bibliocommons Account."
        return False

def completeBibliocommonsTask(user): 
    try:
        bibliolink = BibliocommonsLink.objects.get(user=user)
        if bibliolink.biblioid == -1:
            print "Error: cannot look up Bibliocommons content without defined Bibliocommons ID"
            return None
    except ObjectDoesNotExist:
        print "Error: user "+str(user)+" does not have linked Bibliocommons Account."
        return None
    try:
        content = centennial.bibliocommons.userContent(bibliolink.biblioid)
    except Exception:
        print "Error: Unable to communicate with the Bibliocommons API"
    userTasks = UserTaskAction.objects.filter(user=user, task__type=0)
    return None
