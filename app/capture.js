const puppeteer = require('puppeteer');

async function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * メインロジック.
 */
(async () => {
  // Puppeteerの起動.
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 新しい空のページを開く.
  const page = await browser.newPage();

  // view portの設定.
  await page.setViewport({
    width: 1200,
    height: 800,
  });
  await page.goto('https://www.minnanokaigo.com/');
  await timeout(5000);

  // await page.waitForNavigation({waitUntil:'networkidle2', timeout:5000})
  //            .catch(e => console.log('timeout exceed. proceed to next operation'))
  await page.screenshot({ path: 'fullpage.png', fullPage: true });

  // ブラウザを終了.
  await browser.close();
})();