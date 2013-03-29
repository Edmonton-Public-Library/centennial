from django.contrib.auth.models import User
from hyquest.models import Task, UserTaskAction, TaskCode
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime
from hyquest.actionmanager import completeTask
from hyquest.constants import TASK_BIBLIOCOMMONS, TASK_SOCIAL, TASK_CODE, TASK_TIMEMAP

import centennial.bibliocommons

# Common Task Completion Code
def getTaskResultSet(user):
    return Task.objects.filter(quest__quest_set__active=True)

def getUserAction(user, task):
    try:
        action = UserTaskAction.objects.get(user=user, task=task)
        return action
    except ObjectDoesNotExist:
        return None

##
##  CODE COMPLETION TASKS
##
# for symmetry, returns (active tasks, serendipidous tasks)
def matchingCodeTasks(user, code):
    task = getTaskForCode(code)
    if task is None:
        return None
    action = getUserAction(user, task)
    if action is None:
        return ([], [task,])
    if action.complete:
        return ([], [])
    return ([task,],[])
        
def getTaskForCode(code):
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
def matchingSocialTasks(user, social):
    tasks = getTaskResultSet(user).filter(type=TASK_SOCIAL)
    activeTasks = []
    otherTasks = []
    for task in tasks:
        if socialMatches(task, social):
            action=getUserAction(user, task)
            if action is None:
                otherTasks.append(task)
            elif action.complete != True:
                activeTasks.append(task)
    return (activeTasks, otherTasks)


def socialMatches(task, social):
    reqs = task.getInfoReqs()
    if 'story' in reqs and ('story' not in social or reqs['story'] != str(social['story'])):
        return False


## 
##  TIMEMAP Tasks
##
def matchingTimeMapTasks(user, timeMapState):
    tasks = getTaskResultSet(user).filter(type=TASK_TIMEMAP)
    activeTasks = []
    otherTasks = []
    for task in tasks:
        if timeMapMatches(task, timeMapState):
            action=getUserAction(user, task)
            if action is None:
                otherTasks.append(task)
            elif action.complete != True:
                activeTasks.append(task)
    return (activeTasks, otherTasks)

def timeMapMatches(task, timeMapState):
    reqs = task.getInfoReqs()
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

##
## BIBLIOCOMMONS TASKS
##

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

def matchingBibliocommonsTasks(user): 
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
    tasks = getTaskResultSet().filter(type=TASK_BIBLIOCOMMONS)
    activeTasks = []
    otherTasks = []
    for task in tasks:
        if bibliocommonsMatches(content,userTask.task):
            action = getUserAction(user, task)
            if action is None:
                otherTasks.append(task)
            elif action.complete != True:
                activeTasks.append(task)
    return (activeTasks, otherTasks)

def bibliocommonsMatches(contentSet, task):
    reqs = task.getInfoReqs()
    for content in contentSet:
        if 'action' in reqs and reqs['action'] != content['content']['content_type']['id']:
            continue
        if 'format' in reqs and reqs['format'] != content['title']['format']['id']:
            continue
        if 'title' in reqs and reqs['title'] != content['title']['title']:
            continue
        if 'author' in reqs:
            reqAuthors = reqs['author'].split(':')
            containsAuthor = False
            for author in content['title']['authors']:
                for reqAuthor in reqAuthors:
                    if author['name'] == reqAuthor:
                        containsAuthor = True
            if not containsAuthor:
                continue
        if 'isbn' in reqs:
            reqISBNs = req['isbn'].split(':')
            containsISBN = False
            for reqISBN in reqISBNs:
                if reqISBN in content['title']['isbns']:
                    containsISBN = True
            if not containsISBN:
                continue
        return True
    return False
