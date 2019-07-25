$(function(){
	
	var publicDOM = function(otps){
		var $dom = $('.content'),
			$htr_btn = $('header .btn'),
			$back = $('.c-back'),
			$span = $dom.find('.sec01 .list span');
		
		var t = [3600000, 60000, 1000, 10];
		
		var onlyLeft = function(){
			var result = [],
				endTime = 86400000,
				today = new Date(),
				nowTime = today.getHours() * t[0] + today.getMinutes() * t[1] + today.getSeconds() * t[2] + today.getMilliseconds(),
				sum = endTime - nowTime;
					
			for(var i = 0; i < t.length; i++){
				result[i] = Math.floor(sum / t[i]);
				sum = sum % t[i];
			}
			
			return result;
		};
		
		var onlyTime = setInterval(function(){
			var time = onlyLeft();
			$span.each(function(k){
				time[k] = time[k] < 10 ? '0' + time[k] : time[k];
				$(this).text(time[k]);
			});
		}, 1);

		$htr_btn.eq(0).parent().addClass('active');
		$htr_btn.on('click', function(){
			var idx = $(this).data("id"),
				str = '.index .slide-' + idx;
				tp = $(str) ? $(str).offset().top - 50 : 0;

			$("html, body").animate({ scrollTop : tp}, 500);
			$(this).parent().addClass('active').siblings().removeClass('active');
		});
		
		$back.on('click', function(){
			window.history.go(-1);
		});

	};

	var indexDOM = function(){
		var $dom = $('.index'),
			$box = $dom.find('.box'),
			$btn = $dom.find('.s-btn .btn'),
			$bt_ul = $dom.find('.scroll');

		$box.on('click', function(){
			$(this).fadeOut();
		});

		var boxTime = setTimeout(function(){
			$box.click();
		}, 7000);

		var btnTime = setInterval(function(){
			$btn.toggleClass('active');
		}, 250);

		var textInt = function(){
			var active = ['prev', 'active', 'next'];

			for(var i = 0; i < 3; i++){
				var opts = textReady();
				$bt_ul.append(
					'<li class="' + active[i] + '">' + 
						'<p class="h5">' + opts.scend + '分钟前 ' + opts.city + '的' + opts.name + '已下单</p>' + 
					'</li>'
				);
			}
		}

		var textScroll = function(){
			var $bt_prev = $bt_ul.find('li.prev'),
				$bt_act = $bt_ul.find('li.active'),
				$bt_next = $bt_ul.find('li.next');

			$bt_prev.remove();
			$bt_act.addClass('prev').removeClass('active');
			$bt_next.addClass('active').removeClass('next');

			var opts = textReady();
			$bt_ul.append(
				'<li class="next">' + 
					'<p class="h5">' + opts.scend + '分钟前 ' + opts.city + '的' + opts.name + '已下单</p>' + 
				'</li>'
			);
		};

		textInt();
		
		var indexTime = setInterval(function(){
			textScroll();
		}, 3000);
	};
	
	var productDOM = function(otps){
		var $dom = $('.product'),
			$bt_ul = $dom.find('.bottom ul'),
			$bt_btn = $dom.find('.bottom .btn');
		
		var btnTime = setInterval(function(){
			if($bt_btn.hasClass('over')){
				$bt_btn.attr('href', 'javascript: void(0);').text('已售完');
			}	else{
				$bt_btn.toggleClass('active');
			}
		}, 500);

		var textInt = function(){
			var active = ['prev', 'active', 'next'];

			for(var i = 0; i < 3; i++){
				var opts = textReady();
				$bt_ul.append(
					'<li class="' + active[i] + '">' + 
						'<p class="h5">' + opts.date + ' ' + opts.city + '的' + opts.name + '[' + opts.phone + ']</p>' + 
						'<p class="h5">您订购的' + opts.model + ' ' + opts.price + '元已发货</p>' + 
					'</li>'
				);
			}
		}

		var textScroll = function(){
			var $bt_prev = $bt_ul.find('li.prev'),
				$bt_act = $bt_ul.find('li.active'),
				$bt_next = $bt_ul.find('li.next');

			$bt_prev.remove();
			$bt_act.addClass('prev').removeClass('active');
			$bt_next.addClass('active').removeClass('next');

			var opts = textReady();
			$bt_ul.append(
				'<li class="next">' + 
					'<p class="h5">' + opts.date + ' ' + opts.city + '的' + opts.name + '[' + opts.phone + ']</p>' + 
					'<p class="h5">您订购的' + opts.model + ' ' + opts.price + '元已发货</p>' + 
				'</li>'
			);
		};

		textInt();
		
		var textTime = setInterval(function(){
			textScroll();
		}, 3000);
	};
	
	var orderDOM = function(opts){
		var $dom = $('.order .sec02'),
			$num = $dom.find('.number input'),
			$price = $dom.find('.price input'),
			$submit = $dom.find('.submit .btn');
		
		var orderClick = function(num){
			var data = {};

			data.ip = returnCitySN ? (returnCitySN.cname + '\n' + returnCitySN.cip) : '未知位置';
			data.pid = $dom.find('.info .pid').val();
			data.num = num;

			$.ajax({
				url : "./orderController.php?action=orderClick",
				type : "post",
				dataType : "text",
				data : data,
				success : function(r){
					// console.log(r);
				},
			});
		};

		var init = function(){
			$dom.find('.model .btn').on('click', function(){
				var $m1 = $dom.find('.model .m1'),
					$m2 = $dom.find('.model .m2'),
					$m3 = $dom.find('.model .m3');

				if(!$(this).parent().hasClass('active')){

					if($m3.hasClass('active')){
						$price.val($price.val() / 2);
						setVal(1, $price.val());
					}	else{
						if($(this).parent().hasClass('m3')){
							$price.val($price.val() * 2);
							setVal(1, $price.val());
						}	else{
							setVal(1, $price.val());
						}
					}
					$(this).parent().addClass('active').siblings().removeClass('active');
				}

				orderClick(0);
			});
			
			$dom.find('.number .btn').on('click', function(e){
				e = window.event || e;
				obj = $(e.srcElement || e.target);
				
				var n = 0;
				if($(obj).is('a.prev.btn')){
					if(getVal().num > 1){
						n = --getVal().num;
					}	else{
						alert('购买数量不能少于1');
						n = 1;
					}
				}	else{
					if(getVal().num >= 2){
						n = 2;
						alert('每人限购两只');
					}	else{
						n = ++getVal().num;
					}
				}
				
				setVal(n, getVal().price);

				orderClick(1);
			});
			
			$num.on('blur', function(){
				var n = getVal().num;
				if(n == ""){
					n = 1;
				}	else if(n > 2){
					n = 2;
					alert('每人限购两只');
				}
				setVal(n, getVal().price);

				orderClick(1);
			});

			$dom.find('.message input').on('focus', function(){
				var name = $(this).attr('name');
				var num = 0;
				switch(name){
					case 'name': num = 2;break;
					case 'phone': num = 3;break;
					case 'address': num = 5;break;
					case 'content': num = 6;break;
				}
				// console.log(num);
				orderClick(num);
			});

			$dom.find('#expressArea').on('click', function(){
				orderClick(4);
			});
			
			var cityTime = setInterval(function(){
				var reg = new RegExp('>', 'g');
				var city = $dom.find('.express-area dl>dd').text().replace(reg, '');
				$dom.find('.express-area input').val(city);
			}, 300);
			
			$submit.on('click', function(){
				var data = {};
				var opts = $dom.find('form').serializeArray();
				$.each(opts, function() {
					data[this.name] = this.value;
				});

				data.price = $dom.find('.price .total').text().trim();

				data.types = '';
				$dom.find('.info ul li.active').each(function(k){
					if(k < 1){
						data.types = $(this).children().text();
					}	else{
						data.types += " • " + $(this).children().text();
					}
				});

				data.ip = returnCitySN ? (returnCitySN.cname + '\n' + returnCitySN.cip) : '';
				data.tool = browserType() ? browserType() : '';

				orderClick(7);
				
				if(!result(data))	return false;

				$.ajax({
					url : "./orderController.php?action=index",
					type : "post",
					dataType : "json",
					data : data,
					beforeSend : function(r){
						$submit.text('提交订单中...');
						$submit.attr('disabled', true);
					},
					success : function(r){
						if(r.msg == 'success'){
							window.location.href = "./success.php?id=" + r.oid;
						}	else{
							alert('下单失败，请重新下单！');
						}
					},
					complete : function(r){
						$submit.text('提交订单');
						$submit.attr('disabled', false);
					}
				});
			});
		};
		
		var getVal = function(){
			var num = $num.val();
			var price = $price.val();
			
			return{
				num : num,
				price : price,
			};
		};
		
		var setVal = function(num, price){
			$num.val(num);
			$dom.find('.price .total').text((num * price).toFixed(2));
		};
		
		var result = function(data){
			if(data.name == ""){
				alert('收货人不能为空');
				return false;
			}
			if(data.phone == ""){
				alert('联系方式不能为空');
				return false;
			}	else{
				var pattern = /^1[345678]\d{9}$/;
				if(!pattern.test(data.phone)){
					alert('手机号码填写错误');
					return false;
				}
			}
			if(data.city == ""){
				alert('城市不能为空');
				return false;
			}
			if(data.address == ""){
				alert('详细地址不能为空');
				return false;
			}
			
			return true;
		};
		
		return{
			init : init(),
		};
	};

	//删除前后的空格
	String.prototype.trim = function(){
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
	
	publicDOM();
	indexDOM();
	productDOM();
	orderDOM().init;
	
});


(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      if(clientWidth>=640){
        docEl.style.fontSize = '23.8933333px';
      }else{
        docEl.style.fontSize = 23.8933333 * (clientWidth / 640) + 'px';
      }
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

// 判断当前访问者的客户端设备类型、操作系统及浏览器类型
function browserType() {
	var browser = {
		versions: function() {
			var u = navigator.userAgent, ua = navigator.userAgent.toLocaleLowerCase();
			return {
				//pc终端浏览器版本信息
				ie: (ua.indexOf("compatible") > -1 && ua.indexOf("msie") > -1) || (ua.indexOf("edge") > -1) || (ua.indexOf('trident') > -1 && ua.indexOf("rv:11.0") > -1),
				chrome: u.indexOf('Chrome') > -1,
				firefox: u.indexOf('Firefox') > -1,
				safari: u.indexOf('Safari') > -1,
				qq: ua.indexOf('qqbrowser') > -1 || ua.indexOf('QQbrowser') > -1 || ua.indexOf('QQ') > -1,
				sougou: ua.indexOf('se') > -1,
				se360: window.navigator.mimeTypes[40] || !window.navigator.mimeTypes.length,
				
				//移动终端浏览器版本信息 
				webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
				mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
				iOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
				iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, //是否iPad
				weChat: u.indexOf('MicroMessenger') > -1,
			};
		}(),
	};
	
	var $v = browser.versions, type = '其他';
	if(!$v.mobile){	// 非移动终端
		type = '其他浏览器';
		type = $v.ie ? 'IE浏览器' : 
			$v.firefox ? '火狐浏览器' : 
			$v.qq ? 'qq浏览器' : 
			$v.sougou ? '搜狗浏览器' : 
			$v.se360 ? '360浏览器' : 
			$v.chrome ? '谷歌浏览器' : 
			$v.safari ? 'safari浏览器' : '其他浏览器';

	}	else{	// 移动终端
		type = $v.weChat ? '、微信' : '';
		type = $v.iPad ? 'iPad' + type : 
			$v.iPhone ? 'iPhone' + type : 
			$v.android ? 'android' + type : '其他手机' + type;
	}

	return type;
}

function timeScore(){
	var second = 0;
	window.setInterval(function () {
		second ++;
	}, 1000); 
	
	var tjArr = localStorage.getItem("tjArr") ? localStorage.getItem("tjArr") : '';
	
	window.onbeforeunload = function() {
		if(tjArr == ''){
			var tjT = eval('(' + '[]' + ')');
			if(tjT){
				tjT[tjT.length-1].time += second;
				var jsArr= JSON.stringify(tjT);
				localStorage.setItem("tjArr", tjArr);
			}
		}	else{
			var tjArr = localStorage.getItem("jsArr") ? localStorage.getItem("jsArr") : '[]';
			var dataArr = {
				'url' : location.href,
				'time' : second,
				'refer' : getReferrer(),
				'timeIn' : Date.parse(new Date()),
				'timeOut' : Date.parse(new Date()) + (second * 1000)
			};
			tjArr = eval('(' + tjArr + ')');
			tjArr.push(dataArr);
			tjArr= JSON.stringify(tjArr);
			localStorage.setItem("jsArr", tjArr);
		}
	}
	
	function getReferrer() {
		var referrer = '';
		try {
			referrer = window.top.document.referrer;
		} catch(e) {
			if(window.parent) {
				try {
					referrer = window.parent.document.referrer;
				} catch(e2) {
					referrer = '';
				}
			}
		}
		if(referrer === '') {
			referrer = document.referrer;
		}
		return referrer;
	}
};