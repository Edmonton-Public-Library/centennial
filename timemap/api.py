from tastypie.resources import ModelResource
from tastypie import fields
from tastypie.authorization import Authorization

from timemap.models import Branch, Story

class BranchResource(ModelResource):
    class Meta:
        queryset = Branch.objects.all()
        resource_name = "branch"
        allowed_methods = ['get']

class StoryResource(ModelResource):
    branch = fields.ForeignKey(BranchResource, 'branch')

    class Meta:
        queryset = Story.objects.all()
        resource_name = "story"
        #TODO:  This removes authorization. Currently setup like this to allow
        #       testing. Should be removed as soon as Users and sessions are setup
        authorization = Authorization()
