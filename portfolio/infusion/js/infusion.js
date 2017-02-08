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
$(function(){
	var oSlide=$(".c-slide");
	var oRight = $("#right");
    var oLeft = $("#left");
    var oWidth = parseInt(oSlide.css('width')) / 6;
    // var oHeight=$(".c-slide .img").innerHeight();
    // console.log(oHeight);
    var oSpan = $(".btns span");
    var len = 4;
    var index = 1;
    var timer = null;
    oSlide.css('left',-oWidth);

    function animate(offset){                               //过渡效果
	    var newLeft = parseInt(oSlide.css('left')) + offset;         //点击后的图片偏移量
	    oSlide.animate({'left':newLeft + 'px'},function(){
	        if(newLeft > 0){                                 //判断图片是否已经循环一次
	            oSlide.css('left',-oWidth * len);
	        }
	        if(newLeft < -oWidth * 4){
	            oSlide.css('left',-oWidth);
	        }
	    });
	}

  	function showBtns(){                //按钮过渡
        oSpan.each(function(){                  //遍历每个按钮将其Class设置为空
            $(this).attr('class','');
        });
        $(".btns > span").eq(index - 1).addClass('on');          //将当前Span的索引Class设置为on
    }

 	function autoplay(){                        //自动播放
        timer = setTimeout(function(){
            oRight.trigger('click');
            autoplay();
        },3000);
    }

    oSlide.on('mouseover',function(){            //判断鼠标是否在容器上面
        clearInterval(timer);
    });

    oSlide.on('mouseout',function(){
        autoplay();
    });

    oRight.on('click',function(){
        if(oSlide.is(':animated')){
            return;
        }
        if(index == 4){         //向右点击 index索引+1
            index = 1;
        }else{
            index += 1;
        }
        animate(-oWidth);
        showBtns();
    });

    oLeft.on('click',function(){
        if(oSlide.is(':animated')){
            return;
        }
        if(index == 1){         //向左点击 index索引-1
            index = 4;
        }else{
            index -= 1;
        }
        animate(oWidth);
        showBtns();
    });

    oSpan.each(function(){                  //底部按钮点击切换图片
	    $(this).on('click',function(){
	        if(oSlide.is(":animated") || $(this).attr('class') == "on"){
	            return;
	        }
	        var myIndex = $(this).attr('index');
	        var offset = (myIndex - index) * -oWidth;
	        index = myIndex;
	        animate(offset);
	        showBtns();
	    })
	})

	autoplay();






})
//section6

    $(function () {
        var index=0;
         $('.section6 .gallery').eq(0).show('slow').siblings('.section6 .gallery').hide();
  

        $(".section6 li a").mouseover(function() {
            index = $(this).index('.section6 li a');
            $('.section6 .gallery').eq(index).fadeIn('slow').siblings('.section6 .gallery').fadeOut('slow');

        });

    });

// 流失布局原理：1.把所有的li的高度值放到数组里面
//      2.第一行的top都为0
// 	 3.计算高度值最小的值是哪个li
// 	 4.把接下来的li放到那个li的下面
    $(function(){
    	var margin=10;//这里设置间距
    	var li=$(".gallery li");//这里是区块名称
    	var	li_W = li[0].offsetWidth+margin;//取区块的实际宽度（包含间距，这里使用源生的offsetWidth函数，不适用jQuery的width()函数是因为它不能取得实际宽度，例如元素内有pandding就不行了）

    	

    	function flow(){
    		var h=[];//记录区块高度的数组
    		var n = $(".gallery").height()/li_W|0;//模块的宽度除以区块宽度就是一行能放几个区块
			for(var i = 0;i < 6;i++) {//有多少个li就循环多少次
				li_H = li[i].offsetHeight;//获取每个li的高度
				if(i < n) {//n是一行最多的li，所以小于n就是第一行了
					h[i]=li_H;//把每个li放到数组里面
					li.eq(i).css("top",0);//第一行的Li的top值为0
					li.eq(i).css("left",i * li_W);//第i个li的左坐标就是i*li的宽度
					}
				else{
					min_H =Math.min.apply(null,h) ;//取得数组中的最小值，区块中高度值最小的那个
					minKey = getarraykey(h, min_H);//最小的值对应的指针
					h[minKey] += li_H+margin ;//加上新高度后更新高度值
					li.eq(i).css("top",min_H+margin);//先得到高度最小的Li，然后把接下来的li放到它的下面
					li.eq(i).css("left",minKey * li_W);	//第i个li的左坐标就是i*li的宽度
				}
				
			}
    	}
    	/* 使用for in运算返回数组中某一值的对应项数(比如算出最小的高度值是数组里面的第几个) */
		function getarraykey(s, v) {for(k in s) {if(s[k] == v) {return k;}}}
		/*这里一定要用onload，因为图片不加载完就不知道高度值*/
		window.onload=function(){
			flow();
		}


    });
            




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



