#from Crypto.Cypher import AES

def getRegistrationNotification(name, baseUrl, email, creationTime):
    activationKey = aesEncrypt(email + "=" + creationTime)
    url = "%s/account/activate?key=%s" % (baseUrl, activationKey)
    return _REGISTRATION_NOTIFICATION % (name, url)

def aesEncrypt(msg):
    cipher = AES.new(_ENCRYPTION_KEY)
    return cipher.encrypt(msg)

def aesDecrypt(msg):
    cipher = AES.new(_ENCRYPTION_KEY)
    return cipher.decrypt(msg)

_ENCRYPTION_KEY = b'Sixteen byte key'

_REGISTRATION_NOTIFICATION = """Thank you %s for registering with EPL. To activate your account, you will need to verify your account by navigating to the following URL: %s"""

PASSWORD_RESET_EMAIL = """To reset your password, please click on the following link: %s"""
