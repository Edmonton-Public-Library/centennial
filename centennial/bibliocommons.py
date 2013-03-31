import requests

# Publicly available Bibliocommons API
APIRoot = "https://api.bibliocommons.com/v1/"
APIKey = "d7b4x2enac7yg8aesbu6dvck"

# Library information
LibraryIndex = 5
LibraryShortCode = "epl"

# Bibliocommons EasyProxy
AuthRoot = "https://"+LibraryShortCode+".bibliocommons.com/user/ext_auth"


def validUser(username, password):
    valid = requests.get(AuthRoot, params={'name': username, 'user_pin': password})
    valid.raise_for_status()
    return (valid.text == "+VALID")

def userID(username):
    req = requests.get(APIRoot+"users", params={'q': username, 'api_key': APIKey})
    req.raise_for_status()
    response = req.json()
    for user in response["users"]:
        if (user["name"] == username):
            return user["id"]
    raise Error("No user matches provided Username")

def userContent(userID):
    req = requests.get(APIRoot+"users/"+str(userID)+"/user_content", params={'api_key': APIKey})
    req.raise_for_status()
    response = req.json()
    
    page = int(response["page"])
    pages = int(response["pages"])
    content = response["user_content"]
    while (page < pages):
        #rate limiting will be required here...
        page += 1
        req = requests.get(APIRoot+"users/"+str(userID)+"/user_content", params={'page': page, 'api_key': APIKey})
        req.raise_for_status()
        response = req.json()
        content.extend(response["user_content"])
    return content

def userLists(userID):
    req = requests.get(APIRoot+"users/"+str(userID)+"/lists", params={'api_key': APIKey})
    req.raise_for_status()
    response = req.json()
    
    page = int(response["page"])
    pages = int(response["pages"])
    content = response["lists"]
    while (page < pages):
        #rate limiting will be required here...
        page += 1
        req = requests.get(APIRoot+"users/"+str(userID)+"/lists", params={'page': page, 'api_key': APIKey})
        req.raise_for_status()
        response = req.json()
        content.extend(response["lists"])
    return content


