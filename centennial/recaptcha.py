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

    params = {'privatekey': '', 'remoteip': ip, 'challenge': challenge, 'response': response}
     return = requests.POST(API_SERVER, params=params)
