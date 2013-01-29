from datetime import datetime
from django.db import models
from django.core.exceptions import ValidationError
from timemap.constants import BRANCH_NAME_LEN, BRANCH_DESCRIPTION_LEN, STORY_TITLE_LEN, \
                              STORY_DESCRIPTION_LEN, STORY_TEXT_LEN

from epl.custommodels import IntegerRangeField, FloatRangeField

class Branch(models.Model):

    class Meta:
        verbose_name_plural = "Branches"

    name = models.CharField(max_length=BRANCH_NAME_LEN)
    description = models.TextField(max_length=BRANCH_DESCRIPTION_LEN)
    start_year = IntegerRangeField(min_value=1900, max_value=3000)
    end_year = IntegerRangeField(min_value=1900, max_value=3000)
    latitude = FloatRangeField(min_value=-90, max_value=90)
    longitude = FloatRangeField(min_value=-180, max_value=180)

    def clean(self):
        if self.start_year > self.end_year:
            raise ValidationError("End year must occur after start year")

    def __unicode__(self):
        return self.name

class Story(models.Model):

    class Meta:
        verbose_name_plural = "Stories"

    title = models.CharField(max_length=STORY_TITLE_LEN)
    description = models.TextField(max_length=STORY_DESCRIPTION_LEN, blank=True)
    story_text = models.TextField(max_length=STORY_TEXT_LEN, blank=True)
    link_url = models.URLField(blank=True)
    #file_url = models.URLField(blank=True)
    year = IntegerRangeField(min_value=1900, max_value=3000)
    month = IntegerRangeField(min_value=0, max_value=12)
    day = IntegerRangeField(min_value=0, max_value=31)
    branch = models.ForeignKey('Branch')
    #keywords
    #user
    public_approved = models.BooleanField(default=False)
    #content type

    def clean(self):
        try:
            day = self.day if self.day else 1
            month = self.month if self.month else 1
            date = "%s/%s/%s" % (day, month, self.year)
            datetime.strptime(date, "%d/%m/%Y")
        except ValueError:
            #TODO: Should make the resulting error clearer
            raise ValidationError("Please enter a valid date")

    def __unicode__(self):
        return self.title


from django.db.models.signals import pre_save
def validate_model(sender, **kwargs):
    """ Force a clean call when certain models are saved in order to do
        keep model constrains
    """
    if sender in [Branch, Story] and 'raw' in kwargs and not kwargs['raw']:
        kwargs['instance'].full_clean()

pre_save.connect(validate_model, dispatch_uid='validate_models')
