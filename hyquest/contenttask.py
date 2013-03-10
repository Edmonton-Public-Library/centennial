validContentTypes = ['comment', 'rating']
validMatchTypes = ['title', 'format', 'author']
validFormats = ['BK', 'CD', 'DVD', 'BOOK_CD']

#Values for user content must be passed in to allow caching in case multiple quests need to be verified
def userContentQuest(userID, contentType, matchType, matchText, userContent):
    if (contentType not in validContentTypes):
        raise ValueError('Invalid contentType')
    if (matchType not in validMatchTypes):
        raise ValueError('Invalid matchType')
    if (matchType == 'format' and matchText not in validFormats):
        raise ValueError('Invalid content format')

    for entry in userContent:
        if matchesTitle(entry, matchType, matchText):
            for content in entry['content']:
                if matchesContent(content, expectedtype):
                    return True

def matchesTitle(title, matchType, matchText):
    if (matchType == 'title'):
        return (content['title']['title'] == matchText)
    if (matchType == 'format'):
        return (content['title']['format']['id'] == matchText)
    if (matchType == 'author'):
        for author in content['title']['authors']
            return author['name'] == matchText
            

    
def matchesContent(content, expectedType):
    return (content['content_type']['id'] == expectedType)

def codeQuest():
    return 1