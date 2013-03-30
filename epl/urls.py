from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.contrib import admin
from tastypie.api import Api

from timemap.api import BranchResource, StoryResource, UserResource, SimpleBranchResource, MapResource, FeaturedStoryResource
from timemap.views import timemap, hyq, upload, preference
from centennial.views import accountActivate, login_user, logout_user, create_user, current_user, link_bibliocommons, update_user
from hyquest.api import QuestSetResource, QuestResource, TaskResource, LevelResource
from hyquest.views import submit_code_task, submit_timemap_task, submit_social_task, check_biblio_tasks, get_featured_quests, get_active_quests
from hyquest.taskeditors.codegeneration import generate_codes
from hyquest.taskeditors.timemaptask import edit_timemap_task
from hyquest.taskeditors.bibliocommonstask import edit_bibliocommons_task
from hyquest.taskeditors.socialtask import edit_social_task

admin.autodiscover()
v1_api = Api(api_name="v1")
v1_api.register(BranchResource())
v1_api.register(SimpleBranchResource())
v1_api.register(StoryResource())
v1_api.register(FeaturedStoryResource())
v1_api.register(UserResource())
v1_api.register(QuestSetResource())
v1_api.register(QuestResource())
v1_api.register(TaskResource())
v1_api.register(MapResource())
v1_api.register(LevelResource())

urlpatterns = patterns('',
    url(r'^account/login/centennial', login_user),
    url(r'account/', include('social_auth.urls')),
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/hyquest/generatecodes', generate_codes),
    url(r'^admin/hyquest/modifytimemap', edit_timemap_task),
    url(r'^admin/hyquest/modifysocial', edit_social_task),
    url(r'^admin/hyquest/modifybibliocommons', edit_bibliocommons_task),
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
    url(r'^preferences/$', preference),
    url(r'^preferences/initial_timemap_date', preference),
    url(r'^game/complete/code', submit_code_task),
    url(r'^game/complete/timemap', submit_timemap_task),
    url(r'^game/complete/social', submit_social_task),
    url(r'^game/complete/bibliocommons', check_biblio_tasks),
    url(r'^game/questsets/featured', get_featured_quests),
    url(r'^game/questsets/active', get_active_quests)
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
