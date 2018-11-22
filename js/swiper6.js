$(function() {

    var arrArea = [
        {
            'left': '68.5%',
            'top': '9%',
            'z-index': 5
        },
        {
            'left': '71.5%',
            'top': '9.5%',
            'z-index': 5
        },
        {
            'left': '72.3%',
            'top': '16%'
        },
        {
            'left': '69.5%',
            'top': '20%',
            'z-index': 5
        },
        {
            'left': '71.5%',
            'top': '21.5%',
            'z-index': 5
        },
        {
            'left': '66.5%',
            'top': '27%'
        },
        {
            'left': '68.5%',
            'top': '32%'
        },
        {
            'left': '38.5%',
            'top': '4.5%',
            'z-index': 5
        },
        {
            'left': '37.5%',
            'top': '9%',
            'z-index': 5
        },
        {
            'left': '20%',
            'top': '46.5%'
        },
        {
            'left': '12.5%',
            'top': '46.5%',
            'z-index': 5
        },
        {
            'left': '12.5%',
            'top': '60%',
            'z-index': 5
        },
        {
            'left': '13.5%',
            'top': '72%',
            'z-index': 5
        },
        {
            'left': '8.5%',
            'top': '22.5%',
            'z-index': 5
        },
        {
            'left': '56%',
            'top': '-2%',
            'z-index': 5
        },
        {
            'left': '70.2%',
            'top': '19.5%'
        },
        {
            'left': '67%',
            'top': '16%',
            'z-index': 1
        },
        {
            'left': '67%',
            'top': '3.5%',
            'z-index': 1
        },
        {
            'left': '37.5%',
            'top': '2%'
        },
        {
            'left': '36%',
            'top': '10%'
        },
        {
            'left': '46%',
            'top': '57%',
            'z-index': 1
        },
        {
            'left': '51.5%',
            'top': '21%',
            'z-index': 1
        }
    ];
    var mark = $('.swiper6 .content .map .area');
    var des = $('.swiper6 .content .map .des');

    //设置每一个坐标
    $.each(arrArea, function(i, style) {
        mark.eq(i).css(style);
        des.eq(i).css(style).css('z-index',3);

    });

    var map = $('.swiper6 .content .map .map-bg');
    var mapBox = $('.swiper6 .content .map .area-box');
    //计算当前宽高比例
    var hRate;
    if (map.width() <= 1024) {
        hRate = map.height() / 1024;
    }else {
        hRate = map.height() / map.width();
    }

    updateHeight();
    $(window).resize(updateHeight);
    //根据宽高比例缩放存放背景图的父元素,让每一个坐标可以随地图缩放移动
    function updateHeight() {
        var boxHeight = hRate * mapBox.width();
        mapBox.height(boxHeight);
    }

    var timer;
    mark.each(function(i, ele) {
        var zIndex = $(ele).css('z-index');

        //鼠标移入已开发地图时放大,且显示描述信息
        $(ele).mouseenter(function() {
            $(ele).addClass('scale').css('z-index', 6);
            timer = setTimeout(function() {
                if (des.eq(i)) {
                    des.eq(i).css({
                        'display': 'inline-block',
                        'z-index': 6
                    }).animate({
                        'opacity': 1
                    }, 300);
                }
            },400)
        }).mouseleave(function() {
            clearTimeout(timer);
            $(ele).css('z-index',zIndex).removeClass('scale');
            if (des.eq(i)) {
                des.eq(i).stop().animate({'opacity': 0},300,function() {
                    $(this).css({
                        'display': 'none',
                        'z-index': 3
                    });
                });
            }
        });
    })



});