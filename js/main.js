$(function() {
    $(window).resize(navResize);
    navResize();
    function navResize() {
        //窗口宽度1400px为临界值进行判断
        if ($(window).width() <= 1400) {
            $('.header .head-nav .nav-list li').each(function(i, li) {
                //窗口缩小则后几个导航隐藏
                if (i >= 4) {
                    $(li).css('display','none');
                }
            });
            //归为更多
            $('.header .head-nav .nav-list li').eq(-1).css('display','inline-block');
        }else {
            $('.header .head-nav .nav-list li').each(function(i, li) {
                if (i >= 5) {
                    $(li).css('display','inline-block');
                }
            });
            //更多按钮隐藏
            $('.header .head-nav .nav-list li').eq(-1).css('display','none');
        }
    }
});


//左边侧栏
$(function() {

    //更新菜单总宽度
    function updateListWidth(ele) {
        $('.menu-list').width( $('.menu-list').width() + ele.width() );
    }

    //菜单回退
    function reset(ele,type,callBack) {
        var wid = ele.width();
        if (type === 'css') {
            ele.css({
                'display': 'none',
                'left': -wid
            })
        }else if (type === 'animate') {
            ele.stop().animate({left: -wid}, 200, function() {
                $(this).css('display','none');
                //重置总宽度
                $('.menu-list').width( $('.menu-list').width() - wid );
                if (callBack) callBack()
            })
        }
    }

    //菜单扩展
    function run(ele,callBack) {
        ele.css('display', 'block').stop().animate({left: 0}, 200, function() {
            if (callBack) callBack()
        });
    }

    //设置各级菜单初始位置
    $('.menu-list>div').each(function() {
        reset($(this), 'css');
    });

    $('.head-menu').hover(function() {
        //扩展列表宽度
        updateListWidth( $('.fir-menu') );
        //显示一级菜单
        run( $('.fir-menu') );
    },
        function() {
        var currentWidth = $('.menu-list').width();
        if (currentWidth > 480) {
            reset( $('.thi-menu'), 'animate', function() {
                reset( $('.sec-menu'), 'animate', function() {
                    reset( $('.fir-menu'), 'animate' )
                } )
            });
        }else if (currentWidth > 240) {
            reset( $('.sec-menu'), 'animate', function() {
                reset( $('.fir-menu'), 'animate' )
            } )
        }else if (currentWidth <= 240) {
            reset( $('.fir-menu'), 'animate' );
        }

    });

    //移入一级菜单
    $('.fir-item').each(function(i, ele) {
        $(ele).mouseenter(function() {
            //判断是否存有扩展3级菜单,有则回退
            if ($('.menu-list').width() > 500) {
                reset( $('.thi-menu'), 'animate' );
            }
            //判断扩展列表宽度
            if ($('.menu-list').width() < 300) {
                updateListWidth( $('.sec-menu') );
            }
            //排他,显示选中一级菜单对应的二级菜单
            $('.sec-item').eq(i).css('display','block')
                .siblings().css('display','none');
            //执行动画
            run($('.sec-menu'));
        })
    });

    //利用菜单图标的父元素实现二级菜单的回退
    $('.icon-full').mouseenter(function() {
        //先判断是否有展开菜单
        if ( $('.menu-list').width() > 300 ) {
            reset( $('.sec-menu'), 'animate');
        }

    });

    //移入二级菜单
    $('.sec-item li').each(function(i, ele) {
        $(ele).mouseenter(function() {
            //扩展列表宽度
            if ($('.menu-list').width() < 500) {
                updateListWidth( $('.thi-menu') );
            }

            //找到对应一级菜单
            var index = $(this).parent().index();
            //再从对应索引找到目标三级菜单,并做排他处理
            $('.thi-menu').find('.fir-' + index)
                .find('.thi-item').eq(i).css('display','block')
                .siblings().css('display','none');
            //执行动画
            run($('.thi-menu'));
        })
    });

});


//导航栏下拉菜单
$(function() {
    var timer;
    var cssName;

    $('.head-nav .nav-list li').each(function() {

        $(this).mouseenter(function() {
            clearTimeout(timer);

            var self = this;
            //记录当前li的位置和宽度
            var distance = $(this).offset().left,
                liWidth = $(this).outerWidth();
            $('.head-nav .underline').stop().animate({
                left: distance,
                width: liWidth
            });

            //判断是否有下拉菜单,有则下拉
            timer = setTimeout(function() {
                cssName = "." + $(self).attr('class');
                if (/bind/.test(cssName)) {
                    var dropCss = "." + cssName.slice(6);
                    $(dropCss).slideDown().siblings().css('display', 'none');
                }
            }, 400);
        });
    });

    $('.head-nav').mouseleave(function() {
        clearTimeout(timer);

        //讲当前菜单折叠
        if (/.bind/.test(cssName)) {
            var dropCss = "." + cssName.slice(6);
            $(dropCss).slideUp();
        }

        //导航栏条形宽度归零
        $('.head-nav .underline').stop().animate({
            width: 0
        });

    });
});