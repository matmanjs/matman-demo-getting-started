const { useJquery } = require('web-crawl-util');

module.exports = () => {
    return {
        sectionInfo: getSectionInfo(),
        _version: Date.now()
    };
};

/**
 * 获取规则子模块的信息
 */
function getSectionInfo() {
    let result = {
        isExist: useJquery.isExist("#container")
    };

    if (isExist) {
        result.btntext = useJquery.getText('#container .download-btn');
    }

    return result;
}