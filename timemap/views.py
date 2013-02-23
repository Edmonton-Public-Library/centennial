from django.shortcuts import render_to_response
from django.template.loader import get_template
from django.template import Context
from django.http import HttpResponse

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


