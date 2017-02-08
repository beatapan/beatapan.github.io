//section2

$(function () {

	var count=$(".m-slide>li").length;
	var index=0;
	var timer;
	function setTimer(){
		timer=setInterval(function  () {
			index++;
			$(".m-slide>li").eq(index%count).fadeIn().siblings().fadeOut();
			$(".num li").eq(index%count).addClass('active').siblings('li').removeClass('active');
		},1000)
	};

	setTimer();

	$(".m-slide").mouseover(function(event) {
		clearInterval(timer);
	}).mouseout(function(event) {
		setTimer();
	});

	$(".num li").mouseover(function(event) {
		clearInterval(timer);
		index=$(this).index(".num li");
		$(this).addClass('active').siblings().removeClass('active');
		$(".m-slide>li").eq(index).fadeIn().siblings().fadeOut();
	}).mouseout(function(event) {
		setTimer();
	});


	$(".section2 span").mouseover(function(event) {
		clearInterval(timer);
	}).mouseout(function(event) {
		setTimer();
	});

	$(".section2 .left").click(function(event) {
		index--;		
		$(".m-slide>li").eq(index%count).fadeIn().siblings().fadeOut();
		$(".num li").eq(index%count).addClass('active').siblings('li').removeClass('active');
	});
	$(".section2 .right").click(function(event) {
		index++;
		$(".m-slide>li").eq(index%count).fadeIn().siblings().fadeOut();
		$(".num li").eq(index%count).addClass('active').siblings('li').removeClass('active');
	});

});


//section5
	function imgReload(){
		var imgHeight = 0;
		var wtmp = $("body").width();
		$("#section5 ul li").each(function(){

	        $(this).css({width:wtmp + "px"});

	    });

		$(".sliderimg").each(function(){

			$(this).css({width:wtmp + "px"});

			imgHeight = $(this).height();

		});

	}

	$(window).resize(function(){imgReload();});



	$(document).ready(function(e) {

		imgReload();

	    var slider = $('#section5').unslider({

			dots: true,

			fluid: true

		}),

		data = slider.data('unslider');

		

		$('.unslider-arrow').click(function() {

	        var fn = this.className.split(' ')[1];

	        data[fn]();

	    });

	});
//section6

    $(function () {
        $('.section6 .gallery').eq(0).show('slow').siblings('.section6 .gallery').hide();
        $(".section6 .nav li").eq(0).addClass('current');

        $(".section6 .nav li").mouseover(function() {
            var preIndex = $('.section6 .current').index('.section6 .nav li');
            var index = $(this).index('.section6 .nav li');
            if (preIndex !== index) {
                $(this).addClass('current');
                $('.section6 .nav li').eq(preIndex).removeClass('current');
                $('.section6 .gallery').eq(index).stop(true,true).fadeIn('slow');
                $('.section6 .gallery').eq(preIndex).stop(true,true).fadeOut('slow', function() {
                    $(this).find('li').css({
                        left: 0,
                        top: 0
                    });
                });
                flow($('.section6 .gallery').eq(index));
            }
        });
    });

    // 流失布局原理：1.把所有的li的高度值放到数组里面
    //      2.第一行的top都为0
    // 	 3.计算高度值最小的值是哪个li
    // 	 4.把接下来的li放到那个li的下面
    var flow = function(elem) {
        var margin=10;//这里设置间距
        var li=elem.find('li');//这里是区块名称
        var li_W = li[0].offsetWidth+margin;//取区块的实际宽度（包含间距，这里使用源生的offsetWidth函数，不适用jQuery的width()函数是因为它不能取得实际宽度，例如元素内有pandding就不行了）

        var h = []; //记录区块高度的数组
        var n = $(".gallery").height() / li_W | 0; //模块的宽度除以区块宽度就是一行能放几个区块
        for (var i = 0; i < 6; i++) { //有多少个li就循环多少次
            li_H = li[i].offsetHeight; //获取每个li的高度
            if (i < n) { //n是一行最多的li，所以小于n就是第一行了
                h[i] = li_H; //把每个li放到数组里面
                li.eq(i).css("top", 0); //第一行的Li的top值为0
                li.eq(i).css("left", i * li_W); //第i个li的左坐标就是i*li的宽度
            } else {
                min_H = Math.min.apply(null, h); //取得数组中的最小值，区块中高度值最小的那个
                minKey = getarraykey(h, min_H); //最小的值对应的指针
                h[minKey] += li_H + margin; //加上新高度后更新高度值
                li.eq(i).css("top", min_H + margin); //先得到高度最小的Li，然后把接下来的li放到它的下面
                li.eq(i).css("left", minKey * li_W); //第i个li的左坐标就是i*li的宽度
            }

        }
    };
    /* 使用for in运算返回数组中某一值的对应项数(比如算出最小的高度值是数组里面的第几个) */
    var getarraykey = function(s, v) {
        for (k in s) {
            if (s[k] == v) {
                return k;
            }
        }
    };
    
    window.onload = function() {
        flow($('.gallery-1'));
    };
            




//section7
$(function () {

	var count=$(".slide li").length;
	var index=0;
	var timer;
	function setTimer(){
		timer=setInterval(function  () {
			index++;
			$(".slide li").eq(index%count).fadeIn().siblings().fadeOut();
			$(".section7 .num li").eq(index%count).addClass('active').siblings('li').removeClass('active');
		},1000)
	};

	setTimer();

	$(".slide").mouseover(function(event) {
		clearInterval(timer);
	}).mouseout(function(event) {
		setTimer();
	});

	$(".section7.num li").mouseover(function(event) {
		clearInterval(timer);
		index=$(this).index(".section7.num li");
		$(this).addClass('active').siblings().removeClass('active');
		$(".slide li").eq(index).fadeIn().siblings().fadeOut();
	}).mouseout(function(event) {
		setTimer();
	});


	$(".section7 span").mouseover(function(event) {
		clearInterval(timer);
	}).mouseout(function(event) {
		setTimer();
	});

	$(".section7 .left").click(function(event) {
		index--;		
		$(".slide li").eq(index%count).fadeIn().siblings().fadeOut();
			$(".section7 .num li").eq(index%count).addClass('active').siblings('li').removeClass('active');
	});
	$(".section7 .right").click(function(event) {
		index++;
		$(".slide li").eq(index%count).fadeIn().siblings().fadeOut();
		$(".section7 .num li").eq(index%count).addClass('active').siblings('li').removeClass('active');
	});

});



