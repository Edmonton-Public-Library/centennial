from hyquest.models import QuestSet, UserQuestSetAction
from hyquest.actionmanager import beginQuestSet
from hyquest.constants import MAX_ACTIVE_QUESTS

def replenishQuestSets(user):
    activeQuests = UserQuestSetAction.objects.filter(user=user, questset__featured=False).count()
    if(activeQuests < MAX_ACTIVE_QUESTS):
        print "User "+str(user)+" needs more quests"
        #Get all completed quests
        completed = UserQuestSetAction.objects.filter(user=user, complete=True).values_list('questset', flat=True)
        #filter quest sets where dependancies are met or dependancies are null
        newquests = QuestSet.objects.filter(depends_on__in=completed) | QuestSet.objects.filter(depends_on__isnull=True)
        #filter out quest sets which have an action
        withactions = UserQuestSetAction.objects.filter(user=user).values_list('questset', flat=True)
        newquests = newquests.exclude(id__in=withactions)
        for newquest in newquests:
            if activeQuests >= MAX_ACTIVE_QUESTS:
                return

            print "Adding quest "+str(newquest)
            beginQuestSet(user, newquest)
            activeQuests += 1

def activateFeaturedQuestSets(user):
    for questset in QuestSet.objects.filter(featured=True):
        if not UserQuestSetAction.objects.filter(user=user, questset=questset).exists():
            beginQuestSet(user, questset)

