"""
Modifications for the Django Admin module to improve the timemap
application
"""
from django.contrib import admin
from timemap.models import Branch, Story, Map, TimemapPreferences, FeaturedStory
from preferences.admin import PreferencesAdmin
from django.contrib.sites.models import Site

admin.site.unregister(Site)

class StoryAdmin(admin.ModelAdmin):
    """
    Adds the ability to filter stories in the admin page
    """
    list_display = ('title', 'branch', 'content_type', 'year',)
    list_filter = ['year', 'public_approved']
    search_fields = ['title']

class FeaturedStoryAdmin(admin.ModelAdmin):
    """
    Adds the ability to filter featured stories in the admin page
    """
    raw_id_fields = ("story",)

admin.site.register(Branch)
admin.site.register(Story, StoryAdmin)
admin.site.register(Map)
admin.site.register(TimemapPreferences, PreferencesAdmin)
admin.site.register(FeaturedStory, FeaturedStoryAdmin)
