from django.template.loader import get_template
from django.template import Context
from django.http import HttpResponse

import epl.settings
from timemap.models import Story
from timemap.forms import UploadForm


def timemap(request):
	t = get_template('timemap.html')
	return HttpResponse(t.render(Context({'STATIC_URL' : epl.settings.STATIC_URL})))

def upload(request):
    if request.method == 'POST':
        form = UploadForm(request.POST, request.FILES)
        if form.is_valid():
            media_file = request.FILES['up_file']
            story = Story.objects.get(pk=form.cleaned_data['story_id'])
            story.media_file = media_file
            story.save()
            return HttpResponse()
    else:
        return HttpResponse(status="501")
    return HttpResponse(status="500")
