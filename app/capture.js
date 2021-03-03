const puppeteer = require('puppeteer');
const moment    = require("moment");

const outputDir = "../screenshots";

async function scrollToBottom(page, viewportHeight) {
  const getScrollHeight = () => {
    return Promise.resolve(document.documentElement.scrollHeight) }

  let scrollHeight = await page.evaluate(getScrollHeight)
  let currentPosition = 0
  let scrollNumber = 0

  while (currentPosition < scrollHeight) {
    scrollNumber += 1
    const nextPosition = scrollNumber * viewportHeight
    await page.evaluate(function (scrollTo) {
      return Promise.resolve(window.scrollTo(0, scrollTo))
    }, nextPosition)
    await page.waitForNavigation({waitUntil: 'networkidle2', timeout: 5000})
              .catch(e => console.log('timeout exceed. proceed to next operation'));

    currentPosition = nextPosition;
    console.log(`scrollNumber: ${scrollNumber}`)
    console.log(`currentPosition: ${currentPosition}`)

    // 2
    scrollHeight = await page.evaluate(getScrollHeight)
    console.log(`ScrollHeight ${scrollHeight}`)
  }
}

/**
 * メインロジック.
 */
(async () => {
  // Puppeteerの起動.
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  let url = "";
  if (process.argv.length >= 3){
    url = process.argv[2];
    console.log("url:" + url);
  }

  if (!url){
    //URL未入力の場合終了
    console.log("URLが未入力の為終了");
    process.exit(1);
  }

  // 新しい空のページを開く.
  const page = await browser.newPage();

  const viewportHeight = 1200;
  const viewportWidth = 1200;

  // view portの設定.
  await page.setViewport({
    width: viewportWidth,
    height: viewportHeight,
  });
  await page.goto(url);
  await scrollToBottom(page, viewportHeight);

  const today = moment().format("YYYYMMDD");

  // await page.waitForNavigation({waitUntil:'networkidle2', timeout:5000})
  //            .catch(e => console.log('timeout exceed. proceed to next operation'))
  await page.screenshot({ path: outputDir + '/' + today + '.png', fullPage: true });

  // ブラウザを終了.
  await browser.close();
})();