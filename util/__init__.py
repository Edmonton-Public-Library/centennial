import json
import mimetypes
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.http import HttpResponse, HttpResponseBadRequest

import util.file_validator

def gen_json_badrrequest_response(error):
    return HttpResponseBadRequest(json.dumps({'errors': error}), content_type='application/json')

def validate_media_upload(request, story_id):
    # Circular dependencies :(
    from timemap.models import Story
    from timemap.forms import UploadForm
    from timemap.constants import API_EXTENSIONS, API_MIME_TYPES
    form = UploadForm(request.POST, request.FILES)
    if not form.is_valid():
        return gen_json_badrrequest_response("Please supply a file with your request")

    # Check story exists
    try:
        story = Story.objects.get(pk=story_id)
    except ObjectDoesNotExist:
        return gen_json_badrrequest_response("Invalid story_id")

    story.media_file = request.FILES['up_file']

    # Check file extension and mime type is allowed
    try:
        util.file_validator.FileValidator(allowed_extensions=API_EXTENSIONS,
                                          allowed_mimetypes=API_MIME_TYPES)(story.media_file)
    except ValidationError, e:
        return HttpResponseBadRequest(json.dumps(e.messages), content_type='application/json')

    # Update story
    try:
        story.save()
    except ValidationError, e:
        errors = [m[0] for m in e.message_dict.values()]
        return gen_json_badrrequest_response('\n'.join(errors))
    return HttpResponse()
