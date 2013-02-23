from django.contrib import admin
from django import forms
from django.contrib.auth.models import User
from centennial.models import UserProfile, BibliocommonsLink

admin.site.register(UserProfile)
admin.site.register(BibliocommonsLink)

class UserForm(forms.ModelForm):
    class Meta:
        model = User

    def __init__(self, *args, **kwargs):
        super(UserForm, self).__init__(*args, **kwargs)
        self.fields['email'].required = True
        self.fields['first_name'].required = True
        self.fields['last_name'].required = True

class UserAdmin(admin.ModelAdmin):
    form = UserForm

admin.site.unregister(User)
admin.site.register(User, UserAdmin)
