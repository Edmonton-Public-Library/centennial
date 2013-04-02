import re
import json

from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

BROWSER_WAIT = 10

class APITest(LiveServerTestCase):
    fixtures = ['demo.json']

    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(BROWSER_WAIT)

    def tearDown(self):
        self.browser.quit()

    def test_branch_api(self):
        self.assert_branches_reachable()

    def assert_branches_reachable(self):
        self.browser.get(self.live_server_url + '/api/v1/branch/?format=json')
        json_data = extract_json(self.browser.page_source)
        branch_2 = json_data['objects'][1]['name']
        self.assertEqual(branch_2, 'Capilano')

def extract_json(page_source):
    match = re.search('<pre>(.*)</pre>', page_source)
    if not match:
        return {}

    page_json = match.groups()[0]
    return json.loads(page_json)
