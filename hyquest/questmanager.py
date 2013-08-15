from hyquest.models import QuestSet, UserQuestSetAction
from hyquest.actionmanager import beginQuestSet
from hyquest.constants import MAX_ACTIVE_QUESTS

import time
# Here are the methods used to ensure proper quest flow for users
# These are called for each user whenever the dashboard is loaded

def replenishQuestSets(user):
    activeQuests = UserQuestSetAction.objects.filter(user=user, questset__featured=False, questset__active=True).count()
    if(activeQuests < MAX_ACTIVE_QUESTS):
        #Get all completed quests
        completed = UserQuestSetAction.objects.filter(user=user, complete=True).values_list('questset', flat=True)
        #filter quest sets where dependancies are met or dependancies are null
        newquests = QuestSet.objects.filter(depends_on__in=completed, active=True) | QuestSet.objects.filter(depends_on__isnull=True, active=True)
        #filter out quest sets which have an action
        withactions = UserQuestSetAction.objects.filter(user=user).values_list('questset', flat=True)
        newquests = newquests.exclude(id__in=withactions)
        for newquest in newquests:
            if activeQuests >= MAX_ACTIVE_QUESTS:
                return

            beginQuestSet(user, newquest)
            activeQuests += 1
        time.sleep(1)


def activateFeaturedQuestSets(user):
    for questset in QuestSet.objects.filter(featured=True):
        if not UserQuestSetAction.objects.filter(user=user, questset=questset).exists():
            beginQuestSet(user, questset)

