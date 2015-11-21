console.log("获取页面")

var title = document.getElementsByTagName('title');

if(title.length>0){
    title = title[0].innerHTML
}
console.log("message:",title);


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message == 'Title'){
        sendResponse(title);
    }
});