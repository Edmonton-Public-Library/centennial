import json
import mimetypes
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.http import HttpResponse, HttpResponseBadRequest

import util.file_validator

def gen_json_badrrequest_response(error):
    if not isinstance(error, list):
        error = [error]
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
        mimetype = util.file_validator.FileValidator(allowed_extensions=API_EXTENSIONS,
                                                     allowed_mimetypes=API_MIME_TYPES)(story.media_file)
    except ValidationError, e:
        story.delete()
        return gen_json_badrrequest_response(e.messages)

    if mimetype in ['image/png', 'image/jpeg', 'image/pjpeg']:
        story.content_type = "I"
    elif mimetype in  ['application/pdf']:
        story.content_type = "P"

    # Update story
    try:
        story.save()
    except ValidationError, e:
        errors = [m[0] for m in e.message_dict.values()]
        return gen_json_badrrequest_response('\n'.join(errors))
    return HttpResponse()

def gen_story_stats():
    from timemap.models import Story
    counts = {}
    for story in Story.objects.all():
        branch_count = counts.setdefault(story.branch.name, {})
        branch_count.setdefault(story.year, 0)
        branch_count[story.year] += 1
    with open("media/stats.json", 'w') as f:
        f.write(json.dumps(counts))
    return counts
