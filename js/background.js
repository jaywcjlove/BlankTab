    

var lastTabId = 0;
var tab_clicks = {};

chrome.tabs.onSelectionChanged.addListener(function(tabId) {
    // console.log("chrome.tabs.onSelectionChanged",tabId)
    lastTabId = tabId;
    chrome.pageAction.show(lastTabId);
});
  
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // console.log("chrome.tabs.query",tabs)
    // lastTabId = tabs[0].id;
    // chrome.pageAction.show(lastTabId);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    lastTabId = tabId;
    if(tab.url === 'chrome://newtab/'){
        chrome.pageAction.hide(lastTabId)
    }else{
        chrome.pageAction.show(lastTabId)
    }
});

// Called when the user clicks on the page action.
chrome.pageAction.onClicked.addListener(function(tab) {
    var clicks = tab_clicks[tab.id] || 0;
    console.log("test:",clicks)
    chrome.pageAction.setIcon({path: "icon" + (clicks + 1) + ".png",
                               tabId: tab.id});
    if (clicks % 2) {
        chrome.pageAction.show(tab.id);
    } else {
        chrome.pageAction.hide(tab.id);
        setTimeout(function() { chrome.pageAction.show(tab.id); }, 200);
    }
    chrome.pageAction.setTitle({title: "click:" + clicks, tabId: tab.id});

    // We only have 2 icons, but cycle through 3 icons to test the
    // out-of-bounds index bug.
    clicks++;
    if (clicks > 3) clicks = 0;
    tab_clicks[tab.id] = clicks;
});


// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
//     if(message == 'Title'){
//         sendResponse('Hello from background.');
//     }
// });