from datetime import datetime
from django.contrib.auth.models import User
from django.db import models
from django.core.exceptions import ValidationError
from django import forms

from epl.custommodels import IntegerRangeField, FloatRangeField
from util.file_validator import FileValidator
from hyquest.constants import QUESTSET_TITLE_LEN, QUESTSET_DESC_LEN, QUEST_TITLE_LEN, TASK_TITLE_LEN, TASK_DESC_LEN, TASK_CODE_LEN, TASK_CHOICES

class QuestSet(models.Model):
    
    class Meta:
        verbose_name_plural = "QuestSets"
    
    title = models.CharField(max_length=QUESTSET_TITLE_LEN)
    description = models.CharField(max_length=QUESTSET_DESC_LEN)
    points = IntegerRangeField(min_value=0, max_value=6000)
    active = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)
    def __unicode__(self):
        return self.title

class Quest(models.Model):

    class Meta:
        verbose_name_plural = "Quests"

    title = models.CharField(max_length=QUEST_TITLE_LEN)
    points = IntegerRangeField(min_value=0, max_value=6000)
    quest_set = models.ForeignKey('QuestSet')

    def __unicode__(self):
        return self.title

    def selflink(self):
        if self.id:
            return "<a href='/admin/hyquest/quest/%s/' target='_blank'>Edit</a>" % str(self.id)
        else:
            return "Not present"

    selflink.allow_tags = True

class Task(models.Model):
    
    class Meta:
        verbose_name_plural = "Tasks"
    
    title = models.CharField(max_length=TASK_TITLE_LEN)
    points = IntegerRangeField(min_value=0, max_value=6000)
    quest = models.ForeignKey('Quest')
    type = IntegerRangeField(min_value=0, max_value=3)
    taskinfo = models.CharField(max_length=TASK_CODE_LEN)

    def __unicode__(self):
        return self.title

    def links(self):
        if self.id and self.type == 3:
            return "<a href='/admin/hyquest/generatecodes/%s' target='_blank'>Generate Codes</a>" % str(self.id)
        else:
            return "Save Before Continuing"
    links.allow_tags = True


class TaskCode(models.Model):

    class Meta:
        verbose_name_plural = "TaskCodes"

    task = models.ForeignKey('Task')
    code = models.CharField(max_length=20)
    uses_remaining = models.IntegerField(default=1)

    def __unicode__(self):
        return self.task.title+" ("+str(self.uses_remaining)+" remaining)"

class UserTaskAction(models.Model):
    
    class Meta:
        verbose_name_plural = "UserTaskActions"
    
    user = models.ForeignKey(User)
    task = models.ForeignKey('Task')
    complete = models.BooleanField(default=False)
    beginTime = models.DateField()
    completionTime = models.DateField(null=True)
    
    def __unicode__(self):
        return str(self.user) + " - " + str(self.task)

class UserQuestAction(models.Model):
    
    class Meta:
        verbose_name_plural = "UserQuestActions"
    
    user = models.ForeignKey(User)
    quest = models.ForeignKey('Quest')
    complete = models.BooleanField(default=False)
    beginTime = models.DateField()
    completionTime = models.DateField(null=True)
    
    def __unicode__(self):
        return str(self.user) + " - " + str(self.quest)

class UserQuestSetAction(models.Model):
    
    class Meta:
        verbose_name_plural = "UserQuestSetActions"
    
    user = models.ForeignKey(User)
    questset = models.ForeignKey('QuestSet')
    complete = models.BooleanField(default=False)
    beginTime = models.DateField()
    completionTime = models.DateField(null=True)
    def __unicode__(self):
        return str(self.user) + " - " + str(self.questset)


# Signal setup

from django.dispatch.dispatcher import receiver
from django.db.models.signals import pre_save, pre_delete


