from django.shortcuts import render_to_response
from django.template.loader import get_template
from django.template import Context
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from centennial.models import BibliocommonsLink
from centennial.bibliocommons import validUser
import epl.settings
import util
import util.email.email_template
import urlparse
import json


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
    if request.method == "POST":
        data = None
        try:
            data = json.loads(request.raw_post_data)
        except ValueError:
            return HttpResponse(status='400')
        if 'username' in data and 'password' in data:
            username = data['username']
            password = data['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return HttpResponse(status='200')
    return HttpResponse(status="401")

def logout_user(request):
    """
        View to close out the user's session.
    """
    logout(request)
    return HttpResponse()

def create_user(request):
    """
        Verifies information and creates a user
    """
    if request.method == "GET":
        return HttpResponse(status='501')
    if request.method == "POST":
        #check for all required fields
        data = None
        try:
            data = json.loads(request.raw_post_data)
        except ValueError:
            return HttpResponse(status='400')
        if ('username' in data and
           'password' in data and
           'firstname' in data and
           'lastname' in data and
           'email' in data):
            #Perform data integrity verification
            if User.objects.filter(username=data['username']).count() == 0:
                user = User.objects.create_user(username = data['username'],
                                                password = data['password'],
                                                email = data['email'])
                user.first_name = data['firstname']
                user.last_name = data['lastname']
                user.save()
                return HttpResponse(status='201')
            else:
                return HttpResponse(status='409')
        return HttpResponse(status='400')

def current_user(request):
    """
        Returns information about the current user, if any
    """
    if request.user.is_authenticated():
        bibliolink = BibliocommonsLink.objects.filter(user=request.user).count() != 0
        facebooklink = request.user.social_auth.filter(provider='facebook').count() != 0
        userinfo = { "username": request.user.username, "firstname": request.user.first_name, "lastname": request.user.last_name, "email": request.user.email, "bibliolink" : bibliolink, "facebooklink" : facebooklink}
        return HttpResponse(json.dumps(userinfo), content_type='application/json')
    return HttpResponse(status='403')

def link_bibliocommons(request):
    """
        Links a bibliocommons account to an existing user account, given valid credentials
    """
    if request.method == "POST":
        data = None
        try:
            data = json.loads(request.raw_post_data)
        except ValueError:
            return HttpResponse(status='400')
            
        if request.user.is_authenticated():
            if ('username' in data and 'password' in data):
                if validUser(data['username'], data['password']):
                    link = BibliocommonsLink.objects.create(biblioname=data['username'], user=request.user)
                    link.save()
                    return HttpResponse(json.dumps({'result':'success'}, content_type='application/json'))
                else:
                    return HttpResponse(json.dumps({'result':'Error: Invalid Username or Password'}, content_type='application/json'))
            else:
                return HttpResponse(status='400')
        else:
            return HttpResponse(status='403')
    return HttpResponse(status='501')

def update_user(request):
    if not request.user.is_authenticated():
        return HttpResponse(status='403')
    if request.method != "POST":
        return HttpResponse(status='400')
    data = None
    try:
        data = json.loads(request.raw_post_data)
    except ValueError:
        return HttpResponse(status='400')        
    if 'firstname' in data:
        request.user.first_name = data['firstname']
    if 'lastname' in data:
        request.user.last_name = data['lastname']
    if 'oldpassword' in data:
        if authenticate(request.user.username, data['oldpassword']):
            if email in data:
                request.user.email = data['email']
            if 'newpassword' in data:
                request.user.set_password(data['newpassword'])
        else:
            return HttpResponse(status='403')
    request.user.save()
    return HttpResponse(status='200')