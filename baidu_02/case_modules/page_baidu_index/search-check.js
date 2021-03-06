const path = require('path');
const matman = require('matman');
const { BrowserRunner } = require('matman-runner-puppeteer');

module.exports = async (pageDriverOpts) => {
  // 创建 PageDriver 对象，使用它可以实现对浏览器页面的控制
  const pageDriver = await matman.launch(new BrowserRunner(), pageDriverOpts);

  // 设置浏览器打开时所模拟的设备参数
  await pageDriver.setDeviceConfig({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36 mycustomua',
    viewport: {
      width: 1024,
      height: 520
    }
  });

  // 设置截屏
  await pageDriver.setScreenshotConfig(true);

  // 设置 cookie
  await pageDriver.setCookieConfig("mykey1=myvalue1; mykey2=myvalue2");

  // 设置页面地址
  await pageDriver.setPageUrl('https://www.baidu.com');

  // 第一步：开始操作之前，等待页面加载完成
  await pageDriver.addAction('init', async page => {
    await page.waitFor('#su');
  });

  // 第二步：搜索输入框输入: matman
  await pageDriver.addAction('input_key_word', async page => {
    await page.type('#kw', 'matman');
  });

  // 第三步：点击搜索按钮，获得搜索结果
  await pageDriver.addAction('click_to_search', async page => {
    await page.click('#su');
    await page.waitFor('#content_left');
  });

  // 计算并返回结果
  return pageDriver.evaluate(
    path.resolve(__dirname, './crawlers/get-page-info-for-search.js')
  );
};

// module
//   .exports({ show: true, doNotCloseBrowser: true, useRecorder: false })
//   .then(function (result) {
//     console.log(JSON.stringify(result));
//   })
//   .catch(function (error) {
//     console.error("failed:", error);
//   });
