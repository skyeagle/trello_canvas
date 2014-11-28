var enabled = false;

chrome.browserAction.onClicked.addListener(function(tab) {
    if (enabled == true) {
        disable(tab);
    } else {
        enable(tab);
    }
});

function enable(tab) {
    enabled = true;
    chrome.browserAction.setIcon({path: "icon19_on.png", tabId:tab.id});
    chrome.tabs.sendMessage(tab.id, {render: "canvas"}, function(response) {});
};

function disable(tab) {
    enabled = false;
    chrome.browserAction.setIcon({path: "icon19_off.png", tabId:tab.id});
    chrome.tabs.sendMessage(tab.id, {render: "default"}, function(response) {});
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "reset") {
        enabled = false;
        chrome.browserAction.setIcon({path: "icon19_off.png", tabId:tab.id});
    }
});
