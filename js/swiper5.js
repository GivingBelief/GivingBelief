$(function() {

    $(".more-fresh-p").mouseenter(function () {
        $(this).css('color', '#f66f6a');
        $(this).children("span").stop().animate({
            left: 10
        })
    }).mouseleave(function () {
        $(this).css('color', '#000');
        $(this).children("span").stop().animate({
            left: 0
        })
    });
});