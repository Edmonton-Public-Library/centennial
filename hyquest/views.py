from django.shortcuts import render_to_response
from django.template.loader import get_template
from django.template import Context
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.contrib.auth import authenticate, login, logout

import epl.settings


