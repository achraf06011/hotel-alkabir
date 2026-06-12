import nodemailer from 'nodemailer'
import crypto from 'crypto'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

export async function sendVerificationEmail(email: string, name: string, token: string) {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Vérifiez votre adresse email — Hotel Alkabir',
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 0;">
        <div style="max-width: 560px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
          <div style="background: #0A0A0A; padding: 32px; text-align: center;">
            <div style="display: inline-block; background: #D4AF37; border-radius: 50%; width: 48px; height: 48px; line-height: 48px; font-size: 24px; margin-bottom: 12px;">♛</div>
            <h1 style="color: #D4AF37; font-size: 22px; margin: 0; font-family: Georgia, serif;">Hotel Alkabir</h1>
          </div>
          <div style="padding: 40px 32px;">
            <h2 style="color: #0A0A0A; margin-top: 0;">Bonjour ${name} 👋</h2>
            <p style="color: #555; line-height: 1.6;">
              Merci de vous être inscrit sur <strong>Hotel Alkabir</strong>.<br>
              Cliquez sur le bouton ci-dessous pour activer votre compte :
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${url}"
                style="background: #D4AF37; color: #000; font-weight: bold; padding: 14px 36px; border-radius: 8px; text-decoration: none; font-size: 15px; display: inline-block;">
                Vérifier mon email
              </a>
            </div>
            <p style="color: #999; font-size: 13px;">
              Ce lien expire dans <strong>24 heures</strong>.<br>
              Si vous n'avez pas créé de compte, ignorez cet email.
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
            <p style="color: #bbb; font-size: 12px; text-align: center;">
              Hotel Alkabir · Avenue Mohammed V, Casablanca, Maroc
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  })
}

export async function sendPasswordResetEmail(email: string, name: string, token: string) {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Réinitialisation de mot de passe — Hotel Alkabir',
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 0;">
        <div style="max-width: 560px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
          <div style="background: #0A0A0A; padding: 32px; text-align: center;">
            <h1 style="color: #D4AF37; font-size: 22px; margin: 0; font-family: Georgia, serif;">Hotel Alkabir</h1>
          </div>
          <div style="padding: 40px 32px;">
            <h2 style="color: #0A0A0A; margin-top: 0;">Réinitialisation du mot de passe</h2>
            <p style="color: #555; line-height: 1.6;">
              Bonjour ${name},<br><br>
              Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous :
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${url}"
                style="background: #D4AF37; color: #000; font-weight: bold; padding: 14px 36px; border-radius: 8px; text-decoration: none; font-size: 15px; display: inline-block;">
                Réinitialiser mon mot de passe
              </a>
            </div>
            <p style="color: #999; font-size: 13px;">Ce lien expire dans 1 heure. Si vous n'avez pas fait cette demande, ignorez cet email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  })
}
