$(function () {
    //点击点击第三张图片正常运行
    if($(".computer").width()==675){
        $(".road-three").click(function () {
            $(this).animate({
                width:675
            }).siblings(".jump").animate({
                width:172
            });
            if($(".road-three").width()==675){
                $(".jump").animate({
                    width:0
                })
            }
        });
    }
    //设置图片的左右伸缩
    $(".jump").each(function () {
        $(this).click(function () {
            $(this).removeClass("scale").siblings().addClass("scale");
            $(this).children("p").css({
                'text-align': 'center'
            });
            $(this).animate({
                width: '50%'
            }).siblings().animate({
                width: '12.5%'
            });
        });
    });
    //图片设置高亮
    $(".scale").mouseenter(function () {
        $(this).addClass("loud").siblings().removeClass("loud");
    });
    $(".pump").click(function () {
        $(this).animate({
            width: '50%'
        }).siblings(".road-queen").animate({
            width: '12.5%'
        });
        $(".road-three").animate({
            width: '12.5%'
        })
    });
    //设置按钮的盒子点击事件
    $(".road-four").click(function () {
        //当带有computer的元素宽度不等于0,执行
        if ($(".computer").width() != 0) {
            $(this).children("p").css({
                "transform": "rotateY(180deg)",
                "transition": "0.5s"
            });
            $(".road-three").animate({
                width: '50%'
            },function () {
                $(this).find(".ten").css({
                    "display":"none"
                });
                $(this).find(".first").css({
                    "display":"inline-block"
                })
            });
            $(".run-left").animate({
                width: 0
            }, function () {
                $(this).css({
                    "display": "none"
                });
            });
            $(".pump").animate({
                width: "12.5%"
            });
        }
        //当带有computer的元素宽度等于0,执行
        else {
            $(this).children("p").css({
                "transform": "rotateY(360deg)",
                "transition": "0.5s"
            });
            $(".computer").css({
                "display": "inline-block"
            }).animate({
                width: '50%'
            });
            $(".bored").css({
                "display": "inline-block"
            }).animate({
                width: '12.5%'
            });
        }

        //按键回退时,带有first的元素消失
        $(".first").css({
            "display": "none"
        });
        //按键回退时,带有ten的元素显现
        $(".ten").css({
            "display": "inline-block"
        });
        //按键回退时,带有ear的元素显现
        $(".ear").css({
            "display": "inline-block"
        });
        //按键回退时,带有ground的元素消失
        $(".ground").css({
            "display": "none"
        });
    });
    //设置图片点击事件
    $(".clear").click(function () {

        //自己子节点带有ten的消失
        $(this).children(".ten").css({
            "display": "none"
        });


        //自己兄弟元素的子节点带有ten的出现
        $(this).siblings().children(".ten").css({
            "display": "inline-block"
        });


        //自己子节点带有first的显现
        $(this).children(".first").css({
            "display": "inline-block"
        });


        //自己兄弟元素的子节点带有first的消失
        $(this).siblings().children(".first").css({
            "display": "none"
        });

    })
});