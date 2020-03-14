module.exports = () => {
    return {
        title: document.title,
        searchInputInfo: getSearchInputInfo(),
        searchResultInfo: getSearchResultInfo()
    };
};

/**
 * 获取搜索框相关的信息
 */
function getSearchInputInfo() {
    return {
        keyWorld: $('#kw').val(),
        searchBtnText: $('#su').val()
    };
}

/**
 * 获取搜索结果相关的信息
 */
function getSearchResultInfo() {
    const jqContainer = $('#content_left');
    const result = {
        isExist: !!jqContainer.length,
        list: []
    };

    function getItemData(jqItem) {
        return {
            title: $('.t', jqItem).text().trim(),
            describe: $('.c-abstract', jqItem).text().trim(),
            tpl: jqItem.attr('tpl')
        };
    }

    $('.c-container', jqContainer).each(function () {
        result.list.push(getItemData($(this)));
    });

    return result;
}
