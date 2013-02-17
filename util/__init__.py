import json
from django.http import HttpResponse, HttpResponseBadRequest

def gen_json_badrrequest_response(error):
    return HttpResponseBadRequest(json.dumps({'errors': error}), content_type='application/json')
