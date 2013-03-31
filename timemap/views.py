"""
Django views to access several of the timemap utilities such as preferences,
file uploads, or the main itmemap page
"""
import json
from django.template.loader import get_template
from django.template import Context
from django.http import HttpResponse
from preferences import preferences

import epl.settings
import util

def timemap(request):
    """
    Serves main timemap application
    """
    t = get_template('timemap.html')
    return HttpResponse(t.render(Context({'STATIC_URL' : epl.settings.STATIC_URL})))

def hyq(request):
    t = get_template('hyq.html')
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

def preference(request):
    """
    Exposes timemap preferences
    """
    if request.method == 'POST':
        return HttpResponse(status="403")

    timeline_init_date = preferences.TimemapPreferences.timeline_init_date
    timeline_start_date = preferences.TimemapPreferences.timeline_start_date
    timeline_end_date = preferences.TimemapPreferences.timeline_end_date
    prefs = {"timeline_init_date" : {"year": timeline_init_date.year,
                                     "month": timeline_init_date.month,
                                     "day": timeline_init_date.day
                                    },
            "timeline_start_date" : {"year": timeline_start_date.year,
                                    "month": timeline_start_date.month,
                                    "day": timeline_start_date.day
                                   },
            "timeline_end_date" : {"year": timeline_end_date.year,
                                    "month": timeline_end_date.month,
                                    "day": timeline_end_date.day
                                   },
            "base_url" : preferences.TimemapPreferences.base_url
            }
    return HttpResponse(json.dumps(prefs), content_type='application/json')
