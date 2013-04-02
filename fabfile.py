from fabric.api import local
from fabric.context_managers import settings

def test():
    local('python manage.py test timemap')
    local('python manage.py test fts')

def updatedb():
    with settings(warn_only=True):
        local('python manage.py syncdb --noinput')
        local('python manage.py loaddata fts/fixtures/demo.json')

def resetdb():
    with settings(warn_only=True):
        local('rm epl/timemap.db')
    local('python manage.py syncdb --noinput')
    updatedb()

def resetdbadmin():
    with settings(warn_only=True):
        local('rm epl/timemap.db')
    local('python manage.py syncdb --noinput')
    updatedb()
    local('python manage.py loaddata fts/fixtures/demo.json')

def storystats():
    import sys
    import os
    sys.path.append(os.curdir)
    import epl.settings as epl_settings
    from django.core.management import setup_environ
    setup_environ(epl_settings)
    import util
    util.gen_story_stats()
