var enabled = false;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.render == "canvas") {
        var lists = $('.list')

        if (lists.size() != 10) {
            alert('Please, ensure that you have exactly 9 lists on your board and try to re-enable the plugin.')
            return;
        }

        enabled = true;
        renderCanvas();
    }

    if (request.render == "default") {
        enabled = false;
        renderDefault();
    }

});

function renderCanvas() {
    var board = $('#board'),
    droppable = $('.list'),
    items = $('.list', board);

    cssLoad('canvas');

    items.slice(-1).hide();
    items.slice(0, 7).wrapAll('<div class="list-table"></div>');
    items.slice(-3, -1).wrapAll('<div class="list-table"></div>');
    items.slice(1, 3).wrapAll('<div class="list-group"></div>');
    items.slice(4, 6).wrapAll('<div class="list-group"></div>');
    $('<div class="row clearfix"></div>').insertAfter(items.eq(1));
    $('<div class="row clearfix"></div>').insertAfter(items.eq(4));

    droppable.on('mousedown', function(e) {
        $(this).data('p0', { x: e.pageX, y: e.pageY });
    }).on('mouseup', function(e) {
        var p0 = $(this).data('p0'),
        p1 = { x: e.pageX, y: e.pageY },
        moved = false;

        if (p0.x != p1.x || p0.y != p1.y) {
            moved = true;
        }

        if (moved == true && enabled == true) {
            setTimeout(function(){
                renderDefault();
                renderCanvas();
            }, 500);
        }
    })

}

function renderDefault() {
    var board = $('#board'),
    group = $('.list-group'),
    table = $('.list-table'),
    items = $('.list', board);

    cssUnload('canvas');

    $('.row', board).remove();

    group.each(function(){
        var self = $(this),
        innerHtml = self.html();

        self.replaceWith(innerHtml);
    })

    table.each(function(){
        var self = $(this),
        innerHtml = self.html();

        self.replaceWith(innerHtml);
    })

}

function cssLoad(filename) {
    var link = $('<link rel="stylesheet" type="text/css">');
    link.attr({
        'href': chrome.extension.getURL(filename + '.css'),
        'id': filename
    });
    $("head").append(link);
}

function cssUnload(filename) {
    var link = $('link#' + filename);
    link.remove();
}

$(document).ready(function(){
    chrome.runtime.sendMessage({action: "reset"}, function(response) {});
});
