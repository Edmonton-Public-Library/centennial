from tastypie.authentication import Authentication
from tastypie.authorization import DjangoAuthorization
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from tastypie import fields
from taggit.models import Tag
from django.contrib.auth.models import User

from timemap.models import Branch, Story
from timemap.constants import STORY_RESOURCE_LIMIT

class StoryAuthentication(Authentication):
    """
    Authenticates everyone if the request is GET, otherwise
    checks the user is authenticated through a session
    """

    def is_authenticated(self, request, **kwargs):
        if request.method == 'GET':
            return True
        return request.user.is_authenticated()

class TagResource(ModelResource):
    class Meta:
        queryset = Tag.objects.all()
        filtering = {"name": ALL}

class BranchResource(ModelResource):
    class Meta:
        queryset = Branch.objects.all()
        resource_name = "branch"
        allowed_methods = ['get']
        filtering = {"name": ['contains'],
                     "start_year": ['exact', 'gt', 'gte', 'lt', 'lte'],
                     "end_year": ['exact', 'gt', 'gte', 'lt', 'lte']
                    }
class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'
        fields = ["id"]

class StoryResource(ModelResource):
    """
    Modifications to allow tag support taken and modified from:
    https://gist.github.com/joshbohde/1702293
    """
    branch = fields.ForeignKey(BranchResource, 'branch')
    user = fields.ForeignKey(UserResource, 'user')
    keywords = fields.ListField()

    class Meta:
        queryset = Story.objects.filter(public_approved=True)
        resource_name = "story"
        always_return_data = True
        max_limit = STORY_RESOURCE_LIMIT
        allowed_methods = ['get', 'post']
        #TODO:  This removes authorization. Currently setup like this to allow
        #       testing. Should be removed as soon as Users and sessions are setup
        authentication = StoryAuthentication()
        authorization = DjangoAuthorization()
        filtering = {"keywords": ALL_WITH_RELATIONS,
                     "branch": ALL_WITH_RELATIONS,
                     "title": ['icontains'],
                     "description": ['icontains'],
                     "year": ['exact', 'gt', 'gte', 'lt', 'lte'],
                     "month": ['exact', 'gt', 'gte', 'lt', 'lte'],
                     "day": ['exact', 'gt', 'gte', 'lt', 'lte'],
                    }
        excludes = ['public_approved']


    def build_filters(self, filters=None):
        if filters is None:
            filters = {}

        orm_filters = super(StoryResource, self).build_filters(filters)

        if 'keyword' in filters:
            orm_filters['keywords__name__in'] = [k.lower() for k in filters['keyword'].split(',')]
        return orm_filters

    def dehydrate_keywords(self, bundle):
        """
        Converts Tag objects to simple strings for use on the
        front end.
        """
        return map(str, bundle.obj.keywords.all())

    def save_m2m(self, bundle):
        """
        Sets the tags of the story acording to the given keywords argument
        """
        keywords = bundle.data.get('keywords', [])
        keywords = [k.lower() for k in keywords]
        bundle.obj.keywords.set(*keywords)
        return super(StoryResource, self).save_m2m(bundle)

    def hydrate(self, bundle):
        """
        Sets the user of the story to be the currently logged in
        user. At this point Authentication has already been done, so
        we are guaranteed the request contains a user object.
        """
        bundle.data['user'] = "/api/v1/user/%d/" % bundle.request.user.id
        return bundle
