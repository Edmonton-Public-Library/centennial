from datetime import datetime
from django.db import models
from django.core.exceptions import ValidationError
from taggit.managers import TaggableManager

from epl.custommodels import IntegerRangeField, FloatRangeField
from util.file_validator import FileValidator
from hyquest.constants import QUEST_TITLE_LEN, TASK_TITLE_LEN, TASK_TYPES

class QuestSet(models.Model):
    
    class Meta:
        verbose_name_plural = "QuestSets"
    
    title = models.CharField(max_length=QUESTSET_TITLE_LEN)
    description = models.CharField(max_length=QUESTSET_DESC_LEN)
    points = IntegerRangeField(min_value=0, max_value=6000)
    
    def __unicode__(self):
        return self.title

class Quest(models.Model):

    class Meta:
        verbose_name_plural = "Quests"

    title = models.CharField(max_length=QUEST_TITLE_LEN)
    points = IntegerRangeField(min_value=0, max_value=6000)
    active = models.BooleanField()

    def __unicode__(self):
        return self.title

class Task(models.Model):
    
    class Meta:
        verbose_name_plural = "Tasks"
    
    title = models.CharField(max_length=TASK_TITLE_LEN)
    points = IntegerRangeField(min_value=0, max_value=6000)
    quest = models.ForeignKey('Quest')
    type = models.IntegerRangeField(min_value=0, max_value=len(TASK_TYPES))

    def __unicode__(self):
        return self.title

# Signal setup

from django.dispatch.dispatcher import receiver
from django.db.models.signals import pre_save, pre_delete


