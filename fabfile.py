from fabric.api import local, lcd

def prepare_deployment(branch_name):
    local('python manage.py test epl')
    local('git add -p && git commit')
    local('git checkout master && git merge ' + branch_name)

def deploy():
    with lcd('~/tmp/epl/'):
        local('git pull ~/epl')
#        local('python manage.py migrate epl')
#        local('python manage.py test epl')
        #local(restart webserver)

