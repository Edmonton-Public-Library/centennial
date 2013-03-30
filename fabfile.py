from fabric.api import local
from fabric.context_managers import settings

def test():
    local('python manage.py test timemap')
    local('python manage.py test fts')

def updatedb():
    with settings(warn_only=True):
        local('python manage.py syncdb --noinput')
        local('python manage.py migrate fts')
        local('python manage.py migrate timemap')
        local('python manage.py migrate tastypie')
        local('python manage.py migrate hyquest')
        local('python manage.py migrate centennial')
        local('python manage.py migrate social_auth')

def load_manual_fixture():
    local('python manage.py loaddata fts/fixtures/manual_sample.json')
    local('python manage.py loaddata fts/fixtures/branch_csv.json')
    local('python manage.py loaddata fts/fixtures/map_csv.json')
    local('python manage.py loaddata fts/fixtures/demo.json')
    local('python manage.py loaddata fts/fixtures/game_data.json')

def resetdb():
    with settings(warn_only=True):
        local('rm epl/timemap.db')
    local('python manage.py syncdb --noinput')
    updatedb()
    load_manual_fixture()

def resetdbadmin():
    with settings(warn_only=True):
        local('rm epl/timemap.db')
    local('python manage.py syncdb --noinput')
    updatedb()
    local('python manage.py loaddata fts/fixtures/admin_user.json')

def storystats():
    import sys
    import os
    sys.path.append(os.curdir)
    import epl.settings as epl_settings
    from django.core.management import setup_environ
    setup_environ(epl_settings)
    import util
    util.gen_story_stats()
