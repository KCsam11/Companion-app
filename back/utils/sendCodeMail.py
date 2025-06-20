import resend
from flask import render_template
from os import getenv

resend.api_key = getenv("RESEND_API_KEY")

def send_verification_code(email, code):
    html = render_template("verif_code_mail.html", code=code)

    resend.Emails.send({
        "from": "Companion <no-reply@email.lol-companion.com>",
        "to": [email],
        "subject": "Voici ton code de vérification",
        "html": html
    })
    return {"message": "Verification code sent successfully"}, 200