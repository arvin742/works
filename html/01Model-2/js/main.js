!function (o) {
	"use strict";
	o.fn.toTop = function (t) {
		var i = this, e = o(window), s = o("html, body"), 
		n = o.extend({autohide: !0, offset: 420, speed: 500, position: !0, right: 10, bottom: 70}, t);
		i.css({cursor: "pointer"}), n.autohide && i.css("display", "none"), n.position && i.css({position: "fixed", right: n.right, bottom: n.bottom}), 
		i.click(function () {s.animate({scrollTop: 0}, n.speed)}), e.scroll(function () {var o = e.scrollTop();n.autohide && (o > n.offset ? i.fadeIn(n.speed) : i.fadeOut(n.speed));})
	}
}(jQuery);

$(function () {
	if($(window).width() > 992) {
		$(document).off('click.bs.li.dropdown.data-api');
		$(".navbar a").removeAttr('data-toggle');
		
		$(".navbar li.dropdown").mouseover(function(){
			$(this).addClass("open");
			$(this).children('.dropdown-menu').addClass("open");
		}).mouseout(function(){
			$(this).removeClass("open");
			$(this).children('.dropdown-menu').removeClass("open");
		});
		
	}	else {
		$('header .menu .dropdown').off().on('mouseout', function(e){
			return false;
			
			e = window.event || e;
			obj = $(e.srcElement || e.target);
			
			if(!$(obj).is('a.dropdown-toggle'))	return false;
			$(this).removeClass('open');
		});
		$('header .menu .dropdown>a').off().on('mouseover', function(e){
			return false;
			
			e = window.event || e;
			obj = $(e.srcElement || e.target);
			
			if(!$(obj).is('a.dropdown-toggle'))	return false;
			$(this).parent().addClass('open');
		});
	}
	
	$('.menu>li>a').each(function(){
		if($(this)[0].href == String(window.location)) {
			$(this).parent().addClass('active').siblings().removeClass('active');
		}
	});
	$('.dropdown-menu li a').each(function(){
		if($(this)[0].href == String(window.location)) {
			$(this).parent().addClass('active');
			$(this).parents('li.dropdown').addClass('active').siblings().removeClass('active');
		}
	});
	$('.tab-list>li>a').each(function(){
		if($(this)[0].href == String(window.location)){
			$(this).parent().addClass('active').siblings().removeClass('active');
		}
	});
	$('.product-menu .product-nav>li>a').each(function () {
		if($(this)[0].href == String(window.location)) {
			$(this).parent().addClass('active').siblings().removeClass('active');
		}
	});
	$('.product-menu .product-nav>li>ul>li>a').each(function () {
		if($(this)[0].href == String(window.location)) {
			$(this).parent().parent().parent().addClass('active').siblings().removeClass('active');
			$(this).parent().addClass('active').siblings().removeClass('active');
		}
	});
	
	$('#contact-btn').click(function(e) {
		e.stopImmediatePropagation();
		$('.a-form').animate({ 'left': 0 });
		
		$(document).click(function(e) {
			e = window.event || e;
			obj = $(e.srcElement || e.target);
			
			if(!$(obj).is('.poster-btn') && !$(obj).is('li.vertical')){
				$('.a-form').animate({ 'left': '-28rem' });
			}
		});
	});
	$('.a-form form').click(function(e){
		e.stopImmediatePropagation();
	});
	
	$(document).on('click', "#category", function(){
		$(this).next().toggle();
	});
	
	$('.a-share .h4').text(parseInt(Math.random() * (3500 - 300 + 1) + 300));
  
  $("footer .link").find("p").append("<a href='javascript:void(0);' id='link-btn'>more</a>");
 		var i=0;
  	$("#link-btn").click(function(){if(i==0){$(".hide-content").show();i=1;$("#link-btn").text("less");}else {$(".hide-content").hide();i=0;$("#link-btn").text("more");}
  });

});

$(function () {
	
	var auto = (function(){
		var win_w = 0, win_h = 0;
		
		var banVideo = function(){
			var vh = win_w * 9 / 16;
			$('.index-banner div.video-js, .index-banner video').css({'width': win_w, 'height': vh});
		};
		
		var banInner = function(){
			var $banner = $('.banner'), ban_h = 'auto';
			
			if(win_w < 768){
				var ban_h = $banner.find('.img').height() ? $banner.find('.img').height() : 0;
			}
			$banner.height(ban_h);
		};
		
		var autoSize = function(){
			win_w = $(window).width(),
			win_h = $(window).height();
			
			banVideo();
			banInner();
		};
		
		autoSize();
		$(window).resize(function(){
			autoSize();
		});
	})();
	
	var scroll = (function(){
		$(window).scroll(function(){
			var $header = $('.header'),
				$header_th = ($header.height() ? $header.height() : 0),
				top = $(this).scrollTop();
				
			if($(window).width() < 992)	return false;
			
			if(top > 0) {
				$header.addClass('shadow');
				$header.find('.htr-link').hide();
			}	else{
				$header.removeClass('shadow');
				$header.find('.htr-link').show();
			}
			
			var $aside_scroll = $('.aside .aside-scroll'),
				$aside_th = $aside_scroll.height(),
				$aside_top = $aside_scroll.length > 0 ? $aside_scroll.parent().offset().top : 0;
			var $aside_main = $('.aside .aside-main').height();
			
			if($aside_th <= $aside_main){
				if(top <= $aside_top){
					$aside_scroll.parent('.aside').removeClass('on');
					$aside_scroll.css('top', 0);
				}	else if(top > $aside_top && top < ($aside_top + $aside_main - $aside_th)){
					$aside_scroll.parent().addClass('on');
					$aside_scroll.css('top', $header_th + 10);
				}	else{
					$aside_scroll.css('top', $aside_top + $aside_main - $aside_th - top);
				}
			}
			
		});
	})();
	
	var header = (function(){
		var $header = $('.header');
		
		$header.on('click', '.navbar-toggle', function(){
			$header.toggleClass('on');
			
			if($header.hasClass('on')){
				$('body').css('overflow-y', 'hidden');
			}	else{
				$('body').css('overflow-y', 'auto');
			}
		});
		
		$(document).click(function(){
			$header.find('.search').fadeOut();
		});
		$header.on('click', '.btn-search', function(e){
			e.stopImmediatePropagation();
			$header.find('.search').fadeIn("fast");
		});
		$header.find('.search form .input').on('click', function(e){
			e.stopImmediatePropagation();
		});
		
	})();

	var content = (function(){
		$('.content .div-text').each(function(){
			var text_th = $(this).height(),
				text_lh = parseInt($(this).css('line-height')) * 3;
			if(text_th > text_lh){
				$(this).height(text_lh);
				$(this).append('<span class="more active">More</span>');
				$(this).on('click', '.more', function(){
					if($(this).hasClass('active')){
						$(this).parent().height(text_th);
						$(this).text('Less').removeClass('active');
					}	else{
						$(this).parent().height(text_lh);
						$(this).text('More').addClass('active');
					}
				});
			}
		});
		
		$('.tab-back').each(function(){
			var $tab_pane = $(this).find('.tab-pane'),
				$tab_li = $(this).find('.tab-list>li');
			
			$tab_li.on('click', function(){
				if(!$(this).hasClass('active')){
					var idx = $(this).index();
					$tab_pane.eq(idx).fadeIn().siblings().hide();
					$tab_li.eq(idx).addClass('active').siblings().removeClass('active');
				}
			});
			
			$tab_li.eq(0).click();
		});
		
		$('.product .pro-list li').on('click', function(){
			var idx = $(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			
			if(idx == 0){
				$('.product .product-con').removeClass('active');
			}	else{
				$('.product .product-con').addClass('active');
			}
		});
		
		var $video_play = $('.video-play'), $video_popup = $('.video-popup');
		$video_play.find('.play').on('click', function(){
			var src = $(this).parents('.video-play').find('.video-sources').data('video'),
				video = '<iframe src="' + src + '?autoplay=1" frameborder="0" allowfullscreen></iframe>';
			
			$video_popup.find('.main').empty();
			$video_popup.find('.main').html(video);
			$video_popup.fadeIn();
		});
		$video_popup.find('.modalnav').on('click', function(){
			$video_popup.hide();
			$video_popup.find('.main').empty();
		});
		
		$(".faq dl>dt").append("<i class='fa'></i>");
		$(".faq dl>dt").on('click', function(){
			$(".faq dl").removeClass('active');
			if($(this).next().is(":hidden"))	$(this).parent().addClass('active');
			$(this).next("dd").slideToggle().parent().siblings().find("dd").slideUp();
		});
		
	})();

});

$(function () {
	var Init = function(){
		var $card_form = $('.card-form'),
				$card_show = $card_form.find('.card-show'),
				$card_hide = $card_form.find('.card-hide'),
				$card_out = $card_form.find('.card-out');
		
		$card_out.on('click', function(){
			$card_form.hide();
		});
		
		$card_hide.on('click', function(){
			$card_form.animate({'width': '2.5rem', 'height': '2.5rem', 'border-radius': '50%', 'background': 'transparent'}, function(){
				$card_show.show();
				$card_form.css({'background': 'transparent'});
			});
		});
		
		$card_show.on('click', function(){
			$card_show.hide();
			$card_form.css({'background': '#fff'});
			$card_form.animate({'width': '18.75rem', 'height': '20rem', 'border-radius': '.25rem', 'background': '#fff'});
		});
	};
	
	var AddCard = function(opts){
		var $card_form = $('.card-form'),
				$card_list = $card_form.find('.card-list'),
				$card_li = $card_list.children('li'),
				opts = opts;
				
		opts.sum = $card_li.length;
		
		var add_li = function(){
			if(opts.sum > 0){
				$card_li.each(function(idx){
					if($(this).find('.info').text() == opts.name)	return false;
					if((idx + 1) >= opts.sum)	li_append();
				});
			}	else{
				li_append();
			}
			
			if($card_form.is(':hidden'))	$card_form.fadeIn();
			if(!$card_form.find('.card-show').is(':hidden'))	$card_form.find('.card-show').click();
		};
		
		var li_append = function(){
			$card_list.append(
				'<li class="row">' + 
					'<div class="col-xs-10"><a class="info" href="' + opts.href + '">' + opts.name + '</a></div>' +
					'<div class="col-xs-2"><a class="btn">x</a></div>' + 
				'</li>'
			);
			opts.sum = $card_li.length;
		};
		
		return {
			add_li : add_li(),
			sum : opts.sum,
		};
	};
	
	Init();		//initialize
	
	$('.product .choice .btn-default').on('click', function(){
		var opts = {};
		opts.name = $(this).parents('li.back').find('.info').text();
		opts.href = $(this).parents('li.back').find('a.img').attr('href');
		opts.cout = $('.card-form .card-list li').length;
		
		AddCard(opts).add_li;
		opts.sum = AddCard(opts).sum;
		if(opts.cout >= opts.sum)	return false;
		
		$.ajax({
			type: "GET",
			url: "/AJAXHandler.ashx?action=CookieAdd",
			data: { names: opts.name, href: opts.href, sum: opts.sum },
			dataType: "text",
			success: function (data) {
			}
		});
	});
	
	$('.card-form .card-list').on('click', 'li .btn', function(){
		var href = $(this).parent().prev().find("a").attr("href");
		var name = $(this).parent().prev().find("a").text();
		
		$(this).parent().parent().remove();
		var sum = $('.card-form .card-list li').length;
		
		$.ajax({
			type: "GET",
			url: "/AJAXHandler.ashx?action=CookieRemove",
			data: { names: name, href: href, sum: sum },
			dataType: "text",
			success: function (data) {
			}
		});
	});
	
});
