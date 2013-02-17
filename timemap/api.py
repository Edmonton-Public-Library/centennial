from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from tastypie import fields
from tastypie.authorization import Authorization
from taggit.models import Tag

from timemap.models import Branch, Story
from timemap.constants import STORY_RESOURCE_LIMIT


class TagResource(ModelResource):
    class Meta:
        queryset = Tag.objects.all()
        filtering = {"name": ALL}

class BranchResource(ModelResource):
    class Meta:
        queryset = Branch.objects.all()
        resource_name = "branch"
        allowed_methods = ['get']

class StoryResource(ModelResource):
    """
    Modifications to allow tag support taken and modified from:
    https://gist.github.com/joshbohde/1702293
    """
    branch = fields.ForeignKey(BranchResource, 'branch')
    keywords = fields.ListField()

    class Meta:
        queryset = Story.objects.all()
        resource_name = "story"
        max_limit = STORY_RESOURCE_LIMIT
        #TODO:  This removes authorization. Currently setup like this to allow
        #       testing. Should be removed as soon as Users and sessions are setup
        authorization = Authorization()
        filtering = {"keywords" : ALL_WITH_RELATIONS}

    def build_filters(self, filters=None):
        if filters is None:
            filters = {}

        orm_filters = super(StoryResource, self).build_filters(filters)

        if 'keyword' in filters:
            orm_filters['keywords__name__in'] = [k.lower() for k in filters['keyword'].split(',')]
        return orm_filters

    def dehydrate_keywords(self, bundle):
        return map(str, bundle.obj.keywords.all())

    def save_m2m(self, bundle):
        keywords = bundle.data.get('keywords', [])
        keywords = [k.lower() for k in keywords]
        bundle.obj.keywords.set(*keywords)
        return super(StoryResource, self).save_m2m(bundle)
