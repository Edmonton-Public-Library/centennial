from django.core.exceptions import ObjectDoesNotExist

from hyquest.models import Task, UserTaskAction
from epl.settings import DISCOVERY_MODE

def getTaskResultSet(user):
    if DISCOVERY_MODE == True:
        return Task.objects.filter(quest__quest_set__active=True)
    else:
        return Task.objects.filter(usertaskaction__user=user)
def getUserAction(user, task):
    try:
        action = UserTaskAction.objects.get(user=user, task=task)
        return action
    except ObjectDoesNotExist:
        return None
