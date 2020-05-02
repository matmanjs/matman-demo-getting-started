const { expect } = require('chai');

const matman = require('matman');

describe('百度首页：常规检查，使用单文件形式', function () {
    this.timeout(30000);

    let resultData;

    before(function () {
        return matman

            // 创建 PageDriver，页面驱动控制器
            .createPageDriver(__filename, { doNotCloseBrowser: false, useRecorder: true })

            // 无头浏览器使用 nightmare.js 框架提供，其底层用的是 Google 的 electron，基于 chromium 内核
            .useNightmare({ show: false })

            // 设置浏览器参数
            .setDeviceConfig({
                'UA': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36 mycustomua',
                'width': 1250,
                'height': 400
            })

            // 设置截屏
            .setScreenshotConfig(true)

            // 加载页面地址
            .goto('https://www.baidu.com')

            // 需要等待某些条件达成，才开始运行爬虫脚本
            .wait('#su')

            // 爬虫脚本的函数，用于获取页面中的数据
            .evaluate(() => {
                return {
                    title: document.title,
                    width: window.innerWidth,
                    height: window.innerHeight,
                    userAgent: navigator.userAgent,
                    _version: Date.now(),
                    searchBtnTxt: document.querySelector('#su').value
                };
            })

            // 结束，获取结果
            .end()
            .then(function (result) {
                // console.log(JSON.stringify(result));
                resultData = result;
            });
    });

    describe('检查基本信息', function () {
        let data;

        before(function () {
            data = resultData.data;
        });

        it('网站title应该为：百度一下，你就知道', function () {
            expect(data.title).to.equal('百度一下，你就知道');
        });

        it('搜索按钮的文字应该为：百度一下', function () {
            expect(data.searchBtnTxt).to.equal('百度一下');
        });

        it('userAgent应该正确', function () {
            expect(data.userAgent).to.equal('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36 mycustomua');
        });

        it('窗体宽度 width=1250', function () {
            expect(data.width).to.equal(1250);
        });
    });
});
