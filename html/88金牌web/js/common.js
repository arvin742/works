!function (o) {
  "use strict";
  o.fn.toTop = function (t) {
    var i = this, e = o(window), s = o("html, body"), n = o.extend({autohide: !0, offset: 420, speed: 500, position: !0, right: 10, bottom: 70}, t);
    i.css({cursor: "pointer"}), n.autohide && i.css("display", "none"), n.position && i.css({position: "fixed", right: n.right, bottom: n.bottom}), i.click(function () {
    s.animate({scrollTop: 0}, n.speed)
  	}), e.scroll(function () {
    var o = e.scrollTop();
    n.autohide && (o > n.offset ? i.fadeIn(n.speed) : i.fadeOut(n.speed));
  	})
	}
}(jQuery);

(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      if(clientWidth>=640){
        docEl.style.fontSize = '16px';
      }else{
        docEl.style.fontSize = 23.8933333 * (clientWidth / 640) + 'px';
      }
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

$(function(){
	
	var headDOM = function(){
		var $menu = $('.nav-btn'),
			$itemd = $('.nav-itemd'),
			$dropdwon = $('.nav-itemd>a'),
			$child = $itemd.find('.nav-child'),
			$m_it_a = $('.menu .nav-item>a'),
			$m_cl_a = $('.menu .nav-child a'),
			$nav_htr_a = $('.nav-left ul li a');
			
		//手机侧栏
		$menu.on('click', function(e){
			e.stopImmediatePropagation();
			$('.warp').toggleClass('on');
		});
		$('header .menu, header .nav-right').on('click', function(e){
			e.stopImmediatePropagation();
		});
		$(document).click('click', function(){
			$('.warp').removeClass('on');
		});
		
		//导航的下拉
		if($(window).width() > 991){
			var $h_itemd = $('header .nav-itemd'),
				$h_child = $h_itemd.children('.nav-child'),
				$h_down = $h_itemd.children('a');

			$h_down.unbind();
			$h_itemd.on('mouseover', function(){
				$(this).children('.nav-child').show();
				$(this).addClass('active');
			});
			$h_itemd.on('mouseout', function(){
				$(this).children('.nav-child').hide();
				$(this).removeClass('active');
			});
		}	else{
			$dropdwon.on('click', function(e){
				stopDefault(e);
				
				if($(this).parent().hasClass('active')){
					$(this).parent().children('.nav-child').fadeOut();
					$(this).parent().removeClass('active');
				}	else{
					$(this).parent().children('.nav-child').fadeIn();
					$(this).parent().addClass('active');
				}
			});
		}
		
		$m_it_a.each(function(){
			if($(this)[0].href == String(window.location)){
				$(this).parent().addClass('active').siblings().removeClass('active');
			}
		});
		$m_cl_a.each(function(){
			if($(this)[0].href == String(window.location)){
				$(this).parent().addClass('active');
		    $(this).parents('.nav-itemd').addClass('active').siblings().removeClass('active');
			}
		});

		$nav_htr_a.each(function(){
			if($(this)[0].href == String(window.location)){
				$(this).parent().addClass('active').siblings().removeClass('active');
			}
		});
		
		function stopDefault(e){
			e = e || window.event; 
	    if( e && e.preventDefault ){
	    	e.preventDefault();
	    }	else{
	    	window.event.returnValue = false;
	    }
		}
	}
	
	var publicDOM = function(){
		//调用成功页面
		var $suc = $('.nav-success'),
			$s_btn = $suc.find('.btn');
		
		$s_btn.on('click', function(){
			$suc.fadeOut();
		});
		
		//关闭弹窗
		var $fiexd = $('.nav-fiexd'),
			$close = $fiexd.find('.btn-close');
			
		$close.on('click', function(){
			$fiexd.fadeOut();
		});
		
		//调用导航的修改密码
		var user_pwd = $('.user-pwd');
		user_pwd.on('click', function(){
			$('.nav-pwd').fadeIn();
		});
		
		//调用修改页面
		var $edit = $('.nav-edit'),
			$e_colse = $edit.find('.btn-close');
		
		$e_colse.on('click', function(){
			$edit.fadeOut();
			$edit.find('.form').fadeOut();
		});
		
		//发送验证码倒计时
		var $e_btn = $('.form .email .btn');
		var e_time;
		
		$e_btn.on('click', function(){
			var count = 60, $btn = $(this);
			$btn.attr('disabled', true);
			countDown($btn, count);
		});
		
		//选项卡
		var $tab = $('.tab-content'),
			$nav_tab = $('.nav-tabs'),
			$nav_li = $nav_tab.find('li'),
			$nav_a = $nav_tab.find('a');
			
		$tab.children().eq(0).fadeIn().siblings().hide();
		$nav_li.on('click', function(){
			var idx = $(this).index();
			$tab.children().eq(idx).fadeIn().siblings().hide();
		});
		
		$nav_a.each(function(){
			if($(this)[0].href == String(window.location.protocol + '//' + window.location.host + window.location.pathname)){
				$(this).parents('.nav-tabs').find('a').removeClass('active');
				$(this).addClass('active');
			}
		});
		
		//分页
		var $page = $('.pagination'),
			$page_a = $page.find('a');
			
		$page_a.each(function(){
			if($(this)[0].href == String(window.location.protocol + '//' + window.location.host + window.location.pathname)){
				$(this).parent().addClass('active').siblings().removeClass('active');
			}
		});
		
		/*----------------------------------------*/
		//修改密码
		var $pwd = $('.nav-pwd'),
			$p_btn = $pwd.find('.submit .btn');
			
		$p_btn.on('click', function(){
			
			$close.click();
			sucShow('修改成功', '您的密码已修改成功，请点击完成关闭此弹窗！');
		});
		
	}
	
	headDOM();
	publicDOM();
	
});

function sucShow(title, info){
	var $dom = $('.nav-success');
	$dom.find('.h3').text(title);
	$dom.find('.h5').text(info);
	$dom.fadeIn();
}

function countDown($btn, count){
	var e_time;
	
	$btn.text(count + 's');
	count--;
	
	e_time = setTimeout(function(){
		if(count <= 0){
			$btn.text('发送');
			$btn.attr('disabled', false);
			clearTimeout(e_time);
			return false;
		}
		
		countDown($btn, count);
	}, 1000);
}