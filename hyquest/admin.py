from django.contrib import admin
from hyquest.models import QuestSet, Quest, Task
from django import forms
from hyquest.constants import TASK_CHOICES
admin.site.register(Task)

class QuestForm(forms.ModelForm):
    class Meta:
        model = Quest

class QuestInline(admin.TabularInline):
    model = Quest
    readonly_fields = ['selflink',]
    extra = 0

class QuestSetAdmin(admin.ModelAdmin):
    model = QuestSet
    inlines = [ QuestInline ]

class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        widgets = {'type': forms.Select(choices=TASK_CHOICES)}

class TaskInline(admin.TabularInline):
    model = Task
    form = TaskForm
    exclude = ['taskinfo']
    readonly_fields = ['links',]
    extra = 0

class QuestAdmin(admin.ModelAdmin):
    model = Quest
    inlines = [ TaskInline ]

admin.site.register(QuestSet, QuestSetAdmin)
admin.site.register(Quest, QuestAdmin)
