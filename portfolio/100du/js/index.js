		$(function (){
			
			//搜索切换
			(function(){
				var aLi=$("#menu li"); 
				var oText=$('#search').find('.text');
				var arrText=[
				'例如：荷棠鱼坊烤鱼 或 樱花日本料理',
				'例如：昌平区新站龙骑广场2号楼7089室',
				'例如，万达影城双人情侣券',
				'例如：东莞出事了',
				'例如：北京下雪了'];
				var iNow=0;
				oText.val(arrText[0]);
				aLi.each(function(index){
					$(this).click(function(){
						aLi.attr('class','gradient');
						$(this).attr('class','active');
						iNow=index;
						oText.val(arrText[index]);

					})
				})
				oText.focus(function(){
					if($(this).val()==arrText[iNow]){
						$(this).val("");
					}
					
				})
				oText.blur(function(){
					if($(this).val()==''){
						$(this).val(arrText[iNow]);
					}
					
				});

			})();
			//update文字弹性滑动
			(function(){
				var oUl=$('.update ul');
				
				var arrData=[
				{'name':'萱萱','time':'4','title':'那些灿烂美好的瞬间','url':'https://www.baidu.com/'},
				{'name':'美美','time':'5','title':'那些灿烂美好的瞬间','url':'https://www.baidu.com/'},
				{'name':'东东','time':'6','title':'那些灿烂美好的瞬间','url':'https://www.baidu.com/'},
				{'name':'西西','time':'7','title':'那些灿烂美好的瞬间','url':'https://www.baidu.com/'},
				{'name':'萱萱','time':'8','title':'那些灿烂美好的瞬间','url':'https://www.baidu.com/'},
				{'name':'美美','time':'9','title':'那些灿烂美好的瞬间','url':'https://www.baidu.com/'},
				{'name':'东东','time':'10','title':'那些灿烂美好的瞬间','url':'https://www.baidu.com/'},
				{'name':'西西','time':'11','title':'那些灿烂美好的瞬间','url':'https://www.baidu.com/'},
				];
				
				var str='';
				var oBtnUp=$('#updateUpBtn');
				var oBtnDown=$('#updateDownBtn');
				var iNow=0;
				var timer=null;
				for(var i=0;i<arrData.length;i++){
					str+='<li><a href="'+arrData[i].url+'"><strong>'+arrData[i].name+'</strong><span> '+arrData[i].time+'分钟前</span>写了一篇新文章：'+arrData[i].title+'…</a></li>'
				}
				oUl.html(str);
				var iH=oUl.find('li').height();
				oBtnUp.click(function(){
						doMove(-1);
				})
				oBtnDown.click(function(){
						doMove(1);
				})
				$('.update').hover(function(){
					clearInterval(timer);

				},autoPlay)

				function autoPlay(){
					timer=setInterval(function(){

						doMove(-1);
					},1500)

				}
				autoPlay();
				function doMove(num){
					iNow+=num;
					if (Math.abs(iNow) > arrData.length-1) {
						iNow=0;

					};
					if (iNow>0) {
						iNow=-(arrData.length-1);
					};
					oUl.stop().animate({'top':iH*iNow},2000,'elasticOut')
				}

			})();

			//options选项卡切换

			(function(){
				fnTab($('.tabNav1'),$('.tabCon1'));
				fnTab($('.tabNav2'),$('.tabCon2'));
				fnTab($('.tabNav3'),$('.tabCon3'));
				fnTab($('.tabNav4'),$('.tabCon4'));
				// fnTab2($('.tabNav5'),$('.tabCon5'));

				function fnTab(oNav,aCon){
					var aElem=oNav.children();
					aCon.hide().eq(0).show();
					aElem.each(function(index){
						$(this).click(function(){
							aElem.removeClass('active').addClass('gradient');
							$(this).removeClass('gradient').addClass('active');
							aElem.find('a').attr('class','triangle_down_gray')
							$(this).find('a').attr('class','triangle_down_red')

							aCon.hide().eq(index).show();

						})

					})

				}
				
				// function fnTab2(oNav,aCon){
				// 	var aElem=oNav.children();
				// 	aCon.hide().eq(0).show();
				// 	aElem.each(function(index){
				// 		$(this).mouseover(function(){
				// 			aElem.removeClass('active');
				// 			$(this).addClass('active');
				// 			aCon.hide().eq(index).show();

				// 		})

				// 	})

				// }

			})();
			//自动播放的焦点图
			(function(){
				var oDiv=$('#fade');
				var aUlLi=oDiv.find('ul li')
				var aOlLi=oDiv.find('ol li');
				var oP=oDiv.find('p');
				var iNow=2;
				var timer=null;
				var arr=['爸爸去哪儿啦~','人群中的星星','美丽大方'];
				oDiv.hover(function(){
					clearInterval(timer)

				},autoPlay)

				fnFade();
				aOlLi.click(function(){
					iNow=$(this).index();
					fnFade();
				});
				function autoPlay(){
					timer=setInterval(function(){
						iNow++;
						iNow%=arr.length;
						fnFade();
					},1000)
				}
				autoPlay();
				function fnFade(){
					aUlLi.each(function(i){
						if(i!=iNow){
							aUlLi.eq(i).fadeOut().css('z-index','1');
							aOlLi.eq(i).removeClass('active')
						}else{
							aUlLi.eq(i).fadeIn().css('z-index','2');
							aOlLi.eq(i).addClass('active')
						}
					});
					oP.text(arr[iNow])
				}
			})();
			//日历提示层
			(function(){
				var aSpan=$('.calendar h3 span');
				var aImg=$('.calendar .img');
				var oPrompt=$('.today_info');
				var oImg=oPrompt.find('img');
				var oStrong=oPrompt.find('strong');
				var oP=oPrompt.find('p');
				
				aImg.hover(function() {
					var iTop=$(this).parent().position().top-30;
					var iLeft=$(this).parent().position().left+55;
					var index=$(this).parent().index()%aSpan.size()

					oPrompt.show().css({'left':iLeft,'top':iTop});
					oP.text($(this).attr('info'));
					oImg.attr('src',$(this).attr('src'));
					oStrong.text(aSpan.eq(index).text());


					

				}, function() {
					oPrompt.hide();
				});;

			})();
			//bbs高亮
			(function(){
				$('.bbs ol li').mouseover(function(){
					$('.bbs ol li').removeClass('active').eq($(this).addClass('active'));

				});
			})();
			//hot鼠标提示效果
			(function(){
				$('.hot_area li').mouseover(function(){
					$('.hot_area li p').remove();
					$(this).append('<p style="width:'+($(this).width()-12)+'px;height:'+($(this).height()-12)+'px;"></p>');
				})

			})();

		})