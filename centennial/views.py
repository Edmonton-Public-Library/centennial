from django.http import HttpResponse, HttpResponseRedirect
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from centennial.models import BibliocommonsLink
from centennial.bibliocommons import validUser
from centennial.recaptcha import verifyReCaptcha
from hyquest.models import Level
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

        user = None
        try:
            user = User.objects.get(email=email)
        except ObjectDoesNotExist:
            return HttpResponse("A user with email address %s does not exist!" % (email))
        if not user.is_active:
            user.is_active = True
            user.save()
            return HttpResponseRedirect('/timemap/#emailConfirmation')
        else:
            return HttpResponseRedirect("/timemap/#emailReconfirm")

    else:
        return HttpResponse(status='501')

def login_user(request):
    """
        View used to create a user cookie to maintain a session.
    """
    print "w00t"
    if request.method == "POST":
        data = None
        try:
            data = json.loads(request.raw_post_data)
            print data
        except ValueError, e:
            print e
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
           'email' in data and
            'recaptcha_challenge' in data and
            'recaptcha_response' in data):
            #Perform ReCaptcha Verification
            captchaValid = verifyReCaptcha(request, data['recaptcha_challenge'], data['recaptcha_response'])
            if not captchaValid[0]:
                return HttpResponse(captchaValid[1], status='400')
            #Perform data integrity verification
            if User.objects.filter(username=data['username']).count() == 0:
                user = User.objects.create(username = data['username'], email = data['email'], is_active = False)
                user.first_name = data['firstname']
                user.last_name = data['lastname']
                user.save()
                user.set_password(data['password'])
                user.save()
                return HttpResponse(status='201')
            else:
                return HttpResponse(status='409')
        #print("Bad POST data:" + request.raw_post_data)
        return HttpResponse(status='400')

def current_user(request):
    """
        Returns information about the current user, if any
    """
    if request.user.is_authenticated():
        bibliolink = BibliocommonsLink.objects.filter(user=request.user).count() != 0
        facebooklink = request.user.social_auth.filter(provider='facebook').count() != 0
        level = Level.objects.filter(required_exp__lte=request.user.profile.points).latest('required_exp')
        userinfo = { "username": request.user.username, "firstname": request.user.first_name, "lastname": request.user.last_name, "email": request.user.email, "bibliolink" : bibliolink, "facebooklink" : facebooklink, "points": request.user.profile.points, "level": level.id}
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
                    if BibliocommonsLink.objects.filter(biblioname=data['username']).count() > 0:
                        return HttpResponse(json.dumps({'result': 'Error: Bibliocommons account already linked'}))
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
        if authenticate(username=request.user.username, password=data['oldpassword']):
            if 'email' in data:
                request.user.email = data['email']
            if 'newpassword' in data:
                request.user.set_password(data['newpassword'])
        else:
            return HttpResponse(status='403')
    request.user.save()
    return HttpResponse(status='200')
