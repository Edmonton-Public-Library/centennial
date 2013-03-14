from tastypie.authentication import Authentication
from tastypie.authorization import DjangoAuthorization
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS

from hyquest.models import QuestSet, Quest, Task, UserTaskAction, UserQuestAction, UserQuestSetAction

class FeaturedQuestSetResource(ModelResource):
    class Meta:
        queryset = QuestSet.objects.filter(featured=True, active=True)
	resource_name = 'featured'
        # filtering = {"name": ALL}
    def dehydrate(self, bundle):
        try:
            ua = UserQuestSetAction.objects.get(questset=bundle.obj)
            bundle.data['complete'] = ua.complete
        except Exception:
            bundle.data['complete'] = False
        return bundle

class ActiveQuestSetResource(ModelResource):
    class Meta:
        resource_name = 'active'

    def get_object_list(self, request):
        return QuestSet.objects.filter(userquestsetaction__user=request.user, userquestsetaction__complete=False, active=True)

class CompleteQuestSetResource(ModelResource):
    class Meta:
        resource_name = 'complete'
            
    def get_object_list(self, request):
        return QuestSet.objects.filter(userquestsetaction__user=request.user, userquestsetaction__complete=True, active=True)

class QuestResource(ModelResource):
    class Meta:
        queryset = Quest.objects.all()
	resource_name = 'quest'
        filtering = {"quest_set": ALL}
    def dehydrate(self, bundle):
        try:
            ua = UserQuestAction.objects.get(quest=bundle.obj)
            bundle.data['complete'] = ua.complete
        except Exception:
            bundle.data['complete'] = False
        return bundle

class TaskResource(ModelResource):
    class Meta:
        queryset = Task.objects.all()
	resource_name = 'task'
        filtering = {"quest": ALL}
        fields = ['title', 'type', 'points']

    def dehydrate(self, bundle):
        try:
            ua = UserTaskAction.objects.get(task=bundle.obj)
            bundle.data['complete'] = ua.complete
        except Exception:
            bundle.data['complete'] = False
        return bundle
