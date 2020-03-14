module.exports = () => {
    return {
        title: document.title,
        width: window.innerWidth,
        height: window.innerHeight,
        userAgent: navigator.userAgent,
        _version: Date.now(),
        searchBtnTxt: document.querySelector('#su').value,
        footerInfo: getFooterInfo()
    };
};

function getFooterInfo() {
    return {
        // 页面底部的联网备案信息
        jgwab: {
            code: $('#jgwab').text(),
            href: $('#jgwab').attr('href')
        }
    };
}
