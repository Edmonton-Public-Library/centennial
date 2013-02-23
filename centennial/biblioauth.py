from django.conf import settings
from centennial.bibliocommons import validUser
from centennial.models import BibliocommonsLink
from django.contrib.auth.models import User

class BiblioBackend:
    def authenticate(self, username=None, password=None):
        try:
            biblio_user = BibliocommonsLink.objects.get(biblioname=username)
            if validUser(username, password):
                return biblio_user.user
        except BibliocommonsLink.DoesNotExist:
            pass
        return None
    
    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            pass
        return None