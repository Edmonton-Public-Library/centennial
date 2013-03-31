from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.db import models

import datetime
import socket

from centennial.constants import FACEBOOK_KEY_LEN, BIBLIO_USER_LEN

from util.email import emailer, email_template

class UserProfile(models.Model):
    user = models.OneToOneField(User)

    class Meta:
        verbose_name_plural = "UserProfiles"

    facebook = models.CharField(max_length=FACEBOOK_KEY_LEN, default='', blank=True)
    phone_number = models.CharField(max_length=10, default='', blank=True)
    email_sent = models.BooleanField(default=False)
    points = models.IntegerField(default=0)
    def __unicode__(self):
        return str(self.user) + "'s Profile"

def create_user_profile(sender, instance, created, **kwargs):
    if created:
        profile, created = UserProfile.objects.get_or_create(user=instance)

post_save.connect(create_user_profile, sender=User)

User.profile = property(lambda u: u.get_profile() )

#Bibliocommons User Linkage
class BibliocommonsLink(models.Model):

    class Meta:
        verbose_name_plural = "Bibliocommons Links"

    biblioname = models.CharField(max_length=BIBLIO_USER_LEN, default='', blank=True)
    biblioid = models.IntegerField(default=-1,blank=True)
    user = models.OneToOneField(User)

    def __unicode__(self):
        return str(self.user) + " --> " + str(self.biblioname)

#Signals

from django.dispatch.dispatcher import receiver
from django.db.models.signals import pre_save

@receiver(pre_save, sender=UserProfile)
def send_activation_email(sender, **kwargs):
    """
    Send acivation e-mail for unactivated users
    """
    instance = kwargs['instance']
    if instance.user.is_staff or instance.user.is_superuser or instance.user.is_active:
        instance.email_sent = True
        instance.user.is_active = True
    else:
        if instance.email_sent == False:
            name = "%s %s"%(instance.user.first_name, instance.user.last_name)
            email = instance.user.email
            time = str(datetime.datetime.now())
            notification_email = email_template.getRegistrationNotification(name, "http://localhost:8000", email, time, "html")
            try:
                emailer.do_send(notification_email, "bpetruk@serve.ctrlshiftcreate.com", email)
                instance.email_sent = True
            except Exception:
                instance.email_sent = False
                raise ValidationError("Failed to create user profile. Please try again later")
