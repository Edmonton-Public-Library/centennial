from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.db import models
from preferences import preferences

import datetime

from centennial.constants import FACEBOOK_KEY_LEN, BIBLIO_USER_LEN

from util.email import emailer, email_template
import epl.settings as settings

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
        send_activation_email(profile)

post_save.connect(create_user_profile, sender=User)

User.profile = property(lambda u: u.get_profile() )

#Bibliocommons User Linkage
class BibliocommonsLink(models.Model):

    class Meta:
        verbose_name_plural = "Bibliocommons Links"

    biblioname = models.CharField(max_length=BIBLIO_USER_LEN, default='', blank=True)
    biblioid = models.IntegerField(default=-1, blank=True)
    user = models.OneToOneField(User)

    def __unicode__(self):
        return str(self.user) + " --> " + str(self.biblioname)

#Signals

from django.dispatch.dispatcher import receiver
from django.db.models.signals import pre_save

def send_activation_email(profile):
    """
    Send acivation e-mail for unactivated users
    """
    instance = profile
    if instance.user.is_staff or instance.user.is_superuser or instance.user.is_active:
        instance.email_sent = True
        instance.user.is_active = True
    else:
        if instance.email_sent == False:
            name = "%s %s" % (instance.user.first_name, instance.user.last_name)
            email = instance.user.email
            time = str(datetime.datetime.now())
            notification_email = email_template.getRegistrationNotification(name, preferences.TimemapPreferences.base_url, email, time, "html")
            try:
                emailer.do_send(notification_email,
                        settings.SMTP_VALUES['SMTP_FROM_ADDR'],
                        email,
                        smtp_login=settings.SMTP_VALUES['SMTP_AUTH'])
                instance.email_sent = True
            except Exception as e:
                print e
                instance.email_sent = False
                raise ValidationError("Failed to create user profile. Please try again later")
