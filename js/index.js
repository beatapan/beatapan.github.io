$(function(){
	var flag = false;
	$('#m-header').height($(window).height());

	//技能显示区
	$(window).scroll(function(event) {
		if (!flag) {
			var stp = $(window).scrollTop();
			if (stp > 850) {
				flag = true;
				$(".skill span").each(function(index, el) {
					var oWidth = $(el).data('percent') + '%';
					$(el).find('a').find('em').html(oWidth);
					$(el).find('a').animate({width: oWidth}, 1000);
				});
			}
		}
	});

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