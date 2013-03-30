from django.contrib import admin
from hyquest.models import QuestSet, Quest, Task, TaskCode
from django import forms
from django.shortcuts import render
from hyquest.constants import TASK_CHOICES

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
    list_display = ['title', 'active', 'points', 'depends_on']
    list_filter = ['active', 'featured']

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
    readonly_fields = ['quest_set']
admin.site.register(QuestSet, QuestSetAdmin)
admin.site.register(Quest, QuestAdmin)

class TaskCodeAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return False
        
    def print_task_codes(self, request, queryset):
        return render(request, 'admin/printcodes.html', {'queryset':queryset})
    print_task_codes.short_description = "Print Selected Task Completion Codes"
    
    list_display = ['task', 'code', 'uses_remaining']
    list_filter = ['uses_remaining']
    actions = [print_task_codes]


admin.site.register(TaskCode, TaskCodeAdmin)
