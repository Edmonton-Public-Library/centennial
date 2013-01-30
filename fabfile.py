from fabric.api import local
from fabric.context_managers import settings

def test():
    local('python manage.py test timemap')
    local('python manage.py test fts')

def updatedb():
    with settings(warn_only=True):
        local('python manage.py migrate fts')
        local('python manage.py migrate timemap')
        local('python manage.py migrate tastypie')

def load_manual_fixture():
    local('python manage.py loaddata fts/fixtures/manual_sample.json')
