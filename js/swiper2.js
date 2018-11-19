$(function () {
    $('.more a ').mouseenter(function () {
        $(this).children(1).animate({
            left: 10
        })
    }).mouseleave(function () {
        $(this).children(1).animate({
            left: 0
        })
    });
    $('.mall-app>ul>li').mouseenter(function () {
        $(this).find('.mall-logo').css({
            opacity: 0
        });
        $(this).find('h2') .stop().animate({
            top: 45
        });
        $(this).find('p').css({
            'margin-top':0,
            opacity: 1
        });
        $(this).find('.line') .stop().animate({
            top:80,
            width:72
        })
    }).mouseleave(function () {
        $(this).find('.mall-logo').css({
            opacity: 1
        });
        $(this).find('h2') .stop().animate({
            top: 130
        });
        $(this).find('p').css({
            opacity: 0
        });
        $(this).find('.line') .stop().animate({
            top:165,
            width:0
        })
    })
});
