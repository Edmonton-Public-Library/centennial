from tastypie.authentication import Authentication
from tastypie.authorization import DjangoAuthorization
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from tastypie import fields

from hyquest.models import QuestSet, Quest, Task

class GameAuthentication(Authentication):
    """
    checks the user is authenticated through a session
    """

    def is_authenticated(self, request, **kwargs):
        return request.user.is_authenticated()

class QuestSetResource(ModelResource):
    class Meta:
        queryset = QuestSet.objects.all()
        filtering = {"name": ALL}

class QuestResource(ModelResource):
    class Meta:
        queryset = Quest.objects.all()
        filtering = {"name": ALL,
                     "questset": ALL}

class TaskResource(ModelResource):
    class Meta:
        queryset = Task.objects.all()
        filtering = {"name": ALL,
                     "quest": ALL}