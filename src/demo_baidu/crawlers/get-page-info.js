module.exports = () => {
    return {
        title: document.title,
        searchBtnTxt: document.querySelector('#index-bn').textContent,
        width: window.innerWidth,
        height: window.innerHeight,
        userAgent: navigator.userAgent,
        _version: Date.now(),
        newsInfo: getNewsInfo()
    };
};

/**
 * 获取规则子模块的信息
 */
function getNewsInfo() {
    const jqContainer = $('.tab-news-content .news-list-wrapper');
    let result = {
        isExist: !!jqContainer.length
    };

    const list = [];

    if (result.isExist) {
        jqContainer.children().each(function () {
            const $this = $(this);
            list.push({
                title: $('.rn-container .rn-h1', $this).text().trim()
            });
        });
    }

    result.list = list;

    return result;
}