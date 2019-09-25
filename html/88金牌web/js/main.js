$(function(){
	
	var indexDOM = function(){
		var $dom = $('.person'),
			$pro_bar = $dom.find('.progress .progress-bar'),
			$s_btn = $('.index .nav-info');
			
		$pro_bar.css('width', $pro_bar.find('span').text());
		
		$s_btn.on('click', 'table .btn-score', function(){
			$('.nav-com').fadeIn();
		});
	}
	
	var infoDOM = function(){
		var $dom = $('.information'),
			$btn_name = $dom.find('.nav-info .btn-name'),
			$btn_img = $dom.find('.nav-info .btn-img'),
			$btn_mail = $dom.find('.nav-info .btn-mail'),
			$btn_pwd = $dom.find('.nav-info .btn-pwd');
			
		var $edit = $('.nav-edit'),
			$btn_close = $edit.find('.btn-close'),
			$sub_name = $edit.find('.form-name .submit .btn'),
			$sub_img = $edit.find('.form-img .submit .btn'),
			$sub_mail = $edit.find('.form-mail .submit .btn'),
			$file = $edit.find('.form-img .file');
		
		$btn_name.on('click', function(){
			$('.nav-edit .form-name').show();
			$('.nav-edit').fadeIn();
		});
		
		$btn_img.on('click', function(){
			$('.nav-edit .form-img').show();
			$('.nav-edit').fadeIn();
		});
		
		$file.on('change', function(){
			var val = $(this).val();
			$(this).parent().find('.text').val(val);
		});
		
		$btn_mail.on('click', function(){
			$('.nav-edit .form-mail').show();
			$('.nav-edit').fadeIn();
		});
		
		$btn_pwd.on('click', function(){
			$('.nav-pwd').fadeIn();
		});
		
		/*-----------------------------------------------*/
		
		//修改名称
		$sub_name.on('click', function(){
			//操作成功后执行的事件
			$btn_close.click();
			sucShow('修改成功', '您的名称已修改成功，请点击完成关闭此弹窗！');
		});
		
		//修改头像
		$sub_img.on('click', function(){
			$btn_close.click();
			sucShow('修改成功', '您的头像已修改成功，请点击完成关闭此弹窗！');
		});
		
		//修改邮件
		$sub_mail.on('click', function(){
			$btn_close.click();
			sucShow('修改成功', '您的邮箱已修改成功，请点击完成关闭此弹窗！');
		});
	}
	
	var coursesDOM = function(){
		var $dom = $('.courses-info'),
			$d_btn = $dom.find('.exam-list li');
		
		//弹出课程详情
		$d_btn.on('click', function(){
			
			$('.nav-div').fadeIn();
		});
	}
	
	var examDOM = function(){
		var $dom = $('.exam-info'),
			$s_btn = $dom.find('.submit .btn');
		
		//提交答卷
		$s_btn.on('click', function(){
			$('.nav-exam').fadeIn();
		});
	}
	
	var answerDOM = function(){
		var $dom = $('.answer'),
			$com = $dom.find('.sol .sol-btn'),
			$m_btn = $dom.find('.ans-list .btn');
		
		$m_btn.on('click', function(){
			var $t_li = $(this).parents('li'),
				$r_h = $t_li.find('.info-text').height();
			
			if($t_li.hasClass('active')){
				$t_li.find('.info').css('max-height', '4rem');
				$(this).text('更多');
			}	else{
				$t_li.find('.info').css('max-height', $r_h);
				$(this).text('收起');
			}
			$t_li.toggleClass('active');
		});
		
		$com.on('click', function(){
			$('.nav-com').fadeIn();
		});
	}
	
	indexDOM();
	infoDOM();
	coursesDOM();
	examDOM();
	answerDOM();
});