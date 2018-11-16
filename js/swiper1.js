$(function() {
    var oLi = $('.swiper1 .banner-btn li.active');
    var oDiv = $('.swiper1 .banner-title .title.active');
    var oBg = $('.swiper1 .banner-bg video');
    var timer;
    var onceTimer;
    var leaveTimer;

    function updateActive() {
        oLi = $('.swiper1 .banner-btn li.active');
        oDiv = $('.swiper1 .banner-title .title.active');
    }

    function play(duration) {
        //传入动画时间参数
        var time = duration || 4000;
        oLi.find('.val').animate({width: '100%'},time,'linear',function() {
            oDiv.animate({top: -156, opacity: 0},function() {
                //被切换的标题位置重置
                $(this).css('top', '156px');
                //当前进度条清零
                oLi.find('.val').css('width', '0');
                //临界值判断
                if (oLi.index() === $('.swiper1 .banner-btn li').length - 1) {
                    oLi.removeClass('active');
                    $('.swiper1 .banner-btn li').eq(0).addClass('active');

                    oDiv.removeClass('active');
                    $('.swiper1 .banner-title .title').eq(0).addClass('active');
                }else {
                    oLi.removeClass('active').next().addClass('active');
                    oDiv.removeClass('active').next().addClass('active');
                }

                //更新active
                updateActive();
                //视频渐变切换
                oBg.parent().css('display','none');
                oBg.attr('src', 'video/video' + (oLi.index() + 1) + '.mp4');
                oBg.parent().fadeIn();
                //下一个标题上浮
                oDiv.css({'display': 'block', 'opacity': 0}).animate({top: 0, opacity: 1});
            })
        });
    }
    autoPlay();

    function autoPlay() {
        play();
        timer = setInterval(play, 4500);
    }

    function stopPlay() {
        updateActive();
        clearInterval(timer);
        clearTimeout(onceTimer);
        oLi.find('.val').stop(true);
        //切换标题动画需要执行到底再清空队列
        oDiv.stop(true, true);
    }


    //条形按钮移入事件
    $('.swiper1 .banner-btn').hover(function() {
        stopPlay();
        clearTimeout(leaveTimer);
    }, function() {
        //设置延迟让下一张图片动画完成后再执行函数
        leaveTimer = setTimeout(function() {
            stopPlay();

            //计算当前进度条剩余
            var currentW = oLi.find('.val').width();
            var dur = (1 - currentW / $('.swiper1 .banner-btn li').width()) * 5000;
            //根据剩余度判断继续执行动画的时间
            play(dur);
            //执行完后继续自动播放
            onceTimer = setTimeout(autoPlay, dur+500);
        },700);
    });

    //条形按钮点击事件
    $('.swiper1 .banner-btn li').each(function() {
        $(this).click(function() {
            //禁止连点
            if ($(this).hasClass('active')) {
                return null;
            }else {
                stopPlay();
                var self = this;
                var i = $(self).index();
                //当前标题和进度条结束动画
                oLi.removeClass('active').find('.val').css('width', '0');
                oDiv.animate({top: -156, opacity: 0},function() {
                    $(this).css('top', '156px').removeClass('active');
                    $(self).addClass('active');
                    $('.swiper1 .banner-title .title').eq(i).addClass('active').css({'display': 'block', 'opacity': 0}).animate({top: 0, opacity: 1});
                    oBg.parent().css('display','none');
                    oBg.attr('src', 'video/video' + (i + 1) + '.mp4');
                    oBg.parent().fadeIn();
                    updateActive();
                    autoPlay();
                });
            }
        })
    })

});