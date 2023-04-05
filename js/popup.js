/**
*filename: popup.js
*author: Bay Zeng
*version: 1.0.0
*date: 2023 - 04 - 05
*description: popup js逻辑
*/


//标注相关的连接器
// 初始化搜索框，并在选项中指定搜索文本变更事件回调函数，这样当搜索框文本发送变化时获得通知。
$('#searchInputExample').searchBox({
    escToClear: true, // 设置点击 ESC 键清空搜索框
    changeDelay: 500
});

$('#searchBtn').on('click',function() {
    // 获取搜索框实例对象
    var mySearchBox = $('#searchInputExample').data('zui.searchBox');

    // 获取搜索框内的文本
    var searchText = mySearchBox.getSearch();
    // console.log(searchText);
   
    sendMessageToContentScript({cmd:'search', value:searchText}, function(response)
    {
        console.log(response);
    });
    
    
});

    
//锚点定位
var index = 0;
$('#downBtn').on('click', () => {
    index++;
    sendMessageToContentScript({cmd:'down', value: index}, function(response)
    {
        console.log(response);
    });

});

$('#upBtn').on('click', () => {
    index--;
    sendMessageToContentScript({cmd:'up', value: index}, function(response)
    {
        console.log(response);
    });

});






//与ContentScript通信
function sendMessageToContentScript(message, callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response)
        {
            if(callback) callback(response);
        });
    });
    
}


