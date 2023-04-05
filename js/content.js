/**
*filename: content.js
*author: Bay Zeng
*version: 1.0.0
*date: 2023 - 04 - 05
*description: 连接器标注及跳转  页面js注入
*/


//与popup.js通信
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
    if (request.cmd == 'search') {
        highLight(request.value);
    }
    if (request.cmd == 'down') {
        jsAnchor(request.value);
    }
    if (request.cmd == 'up') {
        jsAnchor(request.value);
    }
    sendResponse('recieve!');
});


//已标注列表
var redList;
//连接器高亮
function highLight(data) {
    var iterable = document.getElementsByClassName('next-menu-item-text');
    let tmpArr = [];
    for (let i = 0; i < iterable.length; i++) {
        if (iterable[i].style.color = 'red') 
            iterable[i].style.color = '';
        if (iterable[i].innerText.indexOf(data)!=-1) {
            // console.log(iterable[i]);
            iterable[i].style.cssText = 'color: red';
            tmpArr.push(iterable[i]);
        }
    }
    redList = tmpArr;
    
}

//锚点定位
function jsAnchor(index) {
    
    if(index >= 0 && index < redList.length)
        redList[index].scrollIntoView({block: "end"});
    
    
    // console.log('data', redList);
    
}

