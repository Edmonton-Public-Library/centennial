from django.conf.urls import patterns, include, url
from django.contrib import admin
from tastypie.api import Api

from timemap.api import BranchResource, StoryResource
from timemap.views import timemap

admin.autodiscover()
v1_api = Api(api_name="v1")
v1_api.register(BranchResource())
v1_api.register(StoryResource())

urlpatterns = patterns('',
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(v1_api.urls)),
    url(r'^timemap/', timemap),
)
