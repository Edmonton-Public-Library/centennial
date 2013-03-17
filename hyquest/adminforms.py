from django.shortcuts import render
from django.http import HttpResponse
from django import forms
import random

from hyquest.models import Task, TaskCode

class CodeGenForm(forms.Form):
    task_id = forms.CharField(widget=forms.HiddenInput())
    code_count = forms.IntegerField(initial=1)
    uses_per_code = forms.IntegerField(initial=1)

def generate_codes(request):
    if not request.user.is_authenticated() or not request.user.is_staff:
        return HttpResponse(status=403)
    taskid = None
    if request.method == 'POST':
        form = CodeGenForm(request.POST)
        taskid = request.POST['task_id']
        if form.is_valid():
            # Create the codes
            return HttpResponse(
                generateTaskCodes(
                    Task.objects.get(id=form.cleaned_data['task_id']), 
                                     form.cleaned_data['code_count'], 
                                     form.cleaned_data['uses_per_code']))
    else:
        arguments = {'task_id': request.GET['task_id'], 'code_count': '1', 'uses_per_code':'1'}
        form = CodeGenForm(arguments)
        taskid = request.GET['task_id']
    return render(request, 'codegen.html', {'form': form, 'task': Task.objects.get(id=taskid)})

def generateTaskCodes(task, code_count, uses_per_code):
    codes = ""
    for x in range(0, int(code_count)):
        taskcode = TaskCode.objects.create(task=task, uses_remaining=int(uses_per_code), code=genRandomCode())
        taskcode.save()
        codes += taskcode.code + '<br>'
    return codes

def genRandomCode():
    code = ''.join(random.choice('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ') for i in range(16))
    if TaskCode.objects.filter(code=code).count() > 0:
        return genRandomCode()
    return code
