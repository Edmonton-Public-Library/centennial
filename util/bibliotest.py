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





if __name__ == '__main__':
    unittest.main()