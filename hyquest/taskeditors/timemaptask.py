from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django import forms
from django.core.exceptions import ValidationError

from hyquest.models import Task, Branch, Story

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
                arguments['on_map'] = taskinfo['onMap'] == "True"
            else:
                arguments['on_map_enabled'] = False
            print arguments
        except Exception, e:
            print e
        form = TimeMapTaskForm(arguments)
        print form.as_p()
    return render(request, 'admin/timemaptask.html', {'tmform': form, 'task': task})