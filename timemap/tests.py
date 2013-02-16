from django.test import TestCase
from timemap.models import Branch
from timemap.models import Story
from django.core.exceptions import ValidationError
from util.tastytest import ResourceTestCase

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

class StoryModelTest(TestCase):

    def test_unknown_date_fields(self):
        story = Story()
        story.day = 0
        story.month = 0
        story.year = 2000
        story.clean()
        self.assertEquals(story.day, 0)
        self.assertEquals(story.month, 0)
        self.assertEquals(story.year, 2000)

    def test__date_validation(self):
        story = Story()
        story.day = 29
        story.month = 2
        story.year = 2013
        with self.assertRaises(ValidationError):
            story.clean()

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

class EntryResourceTest(ResourceTestCase):
    fixtures = ['branches.json']

    def setUp(self):
        super(EntryResourceTest, self).setUp()

        self.capilano_branch = Branch.objects.get(name="Capilano")
        self.capilano_url = '/api/v1/branch/{0}/'.format(self.capilano_branch.pk)

    def get_credentials(self):
        pass

    def test_get_branch_json(self):
        resp = self.api_client.get(self.capilano_url, format='json')
        self.assertValidJSONResponse(resp)
        keys = ['description',
                'end_year',
                'floor_plan',
                'id',
                'latitude',
                'longitude',
                'name',
                'resource_uri',
                'start_year']
        self.assertKeys(self.deserialize(resp), keys)
        self.assertEqual(self.deserialize(resp)['name'], "Capilano")

    def test_add_story(self):
        story = {"branch": self.capilano_url,
                 "day": 30,
                 "description": "For children up to age three",
                 "link_url": "http://www.shareedmonton.ca/",
                 "month": 1,
                 "public_approved": True,
                 "resource_uri": "/api/v1/story/1/",
                 "story_text": "Location\tInformation\tRegistration",
                 "title": "Sing, Sign, Laugh and Learn",
                 "year": 2013
                }

        resp = self.api_client.post('/api/v1/story/', data=story)
        self.assertHttpCreated(resp)
