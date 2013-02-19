from django.shortcuts import render_to_response
from django.template.loader import get_template
from django.template import Context
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.contrib.auth import authenticate, login

import epl.settings
import util
from timemap.models import Story
from timemap.forms import UploadForm


def timemap(request):
    t = get_template('timemap.html')
    return HttpResponse(t.render(Context({'STATIC_URL' : epl.settings.STATIC_URL})))

def upload(request, story_id):
    if request.method == 'POST':
        form = UploadForm(request.POST, request.FILES)
        if form.is_valid():
            media_file = request.FILES['up_file']
            try:
                story = Story.objects.get(pk=story_id)
            except ObjectDoesNotExist:
                return util.gen_json_badrrequest_response("Invalid story_id")
            story.media_file = media_file
            try:
                story.save()
            except ValidationError, e:
                errors = [m[0] for m in e.message_dict.values()]
                return util.gen_json_badrrequest_response('\n'.join(errors))
            return HttpResponse()
    else:
        return HttpResponse(status="501")
    return HttpResponse(status="500")

def login_user(request):
    if request.method == "GET":
        return render_to_response('login.html')
    if request.method == "POST" and 'username' in request.POST and 'password' in request.POST:
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return HttpResponse()
            else:
                util.gen_json_badrrequest_response("Disabled Account")
    else:
        return HttpResponse(status="401")
