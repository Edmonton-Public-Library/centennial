from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from tastypie import fields
from django.db.models.query_utils import Q

from hyquest.models import QuestSet, Quest, Task, UserTaskAction, UserQuestAction, UserQuestSetAction, Level

# This class handles the creation of a read-only API for getting information about hyquest-related models

class QuestSetResource(ModelResource):
    quests = fields.ToManyField('hyquest.api.QuestResource', 'quest_set', full=True)
    class Meta:
        queryset = QuestSet.objects.all()
        resource_name = 'questset'
        fields = ['featured', 'id', 'title', 'description', 'points']
        filtering = {'featured': ALL}
        allowed_methods = ['get']
    user = None
    def get_object_list(self, request):
        self.user = request.user
        return QuestSet.objects.filter(Q(userquestsetaction__user=request.user, active=True) | \
                                       Q(userquestsetaction__user=request.user, userquestsetaction__complete=True) | \
                                       Q(featured=True, active=True)).distinct()
    def build_filters(self, filters=None):
        if filters is None:
            filters = {}
        orm_filters = super(QuestSetResource, self).build_filters(filters)
        if 'featured' in filters:
            orm_filters['featured__exact'] = True
            #orm_filters['userquestsetaction__user'] = self.user
            #orm_filters['userquestsetaction__complete'] = False
        if 'active' in filters:
            orm_filters['featured__exact'] = False
            orm_filters['userquestsetaction__user'] = self.user
            orm_filters['userquestsetaction__complete'] = False
        if 'complete' in filters:
            orm_filters['userquestsetaction__user'] = self.user
            orm_filters['userquestsetaction__complete'] = True
        return orm_filters

    def dehydrate(self, bundle):
        try:
            ua = UserQuestSetAction.objects.get(questset=bundle.obj, user=bundle.request.user)
            bundle.data['complete'] = ua.complete
            bundle.data['date_completed'] = ua.completionTime
        except Exception:
            bundle.data['complete'] = False
        return bundle

class QuestResource(ModelResource):
    #questset = fields.ForeignKey(QuestSetResource, 'quest_set', full=True)
    tasks = fields.ToManyField('hyquest.api.TaskResource', 'task_set', full=True)
    class Meta:
        queryset = Quest.objects.filter(quest_set__active=True)
        resource_name = 'quest'
        filtering = {"questset": ALL_WITH_RELATIONS}
        fields = ['id', 'title', 'points']
        allowed_methods = ['get']
    def dehydrate(self, bundle):
        try:
            ua = UserQuestAction.objects.get(quest=bundle.obj, user=bundle.request.user)
            bundle.data['complete'] = ua.complete
        except Exception:
            bundle.data['complete'] = False
        return bundle

class TaskResource(ModelResource):
    #quest = fields.ForeignKey(QuestResource, 'quest')
    class Meta:
        queryset = Task.objects.filter(quest__quest_set__active=True)
        resource_name = 'task'
        filtering = {"quest": ALL_WITH_RELATIONS}
        fields = ['id', 'title', 'type', 'points']
        allowed_methods = ['get']
    def dehydrate(self, bundle):
        try:
            ua = UserTaskAction.objects.get(task=bundle.obj, user=bundle.request.user)
            bundle.data['complete'] = ua.complete
        except Exception:
            bundle.data['complete'] = False
        return bundle

class LevelResource(ModelResource):

    class Meta:
        queryset = Level.objects.all()
        fields = ['level_name', 'required_exp']
        resource_name = 'level'
        allowed_methods = ['get']
    def dehydrate(self, bundle):
        required_exp = int(bundle.data['required_exp'])
        nextexp = 0
        try:
            nextexp = Level.objects.filter(required_exp__gt=required_exp).order_by('required_exp')[0].required_exp
        except IndexError:
            pass
        bundle.data['exp_total'] = nextexp - required_exp
        bundle.data['start_exp'] = required_exp
        bundle.data['end_exp'] = nextexp
        del bundle.data['required_exp']
        return bundle
