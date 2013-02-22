import sys

from Crypto.Cipher import AES
import urllib

def getRegistrationNotification(name, baseUrl, email, creationTime, MIME):
    activationKey = aesEncrypt(email + "=" + creationTime)
    keyValue = urllib.urlencode({"key" : activationKey})
    urlFormatter = "_formatUrlAs%s"%(MIME)
    url = getattr(sys.modules[__name__], urlFormatter)("%s/account/activate?%s" % (baseUrl, keyValue))
    textFormatter = "_formatTextAs%s"%(MIME)
    return getattr(sys.modules[__name__], textFormatter)(_REGISTRATION_NOTIFICATION % (name, url))

def _formatUrlAshtml(raw):
    return "<a href=\"%s\">link</a>"%(raw)

def _formatTextAshtml(raw):
    return """\
    <html>
      <head></head>
      <body>
        <p>Greetings from EPL<br>
           %s
        </p>
      </body>
    </html>
    """ % (raw)

def aesEncrypt(msg):
    diff = len(msg) % 16
    padd = " "*diff
    msg += padd
    cipher = AES.new(_ENCRYPTION_KEY)
    return cipher.encrypt(msg)

def aesDecrypt(msg):
    cipher = AES.new(_ENCRYPTION_KEY)
    return cipher.decrypt(msg)

_ENCRYPTION_KEY = b'Sixteen byte key'

_REGISTRATION_NOTIFICATION = """Thank you %s for registering with EPL TimeMap. To activate your account, you will need to verify your account by navigating to the following URL: %s"""

PASSWORD_RESET_EMAIL = """To reset your password, please click on the following link: %s"""
