from django.contrib.auth.models import User
from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from epl.custommodels import IntegerRangeField
from hyquest.constants import QUESTSET_TITLE_LEN, QUESTSET_DESC_LEN, QUEST_TITLE_LEN, \
                              TASK_TITLE_LEN, TASK_CODE_LEN, TASK_BIBLIOCOMMONS, \
                              TASK_CODE, TASK_SOCIAL, TASK_TIMEMAP, TASK_CHOICES,\
                              MAX_POINTS
from timemap.models import Branch, Story

biblioFormats = {'BK': 'Book', 'CD':'CD', 'DVD': 'DVD', 'BOOK_CD': 'Audiobook'}

class QuestSet(models.Model):
    """
    Stores a set of a few related Quests as well as a description.
    When marked inactive, will not show up to any users. When featured, will show up
    for all users.
    """
    class Meta:
        verbose_name = "Quest Set"
        verbose_name_plural = "Quest Sets"

    title = models.CharField(max_length=QUESTSET_TITLE_LEN)
    description = models.CharField(max_length=QUESTSET_DESC_LEN)
    points = IntegerRangeField(min_value=0, max_value=MAX_POINTS)
    active = models.BooleanField(default=False)
    featured = models.BooleanField(default=False, db_index=True)
    depends_on = models.ForeignKey('QuestSet', blank=True, null=True)

    def __unicode__(self):
        return self.title

    def complete_after(self):
        return str(self.depends_on)

class Quest(models.Model):
    """
    Stores a set of a few related Tasks and belongs to a QuestSet
    """
    class Meta:
        verbose_name = "Quest"
        verbose_name_plural = "Quests"

    title = models.CharField(max_length=QUEST_TITLE_LEN)
    points = IntegerRangeField(min_value=0, max_value=MAX_POINTS)
    quest_set = models.ForeignKey('QuestSet', db_index=True)

    def __unicode__(self):
        return str(self.quest_set)+" >> "+self.title

    def selflink(self):
        if self.id:
            return "<a href='/admin/hyquest/quest/%s/' target='_blank'>Edit</a>" % str(self.id)
        else:
            return "Save before editing"

    selflink.allow_tags = True
    selflink.short_description = 'Edit Link'

class Task(models.Model):
    """
    Belongs to a Quest and encapsulates one of four Task Types.

    Code Completion:
    -Submit a code to complete this type of Task

    TimeMap:
    -Visit pre-selected portions of the TimeMap to complete these Tasks

    Social:
    -Share pre-selected stories from the TimeMap to complete these Tasks

    Bibliocommons:
    -Comment on or Rate a piece of content from Bibliocommons to complete these Tasks
    """
    class Meta:
        verbose_name = "Task"
        verbose_name_plural = "Tasks"

    title = models.CharField(max_length=TASK_TITLE_LEN)
    points = IntegerRangeField(min_value=0, max_value=MAX_POINTS)
    quest = models.ForeignKey('Quest', db_index=True)
    type = IntegerRangeField(min_value=0, max_value=len(TASK_CHOICES))
    taskinfo = models.CharField(max_length=TASK_CODE_LEN)

    def __unicode__(self):
        return str(self.quest)+" >> "+self.title

    def interpretTMInfo(self):
        reqs = self.getInfoReqs()
        infostr = "Visit "
        if 'story' in reqs:
            try:
                infostr += Story.objects.get(id=int(reqs['story'])).title + " in "
            except Exception:
                infostr += "Unknown Story in "
        if 'branch' in reqs:
            try:
                infostr += Branch.objects.get(id=int(reqs['branch'])).name + " Branch "
            except Exception:
                infostr += "Unknown Branch "
        if 'onMap' in reqs:
            infostr += ("on " if (reqs['onMap'] == "True") else "off ") + "the map "
        if 'maxYear' in reqs:
            infostr += "before " + reqs['maxYear'] + " "
        if 'minYear' in reqs:
            infostr += "after " +reqs['minYear']
        return infostr

    def interpretBiblioInfo(self):
        reqs = self.getInfoReqs()
        infostr = ""
        if 'action' in reqs:
            infostr = ("Comment on a " if (reqs['action'] == 'comment') else "Rate a ")
        else:
            return "Specifics Not Set"
        if 'format' in reqs:
            infostr += biblioFormats[reqs['format']]
        else:
            infostr += " Resource"
        if 'title' in reqs:
            infostr += " with Title: '"+reqs['title']+"', "
        if 'author' in reqs:
            infostr += " with Author: '"+ ("' or '".join(reqs['author'].split(':')))+"', "
        if 'isbn' in reqs:
            infostr += " with ISBN: "+ (" or ".join(reqs['isbn'].split(':')))+", "
        return infostr

    def interpretSocialInfo(self):
        reqs = self.getInfoReqs()
        if 'story' in reqs:
            return "Share the story: "+str(Story.objects.get(id=reqs['story']))
        return "Not Set"

    def links(self):
        if self.id and self.type == TASK_BIBLIOCOMMONS:
            return self.interpretBiblioInfo() + "<br><a href='/admin/hyquest/modifybibliocommons?task_id="+str(self.id)+"'>Change</a>"
        if self.id and self.type == TASK_CODE:
            return "<a href='/admin/hyquest/taskcode/?task="+str(self.id)+"' target='_blank'>"+str(TaskCode.objects.filter(task=self, uses_remaining__gt=0).count())+" Codes</a><br><a href='/admin/hyquest/generatecodes?task_id=%s' target='_blank'><img src='/static/admin/img/icon_addlink.gif' width='10' height='10'/> Generate More Codes</a>" % str(self.id)
        elif self.id and self.type == TASK_SOCIAL:
            return self.interpretSocialInfo()+"<br><a href='/admin/hyquest/modifysocial?task_id="+str(self.id)+"'>Change</a>"
        elif self.id and self.type == TASK_TIMEMAP:
            return self.interpretTMInfo() + "<br><a href='/admin/hyquest/modifytimemap?task_id="+str(self.id)+"'>Change</a>"
        else:
            return "Save Before Continuing"
    links.allow_tags = True

    def getInfoReqs(self):
        taskReqs = self.taskinfo.split(';')
        requirements = {}
        for req in taskReqs:
            if '=' in req:
                reqSplit = req.split('=')
                requirements[reqSplit[0]] = reqSplit[1]
        return requirements

class TaskCode(models.Model):
    """
    These Codes are used to complete the associated Task. They must be entered exactly.
    """
    class Meta:
        verbose_name = "Task Completion Code"
        verbose_name_plural = "Task Completion Codes"

    task = models.ForeignKey('Task')
    code = models.CharField(max_length=20, db_index=True)
    uses_remaining = models.IntegerField(default=1)

    def __unicode__(self):
        return self.task.title+" ("+str(self.uses_remaining)+" remaining)"

class UserTaskAction(models.Model):
    """
    Tracks the progress of a given User for a given Task 
    """
    class Meta:
        verbose_name = "User Task Action"
        verbose_name_plural = "User Task Actions"
        unique_together = ("user", "task")

    user = models.ForeignKey(User, db_index=True)
    task = models.ForeignKey('Task', db_index=True)
    complete = models.BooleanField(default=False)
    beginTime = models.DateField()
    completionTime = models.DateField(null=True)

    def __unicode__(self):
        return str(self.user) + " - " + str(self.task)

class UserQuestAction(models.Model):
    """
    Tracks the progress of a given User for a given Quest
    """
    class Meta:
        verbose_name = "User Quest Action"
        verbose_name_plural = "User Quest Actions"
        unique_together = ("user", "quest")

    user = models.ForeignKey(User, db_index=True)
    quest = models.ForeignKey('Quest', db_index=True)
    complete = models.BooleanField(default=False)
    beginTime = models.DateField()
    completionTime = models.DateField(null=True)

    def __unicode__(self):
        return str(self.user) + " - " + str(self.quest)

class UserQuestSetAction(models.Model):
    """
    Tracks the progress of a given User for a given Quest Set
    """
    class Meta:
        verbose_name = "User Quest Set Action"
        verbose_name_plural = "User Quest Set Actions"
        unique_together = ("user", "questset")

    user = models.ForeignKey(User, db_index=True)
    questset = models.ForeignKey('QuestSet', db_index=True)
    complete = models.BooleanField(default=False)
    beginTime = models.DateField()
    completionTime = models.DateField(null=True)
    def __unicode__(self):
        return str(self.user) + " - " + str(self.questset)

class Level(models.Model):
    """
    Names and provides experience requirements to obtain a given level
    """
    class Meta:
        verbose_name = "Level"
        ordering = ["required_exp"]

    level_name = models.CharField(default='1', max_length='40')
    required_exp = models.IntegerField(default=0)

    def __unicode__(self):
        return self.level_name

# Signal setup

from django.dispatch.dispatcher import receiver
from django.db.models.signals import post_save, post_delete
from hyquest.actionmanager import beginTask, beginQuest, completeQuest, completeQuestSet

@receiver(post_save, sender=Task)
def maintainUserTaskActions(sender, instance, created, **kwargs):
    if created:
        print "New Task created. Adding User Actions for all current users"
        userActions = UserQuestAction.objects.filter(quest=instance.quest, complete=False)
        for action in userActions:
            print "Adding action for " + str(action.user)
            beginTask(user=action.user, task=instance)

@receiver(post_save, sender=Quest)
def maintainUserQuestActions(sender, instance, created, **kwargs):
    if created:
        print "New Task created. Adding User Actions for all current users"
        userActions = UserQuestSetAction.objects.filter(questset=instance.quest_set, complete=False)
        for action in userActions:
            print "Adding action for " + str(action.user)
            beginQuest(user=action.user, quest=instance)

@receiver(post_delete, sender=Task)
def maintainDeletedTaskActions(sender, instance, **kwargs):
    print "Task Deleted, rechecking user quests"
    try:
        userActions = UserQuestAction.objects.filter(quest=instance.quest, complete=False)
        for action in userActions:
            print "Checking completion for "+str(action.user)
            completeQuest(action.user, action.quest)
    except ObjectDoesNotExist:
        print "Quest Deleted, skipping"

@receiver(post_delete, sender=Quest)
def maintainDeletedQuestActions(sender, instance, **kwargs):
    print "Quest Deleted, rechecking user questsets"
    userActions = UserQuestSetAction.objects.filter(questset=instance.quest_set, complete=False)
    for action in userActions:
        print "Checking completion for "+str(action.user)
        completeQuestSet(action.user, action.questset)
