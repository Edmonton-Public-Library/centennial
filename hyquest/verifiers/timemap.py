from hyquest.verifiers.common import getTaskResultSet, getUserAction
from hyquest.constants import TASK_TIMEMAP

# This handles matching up TimeMap state to associated TimeMap Tasks

def matchingTimeMapTasks(user, timeMapState):
    tasks = getTaskResultSet(user).filter(type=TASK_TIMEMAP)
    activeTasks = []
    otherTasks = []
    for task in tasks:
        if timeMapMatches(task, timeMapState):
            action = getUserAction(user, task)
            if action is None:
                otherTasks.append(task)
            elif action.complete != True:
                activeTasks.append(task)
    return (activeTasks, otherTasks)

def timeMapMatches(task, timeMapState):
    reqs = task.getInfoReqs()
    if 'minYear' in reqs and ('year' not in timeMapState or int(timeMapState['year'])+5 < int(reqs['minYear'])):
        print "year before minYear"
        return False
    if 'maxYear' in reqs and ('year' not in timeMapState or int(timeMapState['year'])-5 > int(reqs['maxYear'])):
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
