chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.action == "canvasTemplate") {
        canvasTemplate();
    }
});

canvasTemplate = function() {
    var board = $('#board'),
      items = $('.list', board);

    items.slice(-1).hide();
    items.slice(0, 7).wrapAll('<div class="list-table"></div>');
    items.slice(-3, -1).wrapAll('<div class="list-table"></div>');
    items.slice(1, 3).wrapAll('<div class="list-group"></div>');
    items.slice(4, 6).wrapAll('<div class="list-group"></div>');
    $('<div class="clearfix"></div>').insertAfter(items.eq(1));
    $('<div class="clearfix"></div>').insertAfter(items.eq(4));

}
