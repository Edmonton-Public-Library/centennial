from django.test import TestCase
from timemap.models import Branch
from django.core.exceptions import ValidationError

class BranchModelTest(TestCase):

    def test_branch_creation(self):
        saved_branch = save_branch("Branch1", "Branch1 description field",
                                   1950, 1978, 53.3712, -112.6638
                                  )
        saved_branches = Branch.objects.all()
        self.assertEqual(len(saved_branches), 1)
        self.assertEqual(saved_branch, saved_branches[0])

    def test_branch_unicode(self):
        branch_name = "Branch2"
        branch = save_branch(branch_name, "Branch2 description field",
                                   1950, 1978, 53.3712, -112.6638
                                  )
        self.assertEquals(unicode(branch), branch_name)

    def test_end_date_after_start_date(self):
        branch_name = "Branch3"
        with  self.assertRaises(ValidationError):
            save_branch(branch_name, "Branch3 description field",
                        1950, 1948, 53.3712, -112.6638
                       )

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
