from fabric.api import local, lcd
from fabric.context_managers import settings

def test():
    local('python manage.py test timemap')
    local('python manage.py test fts')

def updatedb():
    with settings(warn_only=True):
        local('python manage.py migrate fts')
        local('python manage.py migrate timemap')

#def prepare_deployment(branch_name):
#    local('python manage.py test epl')
#    local('git add -p && git commit')
#    local('git checkout master && git merge ' + branch_name)
#
#def deploy():
#    with lcd('~/tmp/epl/'):
#        local('git pull ~/epl')
#        local('python manage.py migrate epl')
#        local('python manage.py test epl')
#        local(restart webserver)

