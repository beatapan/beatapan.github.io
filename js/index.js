$(function(){
	
	//技能显示区
	(function(){
		$(".skill span").mouseover(function(){

			$(".skill span a").hide();

			var oWidth=$(this).find('em').html();
			$(this).find('a').css('width', oWidth);
			$(this).find('a').show();
			
		});
	})();

	//菱形显示区
	(function(){
		$('.diamond').mouseover(function(){
			$(this).find('a').addClass('animated shake')
		});

	})();

	//左右轮播切换
	(function(){
		var length=$(".scroll ul li").size();
		$(".scroll").find('li').eq(0).show();
		var index=0;
		var t=setInterval(moveRight,1000);
		$(".scroll").hover(function() {
			clearInterval(t);
			}, function() {
				t=setInterval(moveRight,1000)
			});
		$(".btn_left").click(function(){
			moveLeft();
		});
		$(".btn_right").click(function(){
			moveRight();
		});


		function moveLeft(){
			index--;
			if(index==-1){
				i=length-1;
			};
			$(".scroll li").eq(index).fadeIn().siblings('li').fadeOut(300)
		};
		function moveRight(){
			index++;
			if(index==length){
				index=0;
			};
			$(".scroll li").eq(index).fadeIn(300).siblings('li').fadeOut(300)
		}




	})();

})