from django.contrib import admin
from timemap.models import Branch, Story, Map, TimemapPreferences
from preferences.admin import PreferencesAdmin
from django.contrib.sites.models import Site

admin.site.unregister(Site)

admin.site.register(Branch)
admin.site.register(Story)
admin.site.register(Map)
admin.site.register(TimemapPreferences, PreferencesAdmin)
