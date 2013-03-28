from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django import forms
from django.core.exceptions import ValidationError
import random

from timemap.models import Branch, Story
from hyquest.models import Task, TaskCode

biblioFormats = [('BK', 'Book'), ('CD','CD'), ('DVD','DVD'), ('BOOK_CD', 'Audiobook')]

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
    code = ''.join(random.choice('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ') for i in range(16))
    if TaskCode.objects.filter(code=code).count() > 0:
        return genRandomCode()
    return code

class TimeMapTaskForm(forms.Form):
    task_id = forms.CharField(widget=forms.HiddenInput())
    visit_story = forms.BooleanField(required=False)
    story = forms.ModelChoiceField(queryset=Story.objects.filter(public_approved=True), required=False)
    visit_branch = forms.BooleanField(required=False)
    branch = forms.ModelChoiceField(queryset=Branch.objects.all(), required=False)
    minimum_year_enabled = forms.BooleanField(required=False)
    minimum_year = forms.IntegerField(required=False)
    maximum_year_enabled = forms.BooleanField(required=False)
    maximum_year = forms.IntegerField(required=False)
    on_map_enforced = forms.BooleanField(required=False)
    on_map = forms.BooleanField(required=False)

    def clean_story(self):
        if self.cleaned_data['visit_story'] and not self.cleaned_data['story']:
            raise ValidationError("You must select a Story or disable Story detection")
        return self.cleaned_data['story']

    def clean_branch(self):
        if self.cleaned_data['visit_branch'] and not self.cleaned_data['branch']:
            raise ValidationError("You must select a Branch or disable Branch detection")
        return self.cleaned_data['branch']

    def clean_minimum_year(self):
        if self.cleaned_data['minimum_year_enabled'] and not self.cleaned_data['minimum_year']:
            raise ValidationError("You must select a Minimum Year or disable Minimum Year detection")
        return self.cleaned_data['minimum_year']

    def clean_maximum_year(self):
        if self.cleaned_data['maximum_year_enabled'] and not self.cleaned_data['maximum_year']:
            raise ValidationError("You must select a Maximum Year or disable Maximum Year detection")
        return self.cleaned_data['maximum_year']

def edit_timemap_task(request):
    if not request.user.is_authenticated() or not request.user.is_staff:
        return HttpResponse(status=403)
    
    if request.method == "POST":
        form = TimeMapTaskForm(request.POST)
        if form.is_valid():
            taskinfo = ""
            if form.cleaned_data['visit_story']:
                taskinfo += "story="+str(form.cleaned_data['story'].id)+";"
            if form.cleaned_data['visit_branch']:
                taskinfo += "branch="+str(form.cleaned_data['branch'].id)+";"
            if form.cleaned_data['minimum_year_enabled']:
                taskinfo += "minYear="+str(form.cleaned_data['minimum_year'])+";"
            if form.cleaned_data['maximum_year_enabled']:
                taskinfo += "maxYear="+str(form.cleaned_data['maximum_year'])+";"
            if form.cleaned_data['on_map_enforced']:
                taskinfo += "onMap="+str(form.cleaned_data['on_map'])+";"
                
            task = Task.objects.get(id=form.cleaned_data['task_id'])
            task.taskinfo = taskinfo
            task.save()
            return HttpResponseRedirect('/admin/hyquest/quest/'+str(task.quest.id)+'/')
        else:
            task = Task.objects.get(id=request.POST['task_id'])

    else:
        arguments = {'task_id':request.GET['task_id']}
        task = Task.objects.get(id=request.GET['task_id'])
        taskinfo = task.getInfoReqs()
        print taskinfo
        try:
            if('story' in taskinfo):
                arguments['visit_story'] = True
                arguments['story'] = int(taskinfo['story'])
            else:
                arguments['visit_story'] = False
            if('branch' in taskinfo):
                arguments['visit_branch'] = True
                arguments['branch'] = int(taskinfo['branch'])
            else:
                arguments['visit_branch'] = False
            if('minYear' in taskinfo):
                arguments['minimum_year_enabled'] = True
                arguments['minimum_year'] = int(taskinfo['minYear'])
            else:
                arguments['minimum_year_enabled'] = False
            if('maxYear' in taskinfo):
                arguments['maximum_year_enabled'] = True
                arguments['maximum_year'] = int(taskinfo['maxYear'])
            else:
                arguments['maximum_year_enabled'] = False
            if('onMap' in taskinfo):
                arguments['on_map_enforced'] = True
                arguments['on_map'] = bool(taskinfo['onMap'])
            else:
                arguments['on_map_enabled'] = False
            print arguments
        except Exception, e:
            print e
        form = TimeMapTaskForm(arguments)
        print form.as_p()
    return render(request, 'admin/timemaptask.html', {'tmform': form, 'task': task})

class BibliocommonsTaskForm(forms.Form):
    task_id = forms.CharField(widget=forms.HiddenInput())
    action = forms.ChoiceField(required=False,choices=[('comment','Comment'),('rating','Rating')])
    require_format = forms.BooleanField(required=False)
    format = forms.ChoiceField(required=False,choices=biblioFormats)
    require_title = forms.BooleanField(required=False)
    title = forms.CharField(required=False)
    require_author = forms.BooleanField(required=False)
    author = forms.CharField(required=False)
    require_isbn = forms.BooleanField(required=False)
    isbn = forms.CharField(required=False)

    def clean_actior(self):
        if self.cleaned_data['action'] != 'comment' and self.cleaned_data['action'] != 'rating':
            raise ValidationError("Action must be comment or rating")
        return self.cleaned_data['action']

    def clean_format(self):
        if self.cleaned_data['require_format'] and not self.cleaned_data['format']:
            raise ValidationError("You must select a Format or disable Format detection")
        return self.cleaned_data['format']

    def clean_title(self):
        if self.cleaned_data['require_title'] and not self.cleaned_data['title']:
            raise ValidationError("You must specify a Title or disable Title detection")
        return self.cleaned_data['title']

    def clean_author(self):
        if self.cleaned_data['require_author'] and not self.cleaned_data['author']:
            raise ValidationError("You must specify at least one Author or disable Author detection")
        return self.cleaned_data['author']

    def clean_isbn(self):
        if self.cleaned_data['require_isbn'] and not self.cleaned_data['isbn']:
            raise ValidationError("You must specify at least one ISBN or disable ISBN detection")
        return self.cleaned_data['isbn']

def edit_bibliocommons_task(request):
    if not request.user.is_authenticated() or not request.user.is_staff:
        return HttpResponse(status=403)
    
    if request.method == "POST":
        form = BibliocommonsTaskForm(request.POST)
        if form.is_valid():
            taskinfo = ""
            if form.cleaned_data['action']:
                taskinfo += "action="+form.cleaned_data['action']+";"
            if form.cleaned_data['require_format']:
                taskinfo += "format="+form.cleaned_data['format']+";"
            if form.cleaned_data['require_title']:
                taskinfo += "title="+form.cleaned_data['title']+";"
            if form.cleaned_data['require_author']:
                taskinfo += "author="+form.cleaned_data['author']+";"
            if form.cleaned_data['require_isbn']:
                taskinfo += "isbn="+form.cleaned_data['isbn']+";"
                
            task = Task.objects.get(id=form.cleaned_data['task_id'])
            task.taskinfo = taskinfo
            task.save()
            return HttpResponseRedirect('/admin/hyquest/quest/'+str(task.quest.id)+'/')
        else:
            task = Task.objects.get(id=request.POST['task_id'])

    else:
        arguments = {'task_id':request.GET['task_id']}
        task = Task.objects.get(id=request.GET['task_id'])
        taskinfo = task.getInfoReqs()
        print taskinfo
        try:
            if('action' in taskinfo):
                arguments['action'] = taskinfo['action']
            if('format' in taskinfo):
                arguments['require_format'] = True
                arguments['format'] = taskinfo['format']
            else:
                arguments['require_format'] = False
            if('title' in taskinfo):
                arguments['require_title'] = True
                arguments['title'] = taskinfo['title']
            else:
                arguments['require_title'] = False
            if('author' in taskinfo):
                arguments['author_required'] = True
                arguments['author'] = taskinfo['author']
            else:
                arguments['author_required'] = False
            if('isbn' in taskinfo):
                arguments['require_isbn'] = True
                arguments['isbn'] = taskinfo['isbn']
            else:
                arguments['require_isbn'] = False
            print arguments
        except Exception, e:
            print e
        form = BibliocommonsTaskForm(arguments)
        print form.as_p()
    return render(request, 'admin/bibliotask.html', {'tmform': form, 'task': task})
