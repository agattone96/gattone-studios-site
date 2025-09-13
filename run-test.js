const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  let allTestsPassed = false;
  page.on('console', msg => {
    const text = msg.text();
    console.log(`PAGE LOG: ${text}`);
    if (text.includes('All tests passed!')) {
      allTestsPassed = true;
    }
  });

  await page.goto(`file://${path.join(__dirname, 'test.html')}`, { waitUntil: 'networkidle0' });

  await browser.close();

  if (allTestsPassed) {
    console.log('Verification successful!');
    process.exit(0);
  } else {
    console.error('Verification failed!');
    process.exit(1);
  }
})();
