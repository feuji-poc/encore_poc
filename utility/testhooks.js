const { Before, AfterAll, AfterStep, Status, BeforeAll,After } = require('@cucumber/cucumber');
const { setDefaultTimeout } = require('@cucumber/cucumber');
const page = require('@playwright/test');
const fs = require('fs');

setDefaultTimeout(150 * 1000);

BeforeAll({ timeout: 150 * 1000 }, async () => {
  let browser = await page.chromium.launch({ headless: false });
  global.browser = browser;
  global.context = await browser.newContext(
    {
    viewport: null,
    ignoreHTTPSErrors: true,
    navigationTimeout: 60000
  }
  );
  global.page = await global.context.newPage();
});

AfterAll(async () => {
  if (global.browser) {
    await global.browser.close();
  }
});