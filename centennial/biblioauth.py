from centennial.bibliocommons import validUser
from centennial.models import BibliocommonsLink
from django.contrib.auth.models import User

class BiblioBackend:
    def authenticate(self, username=None, password=None):
        if validUser(username, password):
            try:
                biblio_user = BibliocommonsLink.objects.get(biblioname=username)
                return biblio_user.user
            except BibliocommonsLink.DoesNotExist:
                pass
            print "Bibliocommons Signup - " + str(username)
            # If we got here, these are valid credentials, but no account exists
            centennialName = username
            count = 0
            while (User.objects.filter(username=centennialName).count() > 0):
                count += 1
                centennialName = username + str(count)
            print "Creating Centennial User - " + str(centennialName)
            user = User.objects.create_user(username=centennialName, email=username+"@bibliocommons.com",password="67023458714!@#$%^&^%$%^&*()*&^%$%^%$#$%^&aoehyx.rkkk'p'uxxi489i")
            user.is_active = True
            user.save()
            biblio_link = BibliocommonsLink.objects.create(biblioname=username, user=user)
            biblio_link.save()
            print "Account and Links created"
            return user
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            pass
        return None
