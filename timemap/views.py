from django.template import Template, Context
from django.template.loader import get_template
from django.http import HttpResponse
import epl.settings

# Create your views here.
def timemap(request):
	t = get_template('timemap.html')
	return HttpResponse(t.render(Context({'STATIC_URL' : epl.settings.STATIC_URL})))