from django import forms

class UploadForm(forms.Form):
    up_file = forms.FileField(label="file")
    story_id = forms.IntegerField()
