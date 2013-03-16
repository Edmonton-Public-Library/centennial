from django.contrib import admin
from timemap.models import Branch, Story, Map, TimemapPreferences
from preferences.admin import PreferencesAdmin
from django.contrib.sites.models import Site

admin.site.unregister(Site)

class StoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'branch', 'content_type', 'year',)
    list_filter = ['year', 'public_approved']
    search_fields = ['title']

admin.site.register(Branch)
admin.site.register(Story, StoryAdmin)
admin.site.register(Map)
admin.site.register(TimemapPreferences, PreferencesAdmin)
