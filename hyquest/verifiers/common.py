from django.core.exceptions import ObjectDoesNotExist

from hyquest.models import Task, UserTaskAction

def getTaskResultSet(user):
    return Task.objects.filter(quest__quest_set__active=True)

def getUserAction(user, task):
    try:
        action = UserTaskAction.objects.get(user=user, task=task)
        return action
    except ObjectDoesNotExist:
        return None
