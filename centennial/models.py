from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.db import models

from centennial.constants import FACEBOOK_KEY_LEN, BIBLIO_USER_LEN

from util.email import emailer, email_template

class UserProfile(models.Model):
    user = models.OneToOneField(User)

    class Meta:
        verbose_name_plural = "UserProfiles"

    facebook = models.CharField(max_length=FACEBOOK_KEY_LEN, default='', blank=True)
    biblioname = models.CharField(max_length=BIBLIO_USER_LEN, default='', blank=True)
    biblioid = models.IntegerField(default=-1,blank=True)
    phone_number = models.CharField(max_length=10, default='', blank=True)
    email_sent = models.BooleanField(default=False)

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
    if instance.email_sent == False:
        name = "%s %s"%(instance.user.first_name, instance.user.last_name)
        email = instance.user.email
        notification_email = email_template.getRegistrationNotification(name, "http://localhost:8000", email, "00:00", "html")
        emailer.do_send(notification_email, email)
        instance.email_sent = True
