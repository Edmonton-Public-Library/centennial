from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django import forms

from hyquest.models import Task
from timemap.models import Story

# This generates the form that allows social task creation

class SocialTaskForm(forms.Form):
    task_id = forms.CharField(widget=forms.HiddenInput())
    share_story = forms.ModelChoiceField(queryset=Story.objects.filter(public_approved=True), required=False)

def edit_social_task(request):
    if not request.user.is_authenticated() or not request.user.is_staff:
        return HttpResponse(status=403)
    taskid = None
    if request.method == 'POST':
        form = SocialTaskForm(request.POST)
        taskid = request.POST['task_id']
        if form.is_valid():
            #Generate the url from the story
            task = Task.objects.get(id=form.cleaned_data['task_id'])
            if form.cleaned_data['share_story']:
                task.taskinfo = "story="+str(form.cleaned_data['share_story'].id)
            else:
                task.taskinfo = ""
            task.save()
            return HttpResponseRedirect('/admin/hyquest/quest/'+str(task.quest.id)+'/')
    else:
        arguments = {'task_id': request.GET['task_id']}
        form = SocialTaskForm(arguments)
        taskid = request.GET['task_id']
    return render(request, 'admin/socialtask.html', {'form': form, 'task':Task.objects.get(id=taskid)})
