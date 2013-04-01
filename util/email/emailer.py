"""Reference: http://docs.python.org/2/library/email-examples.html"""

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import epl.settings as settings

def do_send(msg_text, src_address, dst_address, MIME='html', smtp_login=None):
    me = src_address

    # Create message container - the correct MIME type is multipart/alternative.
    msg = MIMEMultipart('alternative')
    msg['Subject'] = "Link"
    msg['From'] = me
    msg['To'] = dst_address

    # Record the MIME types of both parts - text/plain and text/html.
    htmlPart = MIMEText(msg_text, 'html')

    # Attach parts into message container.
    # According to RFC 2046, the last part of a multipart message, in this case
    # the HTML message, is best and preferred.
    msg.attach(htmlPart)

    # Send the message via local SMTP server.
    try:
        s = smtplib.SMTP(settings.SMTP_VALUES['SMTP_SERVER'],
                settings.SMTP_VALUES['SMTP_PORT'])
    except Exception as e:
        print e
        raise
    # sendmail function takes 3 arguments: sender's address, recipient's address
    # and message to send - here it is sent as one string.
    if smtp_login is not None:
        s.ehlo()
        s.starttls()
        s.ehlo()
        s.login(smtp_login[0], smtp_login[1])
    s.sendmail(me, dst_address, msg.as_string())
    s.quit()
