from django.core.exceptions import ObjectDoesNotExist

from centennial.models import BibliocommonsLink
from hyquest.verifiers.common import getTaskResultSet, getUserAction
from hyquest.constants import TASK_BIBLIOCOMMONS

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
    tasks = getTaskResultSet(user).filter(type=TASK_BIBLIOCOMMONS)
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