from django.db import models
from django.core.exceptions import ValidationError
from timemap.constants import BRANCH_NAME_LEN, BRANCH_DESCRIPTION_LEN

from epl.custommodels import IntegerRangeField, FloatRangeField

class Branch(models.Model):

    class Meta:
        verbose_name_plural = "Branches"

    name = models.CharField(max_length=BRANCH_NAME_LEN)
    description = models.CharField(max_length=BRANCH_DESCRIPTION_LEN)
    start_year = IntegerRangeField(min_value=1900, max_value=3000)
    end_year = IntegerRangeField(min_value=1900, max_value=3000)
    latitude = FloatRangeField(min_value=-90, max_value=90)
    longitude = FloatRangeField(min_value=-180, max_value=180)

    def clean(self):
        if self.start_year > self.end_year:
            raise ValidationError("End year must occur after start year")

    def __unicode__(self):
        return self.name

from django.db.models.signals import pre_save
def validate_model(sender, **kwargs):
    if sender in [Branch] and 'raw' in kwargs and not kwargs['raw']:
        kwargs['instance'].full_clean()

pre_save.connect(validate_model, dispatch_uid='validate_models')
