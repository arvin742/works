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

$(function () {
  if ($(window).width() > 991) {
    $(document).off('click.bs.dropdown.data-api');
    $("a").removeAttr('data-toggle');
    dropdownOpen();
	}	else {
		$('header .menu>.dropdown .dropdown').removeClass('dropdown');
		$('header .menu>.dropdown .dropdown>a').removeClass('dropdown-toggle').attr('data-toggle', 'a');
		
		$('header .dropdown>a').mouseover(function(){
			return false;
		});
		$('header .dropdown').mouseout(function(){
			return false;
		});
	}
	
	$('#menu > li > a').each(function () {
    if($(this)[0].href == String(window.location)) {
      $(this).parent().addClass('active').siblings().removeClass('active');
    }
	});
	$('.dropdown-menu li a').each(function () {
    if($(this)[0].href == String(window.location)) {
      $(this).parent().addClass('active');
      $(this).parents('li').addClass('active').siblings().removeClass('active');
    }
	});
	
  $(".bottom span").click(function () {
    $(this).parent().next().toggle();
  });

  $("#category").click(function(){
    $(this).next().toggle();
	});

	$("#pro-btn").click(function () {
    $(this).next().toggle();
  });
  
  $('#contact-btn').click(function(e) {
  	e.stopImmediatePropagation();
		$('.a-form').animate({ 'left': 0 });
		
		$(document).click(function(e) {
			e = window.event || e;
			obj = $(e.srcElement || e.target);
			
			if(!$(obj).is('.poster-btn')){
				$('.a-form').animate({ 'left': '-460px' });
			}
		});
	});
	$('.cont-aside').click(function(e){
		e.stopImmediatePropagation();
	});
  
  $("footer .link").find("p").append("<a href='javascript:void(0);' id='link-btn'>more</a>");
 		var i=0;
  	$("#link-btn").click(function(){if(i==0){$(".hide-content").show();i=1;$("#link-btn").text("less");}else {$(".hide-content").hide();i=0;$("#link-btn").text("more");}
  });

});


$(function () {
	
	autoSize();
	$(window).resize(function(){autoSize();});
	function autoSize() {
		var w = $(window).width();
		var h = w * 8.2 / 16;
		var pw = $('.product-info .tag3').width();
		var ph = pw * 9 / 16;
		
		$('.index .sec01 iframe').width(w).height(h);
		$('.product-info .tag3 iframe').width(pw).height(ph);
	}
	
	$(window).scroll(function() {
		var top = $(this).scrollTop();
		if($(window).width() > 991){
			if(top > 0) {
				$('.header').css('position','fixed');
				$('.header').addClass('shadow');
				$('.header .header-link').hide();
			}	else{
				$('.header').css('position','relative');
				$('.header').removeClass('shadow');
				$('.header .header-link').show();
			}
		}
	});
	
	$('.header .navbar-toggle').on('click', function(){
		$('.header').toggleClass('on');
	});

	$(".faq dl>dt").append("<span></span>");
  $(".faq dl>dt").each(function () {
    var i = 0;
    $(this).click(function () {
    	$(".faq dl>dt").removeClass('active')
    	if($(this).next().is(":hidden"))	$(this).addClass('active');
      $(this).next("dd").slideToggle().parent().siblings().find("dd").slideUp();
      $(this).next("dd").append("<span></span>").parent().siblings().find("dd>span").remove();
      if (i < 1) {
        $(this).find("span").css("background-image", "url('images/Contact-2-01.png')");
        i++;
      } else {
        $(this).find("span").css("background-image", "url('images/Contact-2-02.png')");
        i = 0;
      }
    });
  });

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
			$card_form.animate({'width': '40px', 'height': '40px', 'border-radius': '50%', 'background': 'transparent'}, function(){
				$card_show.show();
				$card_form.css({'background': 'transparent'});
			});
		});
		
		$card_show.on('click', function(){
			$card_show.hide();
			$card_form.css({'background': '#fff'});
			$card_form.animate({'width': '300px', 'height': '320px', 'border-radius': '4px', 'background': '#fff'});
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
	
	Init();		//初始化按钮
	
	$('.product .choice .btn-default').on('click', function(){
		var opts = {};
		opts.name = $(this).parent().parent().find('.h4').text();
		opts.href = $(this).parent().parent().find('.h4 a').attr('href');
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
		
		$('.a-card p').text(sum);
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