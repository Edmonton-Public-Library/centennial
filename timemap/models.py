import uuid
import datetime
from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from taggit.managers import TaggableManager
from preferences.models import Preferences

from epl.custommodels import IntegerRangeField, FloatRangeField
from util.file_validator import FileValidator
from timemap.constants import BRANCH_NAME_LEN, BRANCH_DESCRIPTION_LEN, STORY_TITLE_LEN, \
                              STORY_DESCRIPTION_LEN, STORY_TEXT_LEN, MAP_BASE_FOLDER_LEN, \
                              MAP_TITLE_LEN, MAP_AUTHOR_LEN, UPLOAD_EXTENSIONS, \
                              UPLOAD_MIME_TYPES

from util.email import emailer, email_template

class Branch(models.Model):

    class Meta:
        verbose_name_plural = "Branches"

    name = models.CharField(db_index=True, max_length=BRANCH_NAME_LEN)
    description = models.TextField(max_length=BRANCH_DESCRIPTION_LEN)
    start_year = IntegerRangeField(db_index=True, min_value=1900, max_value=3000)
    end_year = IntegerRangeField(db_index=True, min_value=1900, max_value=3000, blank=True, null=True)
    floor_plan = models.FileField(upload_to="floor_plans", blank=True, null=True)
    latitude_help = "Latitude range : -90:90"
    latitude = FloatRangeField(min_value=-90, max_value=90, help_text=latitude_help)
    longitude_help = "Longitude range : -180:180"
    longitude = FloatRangeField(min_value=-180, max_value=180, help_text=longitude_help)

    def clean(self):
        if self.end_year and self.start_year > self.end_year:
            raise ValidationError("End year must occur after start year")

    def __unicode__(self):
        return self.name

def media_upload_to(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return instance.CONTENT_TYPE_DICT[instance.content_type]+ "/" + filename

class Story(models.Model):
    TEXT = "T"
    LINK = "L"
    IMAGE = "I"
    PDF = "P"
    AUDIO = "A"
    VIDEO = "V"
    CONTENT_TYPE_CHOICES = (
        (TEXT, 'text'),
        (LINK, 'link'),
        (IMAGE, 'image'),
        (PDF, 'pdf'),
        (AUDIO, 'audio'),
        (VIDEO, 'video'),
    )
    CONTENT_TYPE_DICT = dict(CONTENT_TYPE_CHOICES)

    class Meta:
        verbose_name_plural = "Stories"

    title = models.CharField(db_index=True, max_length=STORY_TITLE_LEN)
    description = models.TextField(db_index=True, max_length=STORY_DESCRIPTION_LEN)
    story_text = models.TextField(max_length=STORY_TEXT_LEN, blank=True)
    link_url = models.URLField(blank=True, error_messages={'invalid': "Please input a valid URL (for example: http://www.example.com)."})
    media_file = models.FileField(upload_to=media_upload_to,
                                  blank=True,
                                  validators=[FileValidator(allowed_extensions=UPLOAD_EXTENSIONS,
                                                           allowed_mimetypes=UPLOAD_MIME_TYPES)])
    year = IntegerRangeField(db_index=True, min_value=1900, max_value=3000)
    month = IntegerRangeField(min_value=1, max_value=12, blank=True, null=True)
    day = IntegerRangeField(min_value=1, max_value=31, blank=True, null=True)
    branch = models.ForeignKey('Branch')
    keywords = TaggableManager(verbose_name="keywords",
                               help_text=("A comma-separated list of keywords"),
                               blank=True)
    user = models.ForeignKey(User)
    public_approved = models.BooleanField(default=False)
    content_type = models.CharField(db_index=True,
                                    max_length=1,
                                    choices=CONTENT_TYPE_CHOICES,
                                    default=TEXT)

    def clean(self):
        try:
            day = self.day if self.day else 1
            month = self.month if self.month else 1
            date = "%s/%s/%s" % (day, month, self.year)
            datetime.datetime.strptime(date, "%d/%m/%Y")
        except ValueError:
            #TODO: Should make the resulting error clearer
            raise ValidationError("Please enter a valid date.")

    def __unicode__(self):
        return self.title

class Map(models.Model):

    class Meta:
        verbose_name_plural = "Maps"

    base_folder = models.CharField(max_length=MAP_BASE_FOLDER_LEN)
    title = models.CharField(max_length=MAP_TITLE_LEN)
    author = models.CharField(max_length=MAP_AUTHOR_LEN)
    published = IntegerRangeField(min_value=1900, max_value=3000)
    start_year = IntegerRangeField(min_value=1900, max_value=3000)
    end_year = IntegerRangeField(min_value=1900, max_value=3000)

    def clean(self):
        if self.start_year > self.end_year:
            raise ValidationError("End year must occur after start year.")

    def __unicode__(self):
        return self.title

class FeaturedStory(models.Model):
    class Meta:
        verbose_name_plural = "Featured Stories"

    story = models.ForeignKey('Story')

    def __unicode__(self):
        return self.story.title

class TimemapPreferences(Preferences):

    class Meta:
        verbose_name_plural = "Timemap Preferences"

    __module__ = 'preferences.models'
    timeline_init_date = models.DateField(default=datetime.date(2013, 1, 1))
    timeline_start_date = models.DateField(default=datetime.date(1900, 1, 1))
    timeline_end_date = models.DateField(default=datetime.date(2014, 1, 1))

# Signal setup
from django.dispatch.dispatcher import receiver
from django.db.models.signals import pre_save, pre_delete

@receiver(pre_save)
def validate_model(sender, **kwargs):
    """
    Force a clean call when certain models are saved in order to do
    keep model constrains
    """
    if sender in [Branch, Story] and 'raw' in kwargs and not kwargs['raw']:
        kwargs['instance'].full_clean()

@receiver(pre_delete)
def story_delete(sender, instance, **kwargs):
    """
    Delete media files when stories are deleted
    """
    if sender in [Story] and instance.media_file:
        instance.media_file.delete(False)
