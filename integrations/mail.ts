import nodemailer from 'nodemailer';

export async function spamEmailWithFakeNewsletters(
  email: string,
  message: string,
  subject: string,
  loginUsername: string = process.env.MAIL!,
  password: string = process.env.MAIL_PASSWORD!
) {
  // login to email using nodemailer with these credentials and then send the email message
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: loginUsername,
      pass: password,
    },
  });
  const mailOptions = {
    from: loginUsername,
    to: email,
    subject: subject,
    text: message,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
