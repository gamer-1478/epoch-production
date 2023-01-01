import puppeteer from "puppeteer";

export async function spamTwitterPostRepliesIfPublic(
  username: string,
  message: string,
  loginUsername: string = "epoch_kids",
  password: string = "okokokokokokok"
) {
  // login to twitter with these credentials and then dm the username message
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://twitter.com/login");

  //enter username
  await page.waitForSelector(
    "input.r-30o5oe.r-1niwhzg.r-17gur6a.r-1yadl64.r-deolkf.r-homxoj.r-poiln3.r-7cikom.r-1ny4l3l.r-t60dpp.r-1dz5y72.r-fdjqy7.r-13qz1uu"
  );
  await page.type(
    "input.r-30o5oe.r-1niwhzg.r-17gur6a.r-1yadl64.r-deolkf.r-homxoj.r-poiln3.r-7cikom.r-1ny4l3l.r-t60dpp.r-1dz5y72.r-fdjqy7.r-13qz1uu",
    loginUsername
  );
 
  //click next
  (await page.$$('div[role="button"]')).forEach(async (e, i) => {
    if (i === 3) {
      await e.click();
    }
  });

  //enter password 
  await page.waitForSelector(
    'input[type="password"]'
  );
  await page.type(
    'input[type="password"]',
    password
  );

  //click login
  (await page.$$('div[role="button"]')).forEach(async (e, i) => {
    console.log(i, await e.getProperty('class'));
    if (i === 2) {
      await e.click();
      console.log(await e.getProperty('class'))
    }
  });

  setTimeout(async () => {
      await page.goto(`https://twitter.com/${username}`);
  }, 2000);

  await page.waitForNavigation();
  await page.waitForSelector('div[data-testid="cellInnerDiv"]');

  //check if turn  on notifs pops up
  const notifs = await page.$$(
    "div.css-1dbjc4n.r-1awozwy.r-1ifxtd0.r-1wzrnnt.r-13qz1uu");
  if (notifs.length > 0) {
    (await page.$$('div[role="button"]')).forEach(async (e, i) => {
      if (i === 0) {
        await e.click();
      }
    });
  }

  console.log(notifs, "notifs")

  
  for (let i = 0; i < 5; i++) {
    //get top tweets
    await page.waitForSelector('div[data-testid="cellInnerDiv"]');

    const tweets = await page.$$('div[data-testid="cellInnerDiv"]');

    await tweets[i].click();

    await page.waitForSelector(
      "div[data-testid='tweetTextarea_0RichTextInputContainer']"
    );

    await page.click(
      "div[data-testid='tweetTextarea_0RichTextInputContainer']"
    );
    //enter message
    await page.type(
      "div[data-testid='tweetTextarea_0RichTextInputContainer']",
      message
    );

    await page.waitForSelector("div[data-testid='tweetButtonInline']");
    //click reply
    (await page.$$('div[role="button"]')).forEach(async (e, i) => {
      console.log(i, await e.getProperty("class"));
      if (i === 17) {
        await e.click();
        console.log(await e.getProperty("class"));
      }
    });

    //click back
    (await page.$$('div[aria-label="Back"]')).forEach(async (e, i) => {
      if (i === 0) {
        await e.click();
      }
    });
  };

  

  // setTimeout(async () => {
  //   //click next
  //   await page.click(
  //     "div.css-18t94o4.css-1dbjc4n.r-42olwf.r-sdzlij.r-1phboty.r-rs99b7.r-ywje51.r-usiww2.r-2yi16.r-1qi8awa.r-1ny4l3l.r-ymttw5.r-o7ynqc.r-6416eg.r-lrvibr.r-13qz1uu"
  //   );
  // }, 2000);

  // await page.type('input[name="session[password]"]', password);
  // await page.click('div[data-testid="LoginForm_Login_Button"]');
  // await page.waitForNavigation();

  // await page.goto(
  //   `https://twitter.com/messages/compose?recipient_id=${username}`
  // );
  // await page.waitForSelector('div[data-testid="tweetTextarea_0"]');
  // await page.type('div[data-testid="tweetTextarea_0"]', message);
  // await page.click('div[data-testid="tweetButtonInline"]');
  // await page.waitForSelector('div[data-testid="confirmationSheetConfirm"]');
  // await page.click('div[data-testid="confirmationSheetConfirm"]');
  // await page.waitForSelector('div[data-testid="confirmationSheetDismiss"]');
  // await page.click('div[data-testid="confirmationSheetDismiss"]');
  // await page.waitForSelector('div[data-testid="SideNav_NewDM_Button"]');
  // await page.click('div[data-testid="SideNav_NewDM_Button"]');
}
