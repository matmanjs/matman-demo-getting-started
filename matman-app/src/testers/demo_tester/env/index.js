const utils = require('../../../lib/utils');

const OPTS = {
    WAIT: "#container"
};

/**
 * 获取页面的地址
 * @param isDev
 * @return {String}
 */
function getPageUrl(isDev) {
    return utils.getPageUrl("https://now.qq.com/mobile.html", isDev);
}

module.exports = {
    getPageUrl,
    getProxyServer: utils.getProxyServer,
    getCaseParser: utils.getCaseParser,
    OPTS
};
