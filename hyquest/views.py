from django.shortcuts import render_to_response
from django.template.loader import get_template
from django.template import Context
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist, ValidationError
import json
import epl.settings
from hyquest.verifier import completeCodeTask

def submit_code_task(request):
    if not request.user.is_authenticated():
        return HttpResponse(json.dumps({'Response':'Error: Must be logged in'}), status=403, content_type='application/json')
    task = None
    if 'code' in request.GET:
        task = completeCodeTask(request.user, request.GET['code'])
    if task is None:
        return HttpResponse(json.dumps({'Response':'Error: Expired or invalid code'}), status=400, content_type='application/json')
    return HttpResponse(genCompletedTaskResponse(request.user, task), content_type='application/json')

def genCompletedTaskResponse(user, task):
    jdict = {'Response':'Success'}
    try:
        uta = UserTaskAction.objects.get(user=user, task=task)
        if uta.complete:
            jdict['CompletedTask'] = task.id
            uqa = UserQuestAction.objects.get(user=user, quest=task.quest)
            if uqa.complete:
                jdict['CompletedQuest'] = task.quest.id
                uqsa = UserQuestSetAction.objects.get(user=user, questset=task.quest.quest_set)
                if uqsa.complete:
                    jdict['CompletedQuestSet'] = task.quest.quest_set.id
        return json.dumps(jdict)
    except Exception:
        pass
    
