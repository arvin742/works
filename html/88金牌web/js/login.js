$(function(){
	
	var commonDOM = function(){
		var $dom = $('.common');
		var src = $dom.find('.background img').attr('src');
		
		$dom.css('background-image', 'url(' + src + ')');
	}
	
	var loginDOM = function(){
		var $dom = $('.login'),
			$submit = $dom.find('.submit .btn');
			
		$submit.on('click', function(){
			
		});
	}
	
	var registerDOM = function(){
		var $dom = $('.register'),
			$submit = $dom.find('.submit .btn');
			
		$submit.on('click', function(){
//			$.ajax({
//				url: ,
//				post: 'post',
//				dataType: 'json',
//				data: data,
//				success: function(){
//					sucShow('提交成功', '请等待管理员的审核通过。');
//				}
//			});
			
			sucShow('提交成功', '请等待管理员的审核通过。');
		});
	}
	
	var forgetDOM = function(){
		var $dom = $('.forget'),
			$submit = $dom.find('.submit .btn');
			
		$submit.on('click', function(){
			
			$('.nav-success .btn').text('登录').attr('href', 'login.html');
			sucShow('修改成功', '恭喜您修改成功，请点击前去登录！');
		});
	}
	
	commonDOM();
	loginDOM();
	registerDOM();
	forgetDOM();
});