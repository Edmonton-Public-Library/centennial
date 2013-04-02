from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django import forms
from django.core.exceptions import ValidationError

from hyquest.models import Task

biblioFormats = [('BK', 'Book'), ('CD','CD'), ('DVD','DVD'), ('BOOK_CD', 'Audiobook')]

class BibliocommonsTaskForm(forms.Form):
    task_id = forms.CharField(widget=forms.HiddenInput())
    action = forms.ChoiceField(required=False, choices=[('comment', 'Comment'), ('rating',' Rating')])
    require_format = forms.BooleanField(required=False)
    format = forms.ChoiceField(required=False, choices=biblioFormats)
    require_title = forms.BooleanField(required=False)
    title = forms.CharField(required=False)
    require_author = forms.BooleanField(required=False)
    author = forms.CharField(required=False)
    require_isbn = forms.BooleanField(required=False)
    isbn = forms.CharField(required=False)


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
    return render(request, 'admin/bibliotask.html', {'tmform': form, 'task': task})
