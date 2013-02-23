from django.shortcuts import render_to_response
from django.template.loader import get_template
from django.template import Context
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

import epl.settings
import util
import util.email.email_template
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

def accountActivate(request):
    if request.method == 'GET':
        # i should only have one parameter
        if len(request.GET) != 1:
            return HttpResponse(stats='501')

        activationKey = request.GET.get('key', None)
        # make sure that  i had the correct parameter
        if activationKey is None:
            return HttpResponse(status='501')

        #need to connect to backed to verify the key and activate the account if
        #successful
        parseResult = urlparse.parse_qs(request.META['QUERY_STRING'])
        activationKey = parseResult['key'][0]
        emailAndTime = util.email.email_template.aesDecrypt(activationKey)
        split = emailAndTime.partition('=')
        email = split[0]
        time = split[2]

        user = None
        try:
            user = User.objects.get(email=email)
        except DoesNotExist:
            return HttpResponse("A user with email address %s does not exist!" % (email))
        if not user.is_active:
            user.is_active = True
            user.save()
            return HttpResponse("Your account %s created at %s has been successfully activated" % (email, time))
        else:
            return HttpResponse("Your account was already activated")

    else:
        return HttpResponse(status='501')

def login_user(request):
    """
    View used to create a user cookie to maintain a session.
    """
    # TODO: Remove login.html with GET requests once the timemap section handles logins
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

def logout_user(request):
    """
    View to close out the user's session.
    """
    logout(request)
    return HttpResponse()
