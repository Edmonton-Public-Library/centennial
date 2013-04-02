from django.core.exceptions import ObjectDoesNotExist
from django.db.models import F
from hyquest.models import TaskCode
from hyquest.verifiers.common import getUserAction

# This handles matching Tasks to provided Completion Codes

def matchingCodeTasks(user, code):
    task = getTaskForCode(code)
    if task is None:
        return ([], [])
    action = getUserAction(user, task)
    if action is None:
        burnCode(code)
        return ([], [task,])
    if action.complete:
        return ([], [])
    burnCode(code)
    return ([task,], [])

def getTaskForCode(code):
    try:
        tcode = TaskCode.objects.get(code=code)
        if tcode.uses_remaining < 1:
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
        taskcode.uses_remaining = F('uses_remaining')-1
        taskcode.save()
    except ObjectDoesNotExist:
        pass
    return
