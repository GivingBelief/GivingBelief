$(function () {
    $('.bar').mouseenter(function () {
        $('.mask').fadeIn(500)
    }).mouseleave(function () {
        $('.mask').fadeOut(500)
    })
});