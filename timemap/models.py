from django.db import models
from timemap.constants import BRANCH_NAME_LEN, BRANCH_DESCRIPTION_LEN

class Branch(models.Model):

    class Meta:
        verbose_name_plural = "Branches"

    name = models.CharField(max_length=BRANCH_NAME_LEN)
    description = models.CharField(max_length=BRANCH_DESCRIPTION_LEN)
    start_year = models.IntegerField()
    end_year = models.IntegerField()
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __unicode__(self):
        return self.name
