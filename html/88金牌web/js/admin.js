$(function(){
	
	var content = function(){
		var $dom = $('.content'),
			$check_all = $dom.find('.check-all'),
			$all_btn = $check_all.find('.all');
		
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
		
		var fiexd_btn = $('.fiexd-btn');
		fiexd_btn.on('click', function(){
			$('.nav-fiexd').fadeIn();
		});
		
		var fiexd_file = $('.nav-fiexd input[type=file]');
		fiexd_file.on('change', function(){
			var val = $(this).val();
			$(this).parent().find('input[type=text]').val(val);
		});
	}
	
	var comment = function(){
		var $dom = $('.comment'),
			$g_o_btn = $('.grade .oprate .btn-mod'),
			$g_btn = $('.grade .oprate .btn-com'),
			$m_o_btn = $('.message .table .btn-mod'),
			$m_btn = $('.message .table .btn-com');
			
		$g_o_btn.on('click', function(){
			$(this).parents('tr').addClass('on');
		});
		
		//评分提交
		$g_btn.on('click', function(){
			var val = $(this).parents('tr').find('input').val();
			
			//success
			$(this).parents('tr').removeClass('on');
		});
		
		$m_o_btn.on('click', function(){
			var $parent = $(this).parents('tr');
			$parent .toggleClass('on');
			
			if($parent .hasClass('on')){
				$parent .children().eq(1).attr('colspan', '2');
				$parent .children().eq(2).hide();
			}	else{
				$parent .children().eq(1).attr('colspan', '1');
				$parent .children().eq(2).show();
			}
		});
		
		//回复提交
		$m_btn.on('click', function(){
			var val = $(this).parents('tr').find('textarea').val();
			
			//beforeSend
			$(this).parents('tr').find('.btn-mod').click();
		});
	}
	
	var exam = function(){
		var $dom = $('.exam-edit'),
			$form = $dom.find('.form'),
			$submit = $form.find('.submit .btn-com');
			
		//增加试题
		$form.on('click', '.submit .test-add', function(){
			$form.find('.submit').before('<div class="main"> <div class="form-group"> <span>*题目：</span> <textarea class="form-control" name="title" rows="4" placeholder="题目" required></textarea> <p class="tips t-tips">*请输入试题题目</p> </div> <div class="form-group"> <span>*答案：</span> <div class="answer"> <a class="btn ans-add"><i class="fa fa-plus"></i></a> <ul class="list-unstyled"> <li> <i class="fa fa-square-o"></i> <input class="form-control" type="text" name="ans" placeholder="答案" required /> </li> <li> <i class="fa fa-square-o"></i> <input class="form-control" type="text" name="ans" placeholder="答案" required /> </li> </ul> </div> <p class="tips a-tips">*请输入至少两个答案</p> <p class="tips c-tips">*请勾选正确的答案</p> </div> </div>');
		});
		
		//增加答案
		$form.on('click', '.main .ans-add', function(){
			$(this).parents('.answer').find('ul').append("<li> <i class='fa fa-square-o'></i> <input class='form-control' type='text' name='ans' placeholder='答案' required /> </li>");
		});
		
		//勾选正确答案
		$form.on('click', '.main ul li i', function(){
			$(this).parents('ul').find('i').addClass('fa-square-o').removeClass('fa-check-square-o');
			$(this).addClass('fa-check-square-o').removeClass('fa-square-o');
			$(this).parent().addClass('active').siblings().removeClass('active');
		});
		
		//提交
		$submit.on('click', function(){
			var opts = [];
			
			$form.find('.main').each(function(k){
				var title = $(this).find('textarea').val(),
					correct = $(this).find('ul li.active').index();
				var answer = [], ans = [], a = 0;
				
				$(this).find('.answer input').each(function(m){
					if($(this).val() != ''){
						answer[m] = $(this).val();
						ans[a] = m;
						a++;
					}
				});
				
				//判断
				var result = verify(title, ans, correct);
				$(this).find('.tips').hide();
				switch(result){
//					case 'nothing': alert('nothing');break;
					case 'notitle': $(this).find('.t-tips').show();break;
					case 'noanswer': $(this).find('.a-tips').show();break;
					case 'nocorrect': $(this).find('.c-tips').show();break;
					case 'success': opts[k] = {'title': title, 'answer': answer, 'correct': correct};break;
				}
			});
			
			var data = JSON.stringify(opts);
			if(data == '[]')	return false;
			
			//ajax
			$.ajax({
				url: "",
				type : "post", 
				dataType : "json",
				data : data,
				success: function(){
					
				},
			});
		});
		
		function verify(title, ans, correct){
			if(title == '' && ans == 0){
				return 'nothing';
			}
			if(title == ''){
				return 'notitle';
			}
			if(ans < 2){
				return 'noanswer';
			}
			if(correct < 0 || $.inArray(correct, ans) == -1){
				return 'nocorrect';
			}
			
			return 'success';
		}
	}
	
	content();
	comment();
	exam();
	
});