from django.template.loader import get_template
from django.template import Context
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist, ValidationError

import epl.settings
import util
from timemap.models import Story
from timemap.forms import UploadForm

from Crypto.Cypher import AES

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

def accountActivate(request):
    if request.method == 'GET':
        # i should only have one parameter
        if len(request) != 1:
            return HttpResponse(status='501')

        activationKey = request.get('key', None)
        # make sure that  i had the correct parameter
        if activationKey is None:
            return HttpResponse(status='501')

        #need to connect to backed to verify the key and activate the account if
        #successful
        emailAndTime = _aesDecrypt(activationKey)

        #call activate method here

        return HttpResponse("Your account %s has been successfully activated" % (emailAndTime))
    else:
        return HttpResponse(status='501')

def _aesDecrypt(msg):
    key = b'Sixteen byte key'
    cipher = AES.new(key)
    return cipher.decrypt(msg)
