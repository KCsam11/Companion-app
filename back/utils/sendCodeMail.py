import resend
from flask import render_template

resend.api_key = "re_XkoTeHi5_LjBekRaeSPfu9djxWGZ3Gano"

def send_verification_code(email, code):
    html = render_template("verif_code_mail.html", code=code)

    resend.Emails.send({
        "from": "onboarding@resend.dev",
        "to": [email],
        "subject": "Voici ton code de vérification",
        "html": html
    })
    return {"message": "Verification code sent successfully"}, 200