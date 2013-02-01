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

def load_manual_fixture():
    local('python manage.py loaddata fts/fixtures/manual_sample.json')

def resetdb():
    with settings(warn_only=True):
        local('rm epl/timemap.db')
    local('python manage.py syncdb --noinput')
    updatedb()
    load_manual_fixture()

