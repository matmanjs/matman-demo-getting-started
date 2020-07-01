const path = require("path");
const matman = require("matman");
const { BrowserRunner } = require("matman-runner-puppeteer");

module.exports = async (opts) => {
  const pageDriver = matman.launch(new BrowserRunner(), opts);

  // 设置浏览器参数
  await pageDriver.setDeviceConfig({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36 mycustomua",
    viewport: {
      width: 1250,
      height: 400,
    },
  });

  // 设置 cookie
  await pageDriver.setCookieConfig("mykey1=myvalue1; mykey2=myvalue2");

  // 设置截屏
  await pageDriver.setScreenshotConfig(true);

  // 加载页面地址
  await pageDriver.setPageUrl("https://www.baidu.com");

  // 第一步：开始操作之前
  await pageDriver.addAction("init", async function (page) {
    // nightmare 支持所有的原始 nightmare 语法和对其定制的扩展功能
    await page.waitFor("#su");
  });

  // 第二步：搜索输入框输入: matman
  await pageDriver.addAction("input_key_word", async function (page) {
    await page.type("#kw", "matman");
    await page.waitFor(500);
  });

  // 第三步：点击搜索按钮，获得搜索结果
  await pageDriver.addAction("click_to_search", async function (page) {
    await page.click("#su");
    await page.waitFor("#content_left");
  });

  // 执行爬虫脚本文件或者爬虫脚本函数
  const res = await pageDriver.evaluate(
    path.resolve(__dirname, "./crawlers/get-page-info-for-search.js")
  );

  return res;
};

// module
//   .exports({ show: true, doNotCloseBrowser: true, useRecorder: false })
//   .then(function (result) {
//     console.log(JSON.stringify(result));
//   })
//   .catch(function (error) {
//     console.error("failed:", error);
//   });
