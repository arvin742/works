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
			$m_cl_a = $('.menu .nav-child a');
			
		//手机侧栏
		$menu.on('click', function(e){
			e.stopImmediatePropagation();
			$('.warpper').toggleClass('on');
		});
		$('header .menu, header .nav-right').on('click', function(e){
			e.stopImmediatePropagation();
		});
		$(document).click('click', function(){
			$('.warpper').removeClass('on');
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
		//显示弹窗
		var fiexd_btn = $('.fiexd-btn');
		fiexd_btn.on('click', function(){
			$('.nav-fiexd').fadeIn();
		});
		
		//关闭弹窗
		var $close = $('.nav-fiexd').find('.btn-close');
		$close.on('click', function(){
			$fiexd.fadeOut();
		});
		
		//上传图片
		var fiexd_file = $('.form input[type=file]');
		fiexd_file.on('change', function(){
			var val = $(this).val();
			$(this).parent().find('input[type=text]').val(val);
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
	}
	
	var content = function(){
		var $dom = $('.nav-body'),
			$check_all = $dom.find('.check-all'),
			$all_btn = $check_all.find('.all');
		
		//全选
		$all_btn.on('click', function(){
			var $check = $(this).parents('.check-all').find('.check input');
			
			if($(this).hasClass('on')){
				$(this).find('i').addClass('fa-square-o').removeClass('fa-check-square-o');
				$check.prop('checked', false);
			}	else{
				$(this).find('i').addClass('fa-check-square-o').removeClass('fa-square-o');
				$check.prop('checked', true);
			}
			
			$(this).toggleClass('on');
		});
	}
	
	headDOM();
	publicDOM();
	content();
});