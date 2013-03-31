from django.http import HttpResponse, HttpResponseRedirect
import json
from hyquest.verifiers.code import matchingCodeTasks
from hyquest.verifiers.timemap import matchingTimeMapTasks
from hyquest.verifiers.bibliocommons import matchingBibliocommonsTasks
from hyquest.actionmanager import completeTask, beginQuestSet
from hyquest.questmanager import replenishQuestSets, activateFeaturedQuestSets
from hyquest.models import UserTaskAction, UserQuestAction

def check_biblio_tasks(request):
    if not request.user.is_authenticated():
        return HttpResponse(json.dumps({'Response':'Error: Must be logged in'}), status=403, content_type='application/json')
    if not verifyBibliocommonsAccount(request.user):
        return HttpResponse(json.dumps({'Response':'Error: Cant associate Bibliocommons user'}), status=400, content_type='application/json')
    activeTasks, otherTasks = matchingBibliocommonsTasks(request.user, tlState)
    beginDiscoveredTasks(request.user, otherTasks)

    for task in activeTasks:
        completeTask(request.user, task)
    for task in otherTasks:
        completeTask(request.user, task)
    return completedTasksHttpResponse(request.user, activeTasks, otherTasks)
def submit_timemap_task(request):
    if not request.user.is_authenticated():
        return HttpResponse(json.dumps({'Response':'Error: Must be logged in'}), status=403, content_type='application/json')
    if request.method != 'POST':
        return HttpResponse(json.dumps({'Response':'Error: Bad state object'}), status=400)
    tlState = None
    try:
        tlState = json.loads(request.raw_post_data)
    except ValueError, e:
        print e
        print request.raw_post_data
        return HttpResponse(json.dumps({'Response':'Error: Bad state object'}), status=400)

    activeTasks, otherTasks = matchingTimeMapTasks(request.user, tlState)
    beginDiscoveredTasks(request.user, otherTasks)

    for task in activeTasks:
        completeTask(request.user, task)
    for task in otherTasks:
        completeTask(request.user, task)
    return completedTasksHttpResponse(request.user, activeTasks, otherTasks)

def submit_social_task(request):
    if not request.user.is_authenticated():
        return HttpResponse(json.dumps({'Response':'Error: Must be logged in'}), status=403, content_type='application/json')
    if request.method != 'POST':
        return HttpResponse(json.dumps({'Response':'Error: Bad state object'}), status=400)
    social = None
    try:
        social = json.loads(request.raw_post_data)
    except ValueError, e:
        print e
        return HttpResponse(json.dumps({'Response':'Error: Bad state object'}), status=400)

    activeTasks, otherTasks = matchingSocialTasks(request.user, social)
    beginDiscoveredTasks(request.user, otherTasks)

    for task in activeTasks:
        completeTask(request.user, task)
    for task in otherTasks:
        completeTask(request.user, task)
    return completedTasksHttpResponse(request.user, activeTasks, otherTasks)

def submit_code_task(request):
    if not request.user.is_authenticated():
        return HttpResponse(json.dumps({'Response':'Error: Must be logged in'}), status=403, content_type='application/json')
    task = None
    if 'code' in request.GET:
        activeTasks, otherTasks = matchingCodeTasks(request.user, request.GET['code'])
    if len(activeTasks)+len(otherTasks) == 0:
        return HttpResponse(json.dumps({'Response':'Error: Expired or invalid code'}), status=400, content_type='application/json')
    beginDiscoveredTasks(request.user, otherTasks)
    for task in activeTasks:
        completeTask(request.user, task)
    for task in otherTasks:
        completeTask(request.user, task)
    return completedTasksHttpResponse(request.user, activeTasks, otherTasks)

def get_featured_quests(request):
    if request.user.is_authenticated():
        activateFeaturedQuestSets(request.user)
    return HttpResponseRedirect('/api/v1/questset/?featured')

def get_active_quests(request):
    if request.user.is_authenticated():
        replenishQuestSets(request.user)
    return HttpResponseRedirect('/api/v1/questset/?active')

def completedTasksHttpResponse(user, activeTasks, otherTasks):
    if len(activeTasks)+len(otherTasks) == 0:
        return HttpResponse(json.dumps({'Response':'No Completed Tasks'}),content_type='application/json')

    jdict = {'Response':'Success', 'completedTaskCount':len(activeTasks), 'discoveredTaskCount':len(otherTasks), 'completedTasks':[], 'discoveredTasks':[]}
    for task in activeTasks:
        jdict['completedTasks'].append(getTaskResponseDict(user, task))
    for task in otherTasks:
        jdict['discoveredTasks'].append(getTaskResponseDict(user, task))
    return HttpResponse(json.dumps(jdict), content_type='application/json')

def getTaskResponseDict(user, task):
    dict = {'title':task.title, 'quest':{'title':task.quest.title, 'completed':0, 'total':0},            'questset':{'title':task.quest.quest_set.title, 'completed':0, 'total':0}}
    dict['quest']['completed'] = UserTaskAction.objects.filter(task__quest=task.quest, user=user, complete=True).count()
    dict['quest']['total'] = UserTaskAction.objects.filter(task__quest=task.quest, user=user).count()
    dict['questset']['completed'] = UserQuestAction.objects.filter(quest__quest_set=task.quest.quest_set, user=user, complete=True).count()
    dict['questset']['total'] = UserQuestAction.objects.filter(quest__quest_set=task.quest.quest_set, user=user).count()
    return dict

def beginDiscoveredTasks(user, tasks):
    # Begin UserActions for any serendipidously discovered Tasks
    for task in tasks:
        if UserTaskAction.objects.filter(user=user, task=task).count() == 0:
            beginQuestSet(user, task.quest.quest_set)
