from django.test import TestCase
from timemap.models import Branch

class BranchModelTest(TestCase):

    def test_branch_creation(self):
        saved_branch = save_branch("Branch1", "Branch1 description field",
                                   1950, 1978, 53.3712, -112.6638
                                  )
        saved_branches = Branch.objects.all()
        self.assertEqual(len(saved_branches), 1)
        self.assertEqual(saved_branch, saved_branches[0])

def save_branch(name, description, start_year, end_year, longitude, latitude):
    branch = Branch()
    branch.name = name
    branch.description = description
    branch.start_year = start_year
    branch.end_year = end_year
    branch.longitude = longitude
    branch.latitude = latitude
    branch.save()
    return branch
