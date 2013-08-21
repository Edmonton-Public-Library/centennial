from django.core.exceptions import ObjectDoesNotExist

from centennial.models import BibliocommonsLink
from hyquest.verifiers.common import getTaskResultSet, getUserAction
from hyquest.constants import TASK_BIBLIOCOMMONS
import centennial.bibliocommons

# This is the code that matches bibliocommons content to bibliocommons tasks

def verifyBibliocommonsAccount(user):
    try:
        bibliolink = BibliocommonsLink.objects.get(user=user)
        if bibliolink.biblioid == -1:
            bibliolink.biblioid = int(centennial.bibliocommons.userID(bibliolink.biblioname))
            bibliolink.save()

        return True
    except ObjectDoesNotExist:
        return False

def matchingBibliocommonsTasks(user):
    try:
        bibliolink = BibliocommonsLink.objects.get(user=user)
        if bibliolink.biblioid == -1:
            return ([], [])
    except ObjectDoesNotExist:
        return ([], [])
    try:
        content = centennial.bibliocommons.userContent(bibliolink.biblioid)
    except Exception, e:
        print e
        return ([], [])
    tasks = getTaskResultSet(user).filter(type=TASK_BIBLIOCOMMONS)
    activeTasks = []
    otherTasks = []
    for task in tasks:
        if bibliocommonsMatches(content, task):
            action = getUserAction(user, task)
            if action is None:
                otherTasks.append(task)
            elif action.complete != True:
                activeTasks.append(task)
    return (activeTasks, otherTasks)

def bibliocommonsMatches(contentSet, task):
    reqs = task.getInfoReqs()
    for content in contentSet:
        skip = True
        for nestedContent in content['content']:
            if 'action' in reqs and reqs['action'] != nestedContent['content_type']['id']:
                skip = False
        if skip:
            continue
        if 'format' in reqs and reqs['format'] != content['title']['format']['id']:
            continue
        if 'title' in reqs and reqs['title'] != content['title']['title']:
            raise Exception(content['title']['title'])
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
            reqISBNs = reqs['isbn'].split(':')
            containsISBN = False
            for reqISBN in reqISBNs:
                if reqISBN in content['title']['isbns']:
                    containsISBN = True
            if not containsISBN:
                continue
        return True
    return False
