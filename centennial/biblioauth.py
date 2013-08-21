from centennial.bibliocommons import validUser
from centennial.models import BibliocommonsLink
from django.contrib.auth.models import User
from django.contrib.auth.models import Group

# This class acts as an authenticator that logs in users with their bibliocommons IDs

class BiblioBackend:
    def authenticate(self, username=None, password=None):
        if validUser(username, password):
            try:
                biblio_user = BibliocommonsLink.objects.get(biblioname=username)
                return biblio_user.user
            except BibliocommonsLink.DoesNotExist:
                pass
            # If we got here, these are valid credentials, but no account exists
            centennialName = username
            count = 0
            while (User.objects.filter(username=centennialName).count() > 0):
                count += 1
                centennialName = username + str(count)
            user = User.objects.create_user(username=centennialName, email="",password="67023458714!@#$%^&^%$%^&*()*&^%$%^%$#$%^&aoehyx.rkkk'p'uxxi489i")
            grp = Group.objects.get(name='Basic User') 
            grp.user_set.add(user)
            user.is_active = True
            user.save()
            biblio_link = BibliocommonsLink.objects.create(biblioname=username, user=user)
            biblio_link.save()
            return user
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            pass
        return None
