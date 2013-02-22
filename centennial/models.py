from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.db import models

from centennial.constants import FACEBOOK_KEY_LEN, BIBLIO_USER_LEN

class UserProfile(models.Model):
    user = models.OneToOneField(User)
    
    class Meta:
        verbose_name_plural = "UserProfiles"
    
    facebook = models.CharField(max_length=FACEBOOK_KEY_LEN, default='', blank=True)
    biblioname = models.CharField(max_length=BIBLIO_USER_LEN, default='', blank=True)
    biblioid = models.IntegerField(default=-1,blank=True)
    phoneNumber = models.CharField(max_length=10,default='', blank=True)
    activated = models.BooleanField()
    
    def __unicode__(self):
        return self.user.__unicode__() + "'s Profile"

def create_user_profile(sender, instance, created, **kwargs):
    if created:
        profile, created = UserProfile.objects.get_or_create(user=instance)

post_save.connect(create_user_profile, sender=User)

User.profile = property(lambda u: u.get_profile() )

#Signals

from django.dispatch.dispatcher import receiver
from django.db.models.signals import pre_save

@receiver(pre_save, sender=UserProfile)
def send_activation_email(sender, **kwargs):
    """
        Send acivation e-mail for unactivated users
        """
    instance = kwargs['instance']
    print instance
