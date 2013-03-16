import json
from django.shortcuts import render_to_response
from django.template.loader import get_template
from django.template import Context
from django.http import HttpResponse
from preferences import preferences

import epl.settings
import util
import urlparse
from timemap.models import Story
from timemap.forms import UploadForm

def timemap(request):
    t = get_template('timemap.html')
    return HttpResponse(t.render(Context({'STATIC_URL' : epl.settings.STATIC_URL})))

def upload(request, story_id):
    """
    Once stories are created, this view is used to attach the media file to the
    story.
    """
    if request.method == 'POST':
        return util.validate_media_upload(request, story_id)
    else:
        return HttpResponse(status="501")
    return HttpResponse(status="500")

def preference(request, pref):
    """
    Exposes timemap preferences
    """
    print pref
    if request.method == 'POST':
        return HttpResponse(status="403")
    if pref == "initial_timemap_date":
        d = preferences.TimemapPreferences.initial_timemap_date
        return HttpResponse(json.dumps({'year': d.year, 'month': d.month, 'day': d.day}), content_type='application/json')
    if hasattr(preferences.TimemapPreferences, pref):
        p = getattr(preferences.TimemapPreferences, pref)
        return HttpResponse(json.dumps({pref: str(p)}), content_type='application/json')
    else:
        return HttpResponse(status="200")
