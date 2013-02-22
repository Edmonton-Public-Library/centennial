from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.db import models

from centennial.constants import FACEBOOK_KEY_LEN, BIBLIO_USER_LEN

class UserProfile(models.Model):
    user = models.OneToOneField(User)
    
    class Meta:
        verbose_name_plural = "UserProfiles"
    
    facebook = models.CharField(max_length=FACEBOOK_KEY_LEN, blank=True)
    biblioname = models.CharField(max_length=BIBLIO_USER_LEN, blank=True)
    biblioid = models.IntegerField(blank=True)
    
    def __unicode__(self):
        return self.user.__unicode__() + "'s Profile"

def create_user_profile(sender, instance, created, **kwargs):
    if created:
        profile, created = UserProfile.objects.get_or_create(user=instance)

post_save.connect(create_user_profile, sender=User)

User.profile = property(lambda u: u.get_profile() )

