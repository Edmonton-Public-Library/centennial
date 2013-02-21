import requests
import unittest
import bibliocommons

from mock import Mock, patch

class BiblicommonsTest(unittest.TestCase):
 
    def testValidAPIKey(self):
        req = requests.get(bibliocommons.APIRoot+"users", params={'q': 'notarealuser', 'api_key': bibliocommons.APIKey})
        if (req.status_code == 403):
            self.fail("Included API Key invalid")
    
    def testValidUserValid(self):
        #Assemble a mock result object
        result = Mock()
        result.text = "+VALID"
        
        #Patch requests.get
        with patch.object(requests, 'get') as mockGet:
            mockGet.return_value = result
            self.assertTrue(bibliocommons.validUser("user", "pass"))

    def testValidUserInvalid(self):
        #Assemble a mock result object
        result = Mock()
        result.text = ""
        
        #Patch requests.get
        with patch.object(requests, 'get') as mockGet:
            mockGet.return_value = result
            self.assertFalse(bibliocommons.validUser("user", "pass"))

    def testUserContentNone(self):
        result = Mock()
        result.json.return_value = { 'page':'1', 'pages':'1', 'user_content':[]}
        #Patch requests.get
        with patch.object(requests, 'get') as mockGet:
            mockGet.return_value = result
            self.assertTrue(bibliocommons.userContent('user') == [])

    def testUserContentOnePage(self):
        result = Mock()
        result.json.return_value = { 'page':'1', 'pages':'1', 'user_content':['one', 'two', 'three']}
        #Patch requests.get
        with patch.object(requests, 'get') as mockGet:
            mockGet.return_value = result
            self.assertTrue(bibliocommons.userContent('user') == ['one', 'two', 'three'])

    def testUserContentManyPage(self):
        #Patch requests.get
        with patch.object(requests, 'get') as mockGet:
            mockGet.side_effect = self.manypage_sideeffect
            self.assertTrue(bibliocommons.userContent('user') == ['1', '2', '3', '4'])

    def manypage_sideeffect(*args, **kwargs):
        params = kwargs['params']
        page = 1
        if ('page' in params):
            page = params['page']
        result = Mock()
        result.json.return_value = { 'page':str(page), 'pages':'4', 'user_content':[str(page)]}
        return result

if __name__ == '__main__':
    unittest.main()