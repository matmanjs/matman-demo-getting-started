const expect = require('chai').expect;
const checkPage = require('.');

describe('mock-showcase 页：常规检查', function () {
    this.timeout(30000);

    let resultData;

    before(function () {
        return checkPage({ show: false, doNotEnd: false, useRecorder: false })
            .then(function (result) {
                // console.log(JSON.stringify(result));
                resultData = result;
            });
    });

    describe('检查-banner', function () {
        let data;

        before(function () {
            data = resultData.data.sectionInfo;
        });

        it('存在该模块', function () {
            expect(data.isExist).to.be.true;
        });

        it('下载按钮文案', function () {expect(data.btntext).to.be.equal('立即下载');});
    });
});
