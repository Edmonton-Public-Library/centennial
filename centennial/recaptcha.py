from epl.settings import RECAPTCHA_PRIVATE_KEY
import requests

API_SERVER = "https://www.google.com/recaptcha/api/verify"

def verifyReCaptcha(request, challenge, response):
    """
    returns a tuple, where the first element is a boolean indicating
    success, and the second is the error code (if any)
    """
    #Get the remote IP, required for the request
    remote_ip = request.META.get('REMOTE_ADDR', '')
    forwarded_ip = request.META.get('HTTP_X_FORWARDED_FOR', '')
    ip = remote_ip if not forwarded_ip else forwarded_ip

    params = {'privatekey': RECAPTCHA_PRIVATE_KEY, 'remoteip': ip, 'challenge': challenge, 'response': response}
    retval = requests.post(API_SERVER, params=params)
    verification = retval.text.split('\n')
    print("ReCaptcha for "+ip+", result: "+retval.text)
    print("Challenge: "+challenge+"\n Response: "+response)
    return (verification[0] == 'true', verification[1])


