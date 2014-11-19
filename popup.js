chrome.tabs.getSelected(null, function(tab) {
  chrome.tabs.sendRequest(tab.id, {action: "canvasTemplate"}, function(response) {
  });
});

chrome.tabs.insertCSS({file: 'canvas.css'}, function() {
});
window.close();
