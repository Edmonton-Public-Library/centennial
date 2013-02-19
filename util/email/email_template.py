#from Crypto.Cypher import AES

def getRegistrationNotification(name, email, creationTime):
    activationKey = aesEncrypt(email + "=" + creationTime)
    url = "http://fakeUrl/account/activate?key=%s" % activationKey
    return _REGISTRATION_NOTIFICATION % (name, url)

def aesEncrypt(msg):
    key = b'Sixteen byte key'
    cipher = AES.new(key)
    return cipher.encrypt(msg)

def aesDecrypt(msg):
    key = b'Sixteen byte key'
    cipher = AES.new(key)
    return cipher.decrypt(msg)

_REGISTRATION_NOTIFICATION = """Thank you %s for registering with EPL. To activate your account, you will need to verify your account by navigating to the following URL: %s"""

PASSWORD_RESET_EMAIL = """To reset your password, please click on the following link: %s"""
