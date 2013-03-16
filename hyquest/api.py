from tastypie.authentication import Authentication
from tastypie.authorization import DjangoAuthorization
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from tastypie import fields
from django.db.models.query_utils import Q

from hyquest.models import QuestSet, Quest, Task, UserTaskAction, UserQuestAction, UserQuestSetAction


class QuestSetResource(ModelResource):
    class Meta:
        queryset = QuestSet.objects.all()
        resource_name = 'questset'
        fields = ['id', 'title', 'description', 'points']

    def get_object_list(self, request):
        return QuestSet.objects.filter(Q(userquestsetaction__user=request.user, active=True) |
                                       Q(userquestsetaction__user=request.user, userquestsetaction__complete=True) |
                                       Q(featured=True, active=True))

    def dehydrate(self, bundle):
        try:
            ua = UserQuestSetAction.objects.get(questset=bundle.obj)
            bundle.data['complete'] = ua.complete
        except Exception:
            bundle.data['complete'] = False
        return bundle

class QuestResource(ModelResource):
    questset = fields.ForeignKey(QuestSetResource, 'quest_set')
    class Meta:
        queryset = Quest.objects.filter(quest_set__active=True)
	resource_name = 'quest'
        filtering = {"questset": ALL_WITH_RELATIONS}
        fields = ['id', 'title', 'points']
    def dehydrate(self, bundle):
        try:
            ua = UserQuestAction.objects.get(quest=bundle.obj)
            bundle.data['complete'] = ua.complete
        except Exception:
            bundle.data['complete'] = False
        return bundle

class TaskResource(ModelResource):
    quest = fields.ForeignKey(QuestResource, 'quest')
    class Meta:
        queryset = Task.objects.filter(quest__quest_set__active=True)
	resource_name = 'task'
        filtering = {"quest": ALL_WITH_RELATIONS}
        fields = ['id', 'title', 'type', 'points']

    def dehydrate(self, bundle):
        try:
            ua = UserTaskAction.objects.get(task=bundle.obj)
            bundle.data['complete'] = ua.complete
        except Exception:
            bundle.data['complete'] = False
        return bundle
