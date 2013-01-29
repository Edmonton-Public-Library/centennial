import re
import json

from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

BROWSER_WAIT = 10

class AdminTest(LiveServerTestCase):
    fixtures = ['admin_user.json']

    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(BROWSER_WAIT)

    def tearDown(self):
        self.browser.quit()

    def test_add_branch(self):
        self.admin_login()
        self.add_branch("Branch1", "Branch1 description field",
                        1950, 1978, 53.3712, -112.6638
                       )
        new_branch_links = self.browser.find_elements_by_link_text("Branch1")
        self.assertEquals(len(new_branch_links), 1)

    def admin_login(self):
        self.admin_page_reachable()

        username_field = self.browser.find_element_by_name('username')
        username_field.send_keys('admin')
        password_field = self.browser.find_element_by_name('password')
        password_field.send_keys('asdf')
        password_field.send_keys(Keys.RETURN)

        body = self.browser.find_element_by_tag_name('body')
        self.assertIn('Site administration', body.text)

    def admin_page_reachable(self):
        self.browser.get(self.live_server_url + '/admin/')
        body = self.browser.find_element_by_tag_name('body')
        self.assertIn('Django administration', body.text)

    def add_branch(self, name, description, start_year, end_year, latitude, longitude):
        """ Requires browser to be in the administration page
        """
        branch_links = self.browser.find_elements_by_link_text("Branches")
        self.assertEquals(len(branch_links), 1)
        branch_links[0].click()

        new_branch_link = self.browser.find_element_by_link_text('Add branch')
        new_branch_link.click()

        self.fill_form_element("name", name)
        self.fill_form_element("description", description)
        self.fill_form_element("start_year", start_year)
        self.fill_form_element("end_year", end_year)
        self.fill_form_element("latitude", str(latitude))
        self.fill_form_element("longitude", str(longitude))
        self.click_save_button()

    def fill_form_element(self, field_name, keys_to_send):
        field = self.browser.find_element_by_name(field_name)
        field.send_keys(keys_to_send)

    def click_save_button(self):
        self.browser.find_element_by_css_selector("input[value='Save']").click()

class APITest(LiveServerTestCase):
    fixtures = ['timemap_branches.json']

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
        self.assertEqual(branch_2, 'Strathcona Branch')

def extract_json(page_source):
    match = re.search('<pre>(.*)</pre>', page_source)
    if not match:
        return {}

    page_json = match.groups()[0]
    return json.loads(page_json)
