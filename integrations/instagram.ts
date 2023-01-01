import puppeteer from 'puppeteer';

export async function spamInstagramDms(
  username: string,
  message: string,
  loginUsername: string = process.env.LOGIN_INSTA_1!,
  loginPassword: string = process.env.PASSWORD_INSTA_1!
) {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
  await page.goto('https://www.instagram.com/accounts/login/');
  await page.waitForSelector('input[name="username"]');

  //login
  await page.type('input[name="username"]', loginUsername);
  await page.type('input[name="password"]', loginPassword); //handle captch edge case

  await page.click('button[type="submit"]');

  await page.waitForNavigation();

  await page.goto(`https://www.instagram.com/direct/inbox/`);

  //closes the popup dialog
  await page.waitForSelector('button._a9--._a9_1');
  await page.click('button._a9--._a9_1');

  //new message
  await page.waitForSelector('button._abl-._abm2');
  await page.click('button._abl-._abm2');

  //search for username
  await page.waitForSelector('input[placeholder="Search..."]');
  await page.type('input[placeholder="Search..."]', username); // page content user may have blocked

  //click on the username
  await page.waitForSelector('div._abm4');
  await page.$$eval('div._abm4', buttons => {
    buttons[0].click();
  });

  //click next
  await page.waitForSelector(
    'button._acan._aiit._acao._aija._acas._acav._aiiv._aj1-'
  );
  await page.click('button._acan._aiit._acao._aija._acas._acav._aiiv._aj1-');

  //type message
  await page.waitForSelector('textarea[placeholder="Message..."]');
  console.log(page.$('textarea[placeholder="Message..."]'));
  await page.click('textarea[placeholder="Message..."]');
  await page.type('textarea[placeholder="Message..."]', message, { delay: 20 });

  //send message
  await page.keyboard.press('Enter');

  //await browser.close();
  return 'success';
}

export async function spamInstagramCommentsIfPublic(
  username: string,
  message: string,
  loginUsername: string = process.env.LOGIN_INSTA_1!,
  loginPassword: string = process.env.PASSWORD_INSTA_1!
) {
  //check if account is public
  const browser = await puppeteer.launch({
    headless: true,
  });
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
  await page.goto('https://www.instagram.com/accounts/login/');
  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', loginUsername);
  await page.type('input[name="password"]', loginPassword); //handle captch edge case

  await page.click('button[type="submit"]');

  await page.waitForNavigation();
  await page.goto(`https://www.instagram.com/${username}/`);
  await page.waitForSelector('button._acan._aiit._acap._aijb._acas._aj1-');

  console.log(await page.$$('h2._aa_u'));
  if (
    (await page.$$('h2._aa_u')).length !== 0 &&
    (await page.$eval('h2._aa_u', h2 => h2.textContent)) !== null
  ) {
    await browser.close();
    return 'account is private';
  } else {
    var posts = await (
      await page.$$('div._aabd._aa8k._aanf')
    ).map(async post => await post.$eval('a', a => a.href));
    var post = await Promise.all(posts);
    for (var i = 0; i < posts.length; i++) {
      await page.goto(post[i]);
      await page.waitForSelector('textarea[placeholder="Add a comment…"]');
      await page.click('textarea[placeholder="Add a comment…"]');
      await page.type('textarea[placeholder="Add a comment…"]', message, {
        delay: 20,
      });
      await page.keyboard.press('Enter');
      if (i === posts.length - 1) await browser.close();
    }
    return 'account is public';
  }
  //if public, comment on the latest post
}
