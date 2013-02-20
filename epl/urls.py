from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from tastypie.api import Api

from timemap.api import BranchResource, StoryResource, UserResource
from timemap.views import timemap, upload, accountActivate
from timemap.views import timemap, upload, login_user, logout_user

admin.autodiscover()
v1_api = Api(api_name="v1")
v1_api.register(BranchResource())
v1_api.register(StoryResource())
v1_api.register(UserResource())

urlpatterns = patterns('',
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(v1_api.urls)),
    url(r'^timemap/', timemap),
    url(r'^login/', login_user),
    url(r'^logout/', logout_user),
    url(r'^upload/(\d+)/$', upload),
    url(r'^account/activate', accountActivate),
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
