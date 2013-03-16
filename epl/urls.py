from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.contrib import admin
from tastypie.api import Api

from timemap.api import BranchResource, StoryResource, UserResource, SimpleBranchResource
from timemap.views import timemap, hyq, upload, preference
from centennial.views import accountActivate, login_user, logout_user, create_user, current_user, link_bibliocommons, update_user
from hyquest.api import QuestSetResource, QuestResource, TaskResource

admin.autodiscover()
v1_api = Api(api_name="v1")
v1_api.register(BranchResource())
v1_api.register(SimpleBranchResource())
v1_api.register(StoryResource())
v1_api.register(UserResource())
v1_api.register(QuestSetResource())
v1_api.register(QuestResource())
v1_api.register(TaskResource())

urlpatterns = patterns('',
    url(r'^account/login/centennial', login_user),
    url(r'account/', include('social_auth.urls')),
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(v1_api.urls)),
    url(r'^timemap/', timemap),
    url(r'^hyq/', hyq),
    url(r'^account/logout', logout_user),
    url(r'^account/activate', accountActivate),
    url(r'^account/create', create_user),
    url(r'^account/current', current_user),
    url(r'^account/update', update_user),
    url(r'^account/link/bibliocommons', link_bibliocommons),
    url(r'^upload/(\d+)/$', upload),
    url(r'^preferences/(?P<pref>\w+)/$', preference),
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
