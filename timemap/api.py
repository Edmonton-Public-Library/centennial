from tastypie.authentication import Authentication
from tastypie.authorization import DjangoAuthorization
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from tastypie import fields
from taggit.models import Tag
from django.contrib.auth.models import User
from django.db.models import Q

from timemap.models import Branch, Story, Map, FeaturedStory
from timemap.constants import STORY_RESOURCE_LIMIT
from util.story_validation import StoryValidation

CONTENT_HYDRATE = {"text" : "T",
                   "link": "L",
                   "image": "I",
                   "pdf": "P",
                   "audio": "A",
                   "video": "V",
                  }

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
        filtering = {"name": ['icontains'],
                     "start_year": ['exact', 'gt', 'gte', 'lt', 'lte'],
                     "end_year": ['exact', 'gt', 'gte', 'lt', 'lte']
                    }
        ordering = ['start_year', 'end_year']

class SimpleBranchResource(ModelResource):
    class Meta:
        queryset = Branch.objects.all()
        resource_name = "simple_branch"
        allowed_methods = ['get']
        fields = ["id", "start_year", "end_year"]
        filtering = {"start_year": ['exact', 'gt', 'gte', 'lt', 'lte'],
                     "end_year": ['exact', 'gt', 'gte', 'lt', 'lte']
                    }
        ordering = ['start_year', 'end_year']

class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'
        fields = ["id"]

class MapResource(ModelResource):
    class Meta:
        queryset = Map.objects.all()
        resource_name = 'maps'
        allowed_methods = ['get']
        fields = ['published', 'base_folder', 'start_year', 'end_year']
        ordering = ['published', 'start_year', 'end_year']

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
        authentication = StoryAuthentication()
        authorization = DjangoAuthorization()
        filtering = {"keywords": ALL_WITH_RELATIONS,
                     "branch": ALL_WITH_RELATIONS,
                     "title": ['icontains'],
                     "story_text": ['icontains', 'exact'],
                     "description": ['icontains'],
                     "year": ['exact', 'gt', 'gte', 'lt', 'lte'],
                     "month": ['exact', 'gt', 'gte', 'lt', 'lte'],
                     "day": ['exact', 'gt', 'gte', 'lt', 'lte'],
                     "content_type":['in'],
                    }
        excludes = ['public_approved']
        validation = StoryValidation()
        ordering = ['year', 'month', 'day']

    def build_filters(self, filters=None):
        if filters is None:
            filters = {}

        grouped = get_grouped_filters(filters)
        orm_filters = super(StoryResource, self).build_filters(filters)
        orm_filters['grouped'] = grouped

        if 'content_type__in' in filters:
            orm_filters['content_type__in'] = [CONTENT_HYDRATE[f] for f in filters['content_type__in'].split(',')]

        return orm_filters


    def apply_filters(self, request, applicable_filters):
        if 'grouped' in applicable_filters:
            custom = applicable_filters.pop('grouped')
        else:
            custom = None

        semi_filtered = super(StoryResource, self).apply_filters(request, applicable_filters)
        semi_filtered = semi_filtered.distinct()

        return semi_filtered.filter(custom) if custom else semi_filtered

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

    def hydrate_content_type(self, bundle):
        if bundle.data['content_type'] == 'media':
            bundle.data['content_type'] = "T"
            return bundle
        bundle.data['content_type'] = CONTENT_HYDRATE[bundle.data['content_type']]
        return bundle

    def dehydrate(self, bundle):
        if bundle.data['anonymous']:
            bundle.data['user'] = "Anonymous"
        else:
            u_pk = bundle.data['user'].split("/")[-2]
            user = User.objects.get(pk=u_pk)
            bundle.data['user'] = user.get_full_name()
        return bundle

    def dehydrate_content_type(self, bundle):
        return dict(Story.CONTENT_TYPE_CHOICES)[bundle.data['content_type']]

def get_grouped_filters(filters):
    grouped_filters = Q()

    if 'keyword' in filters:
        grouped_filters |= Q(keywords__name__in=[k.lower() for k in filters['keyword'].split(',')])
        filters.pop('keyword')

    pipe_map = lambda x, y: x | y
    if 'title__icontains' in filters:
        title_filters = [Q(title__icontains=f) for f in filters.pop('title__icontains')]
        grouped_filters |= reduce(pipe_map, title_filters)
    if 'description__icontains' in filters:
        d_filters = [Q(description__icontains= f) for f in filters.pop('description__icontains')]
        grouped_filters |= reduce(pipe_map, d_filters)
    if 'story_text__icontains' in filters:
        grouped_filters |= Q(story_text__exact="")
        story_filters = [Q(story_text__icontains=f) for f in filters.pop('story_text__icontains')]
        grouped_filters |= reduce(pipe_map, story_filters)

    return grouped_filters

class FeaturedStoryResource(ModelResource):
    story = fields.ForeignKey(StoryResource, 'story', full=True)

    class Meta:
        queryset = FeaturedStory.objects.filter(story__public_approved=True)
        resource_name = "featured"
        max_limit = STORY_RESOURCE_LIMIT
        allowed_methods = ['get']
        filtering = {"story": ALL_WITH_RELATIONS,
                    }
        ordering = ['story']

