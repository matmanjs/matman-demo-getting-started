const matman = require("matman");
const { BrowserRunner } = require("matman-runner-puppeteer");

module.exports = async (opts) => {
  // 创建 PageDriver 对象，使用它对浏览器进行设置
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

  // 设置截屏
  await pageDriver.setScreenshotConfig(true);

  // 加载页面地址
  await pageDriver.setPageUrl("https://www.baidu.com");

  await pageDriver.addAction("SCAN_PAGE", async (page) => {
    await page.waitFor("#su");
  });

  // 爬虫脚本的函数，用于获取页面中的数据
  return await pageDriver.evaluate(() => {
    return {
      title: document.title,
      width: window.innerWidth,
      height: window.innerHeight,
      userAgent: navigator.userAgent,
      _version: Date.now(),
      searchBtnTxt: document.querySelector("#su").value,
    };
  });
};

// module
//   .exports({ show: true, doNotCloseBrowser: true, useRecorder: false })
//   .then(function (result) {
//     console.log(JSON.stringify(result));
//   })
//   .catch(function (error) {
//     console.error("failed:", error);
//   });
