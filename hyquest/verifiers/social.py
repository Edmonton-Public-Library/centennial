from hyquest.verifiers.common import getTaskResultSet, getUserAction
from hyquest.constants import TASK_SOCIAL

# This handles matching up social state to the provided social Tasks

def matchingSocialTasks(user, social):
    tasks = getTaskResultSet(user).filter(type=TASK_SOCIAL)
    activeTasks = []
    otherTasks = []
    for task in tasks:
        if socialMatches(task, social):
            action = getUserAction(user, task)
            if action is None:
                otherTasks.append(task)
            elif action.complete != True:
                activeTasks.append(task)
    return (activeTasks, otherTasks)


def socialMatches(task, social):
    reqs = task.getInfoReqs()
    if 'story' in reqs and ('story' not in social or reqs['story'] != str(social['story'])):
        return False
    return True
