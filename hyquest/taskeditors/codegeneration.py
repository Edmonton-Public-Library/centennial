from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django import forms

import random

from hyquest.models import Task, TaskCode

# This generates the Form that allows for Task Code Generation

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
            generateTaskCodes(Task.objects.get(id=form.cleaned_data['task_id']), form.cleaned_data['code_count'], form.cleaned_data['uses_per_code'])
            return HttpResponseRedirect('/admin/hyquest/taskcode?task='+str(form.cleaned_data['task_id']))

    else:
        arguments = {'task_id': request.GET['task_id'], 'code_count': '1', 'uses_per_code':'1'}
        form = CodeGenForm(arguments)
        taskid = request.GET['task_id']
    return render(request, 'admin/codegen.html', {'form': form, 'task': Task.objects.get(id=taskid), 'task_id': taskid})

def generateTaskCodes(task, code_count, uses_per_code):
    codes = []
    for x in range(0, int(code_count)):
        codes.append(TaskCode(task=task, uses_remaining=int(uses_per_code), code=genRandomCode()))
    TaskCode.objects.bulk_create(codes)

def genRandomCode():
    code = ''.join(random.choice('0123456789ABCDEFGHIJKLMNPQRSTUVWXYZ') for i in range(5))
    code  += "-"
    code += ''.join(random.choice('0123456789ABCDEFGHIJKLMNPQRSTUVWXYZ') for i in range(5))
    if TaskCode.objects.filter(code=code).count() > 0:
        return genRandomCode()
    return code
