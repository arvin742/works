$(function(){

	//删除前后的空格
	String.prototype.trim = function(){
        return this.replace(/(^\s*)|(\s*$)/g, "");
    };

    function getQueryString(name){
    	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    	var r = window.location.search.substr(1).match(reg);
    	if (r != null) return unescape(r[2]);
    	return null; 
    }

    function tips(text){
    	var $tips = $('.nav-tips');

    	$tips.find('.info').text(text);
    	$tips.addClass('bounceIn').removeClass('bounceOut').fadeIn();

    	var tipsTime = setTimeout(function(){
    		$tips.addClass('bounceOut').removeClass('bounceIn').fadeOut(1000);
    		clearTimeout(tipsTime);
    	}, 2000);
    }

	function ajaxTips(data, $btn){
		var $dom = $('.nav-main'),
			$info = $dom.find('.box-info'),
			$confirm = $dom.find('.box-confirm'),
			$close = $dom.find('.box-close');

		$dom.fadeIn();
		$info.text(data.info);

		$confirm.on('click', function(){
			$dom.hide();
			ajax(data, $btn);
		});

		$close.on('click', function(){
			$dom.fadeOut();
		});
	}

	function ajax(data, $btn){

		$.ajax({
			url : data.url,
			type : "post",
			dataType : "json",
			data : data,
			beforeSend : function(r){
				$btn.attr('disabled', true);
			},
			success : function(r){
				if(r.msg == 'success'){
					tips(data.success);
					setTimeout(function(){
						window.location.reload();
					}, 1000);
				}	else{
					r.msg = r.msg != 'error' ? r.msg : '操作失败！';
					tips(r.msg);
				}
			},
			error : function(r){
				console.log(r);
			},
			complete : function(r){
				$btn.attr('disabled', false);
			}
		});
	}

	var common = (function(){
		$(document).on('click', function(){
			$selector.removeClass('on');
		});

		var $fiexd_on = $('.fiexd-on');
		$fiexd_on.on('click', function(){
			$('.nav-fiexd').fadeIn();
		});
		
		var $fiexd_off = $('.nav-fiexd').find('.fiexd-off');
		$fiexd_off.on('click', function(){
			$('.nav-fiexd form .btn-res').click();
			$('.nav-fiexd').fadeOut();
		});

		var $selector = $('.selector'),
			$pid = $selector.find('.pid'),
			$subtitle = $selector.find('.subtitle'),
			$item = $selector.find('li');

		$selector.on('click', function(e){
			e.stopImmediatePropagation();
			$(this).toggleClass('on');
		});

		$item.on('click', function(e){
			e.stopImmediatePropagation();
			$pid.val($(this).data('pid'));
			$subtitle.val($(this).find('cite').text());

			$(this).addClass('active').siblings().removeClass('active');
			$selector.removeClass('on');
		});
	})();

	var header = (function(){
		var $itemd = $('.nav-itemd'),
			$child = $itemd.children('.nav-child'),
			$dropdowm = $itemd.children('a'),
			$m_it_a = $('.menu .nav-item>a'),
			$m_cl_a = $('.menu .nav-child a'),
			$nav_htr_a = $('.nav-htr a'),
			$nav_export = $('.nav-date .export-btn');

		$dropdowm.on('click', function(){
			if($(this).parent().hasClass('active')){
				$(this).parent().children('.nav-child').fadeOut();
				$(this).parent().removeClass('active');
			}	else{
				$(this).parent().children('.nav-child').fadeIn();
				$(this).parent().addClass('active');
			}
		});

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
				$(this).addClass('active').siblings().removeClass('active');
			}
		});

		$nav_export.on('click', function(){
			// var date = $(this).parents('.nav-date').find('.check-date').val();

			// console.log(date);
		});

		var $dom = $('header'),
			$nav_menu = $dom.find('.nav-menu');

		$nav_menu.on('click', function(){
			$dom.toggleClass('on');
			$('.menu-side').toggleClass('on');
			$('.nav-body').toggleClass('on');
		});
	})();

	var menu = (function(){
		var $dom = $('.menu-side'),
			$menu = $dom.find('.menu'),
			$m_li = $menu.children('li'),
			$bar = $menu.find('.nav-bar');

		$m_li.on('mouseover', function(){
			var h = $(this).offset().top - $dom.find('.logo').outerHeight();

			$bar.stop();
			$bar.animate({top : h}, 300);
		});
		$menu.on('mouseout', function(){
			var h = $menu.children('li.active').offset().top - $dom.find('.logo').outerHeight();
			$bar.stop();
			$bar.animate({top : h}, 300);
		});
		$menu.mouseout();
	})();

	var index = (function(){
		var $dom = $('.index'),
			$tbody = $dom.find('table tbody'),
			$pages = $dom.find('.nav-page');

		var $limit = 20, $page = 1;
		dataAjax($page, $limit); //初始化

		var $pageBtn = $dom.find('.nav-page .pagination');
		$pageBtn.on('click', '.page-link', function(){
			var $page = $(this).data('page');
			dataAjax($page, $limit);
		});
		$pageBtn.on('click', '.btn-go', function(){
			var $page = $(this).parents('.page-go').find('input').val().trim();
			dataAjax($page, $limit);
		});

		function dataAjax(page, limit){
			$.ajax({
				url : './indexController.php?action=visit',
				type : "post",
				dataType : "json",
				data : {'page': page, 'limit': limit},
				success : function(r){
					if(r.msg == 'success'){
						getHtml(r, page, limit);
					}
					// console.log(r);
				},
			});
		}
			
		function getHtml(result, page, limit){
			var data = result.data, html = '';
			for(var i = 0; i < data.length; i++) {
				html += '<tr><td><span>' + data[i].user + '</span></td><td class="long"><span>' + data[i].subtitle + '</span></td><td class="mid"><span>' + data[i].scroll + '</span></td>' + 
					'<td><span>' + data[i].place + '</span></td><td class="date"><span>' + data[i].date + '</span></td><td><span>' + data[i].click_model + '</span></td>' + 
					'<td><span>' + data[i].click_name + '</span></td><td><span>' + data[i].click_phone + '</span></td><td><span>' + data[i].click_city + '</span></td>' + 
					'<td class="mid"><span>' + data[i].click_address + '</span></td><td><span>' + data[i].click_content + '</span></td><td class="mid"><span>' + data[i].click_btn + '</span></td></tr>';
			}

			$tbody.empty().append(html);
			$pages.find('.pagination').empty().append(result.page);
		}
	})();

	var product = (function(){
		var $dom = $('.product'),
			$up = $dom.find('.oprate .btn-up'),
			$down = $dom.find('.oprate .btn-down'),
			$del = $dom.find('.oprate .btn-del');

		$up.on('click', function(){
			var data = {}, $btn = $(this);
			data.url = './productController.php?action=change',
			data.id = $(this).parents('tr').find('input[name="id"]').val();
			data.status = 1;
			data.info = '你确定要上架吗？';
			data.success = '上架成功！';

			ajaxTips(data, $btn);
		});

		$down.on('click', function(){
			var data = {}, $btn = $(this);
			data.url = './productController.php?action=change',
			data.id = $(this).parents('tr').find('input[name="id"]').val();
			data.status = 0;
			data.info = '你确定要下架吗？';
			data.success = '下架成功！';

			ajaxTips(data, $btn);
		});

		$del.on('click', function(){
			var data = {}, $btn = $(this);
			data.url = './productController.php?action=delete';
			data.id = $(this).parents('tr').find('input[name="id"]').val();
			data.info = '你确定要删除吗？';
			data.success = "删除成功！";

			ajaxTips(data, $btn);
		});
	})();

	var comment = (function(){
		var $dom = $('.product-com'),
			$form = $dom.find('.form'),
			$add = $dom.find('.btn-add'),
			$edit = $dom.find('.oprate .btn-edit'),
			$del = $dom.find('.oprate .btn-del'),
			$star = $dom.find('.star'),
			$star_li = $star.find('ul li'),
			$cannel = $form.find('.btn-cannel');

		$add.on('click', function(){
			addInit();
			$form.fadeIn();
		});

		$del.on('click', function(){
			var data = {}, $btn = $(this);
			data.url = './productController.php?action=comDel';
			data.id = $(this).parents('tr').find('.id').text().trim();
			data.info = '你确定要删除吗？';
			data.success = "删除成功！";
			
			ajaxTips(data, $btn);
		});

		$edit.on('click', function(){
			var data = {};

			data.id = $(this).parents('tr').find('.id').text().trim();

			$.ajax({
				url : './productController.php?action=comEdition',
				type : "post",
				dataType : "json",
				data : data,
				success : function(r){
					if(r){
						editInit(r[0]);
						$form.fadeIn();
					}
				},
			});
			
		});

		$star_li.on('click', function(){
			var idx = $(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$star.find('input').val(idx + 1);
		});

		$cannel.on('click', function(){
			$form.fadeOut();
		});

		function addInit(){
			$form.addClass('form-add').removeClass('form-edit');
			$form.attr('action', './productController.php?action=comAdd');
			$form.find('.id').val('');
			$form.find('.form-text input').val('');
			$star.find('input').val(5);
			$star_li.eq(4).addClass('active').siblings().removeClass('active');
		}

		function editInit(data){
			$form.addClass('form-edit').removeClass('form-add');
			$form.attr('action', './productController.php?action=comEdit');
			$form.find('.id').val(data.id);
			$form.find('.name input').val(data.name);
			$star.find('input').val(data.score);
			$star_li.eq(data.score - 1).addClass('active').siblings().removeClass('active');
			$form.find('.image input').val(data.image);
			$form.find('.content input').val(data.content);
			$form.find('.date input').val(data.date);
			$form.find('.support input').val(data.support);
		}
	})();

	var record = (function(){
		var $dom = $('.product-record'),
			$tbody = $dom.find('.table tbody'),
			$pages = $('.nav-page');

		var $submit = $dom.find('.nav-fiexd .form .btn-sub');
		$submit.on('click', function(){
			var data = {};
			var opts = $dom.find('.nav-fiexd form').serializeArray();
			$.each(opts, function() {
				data[this.name] = this.value;
			});

			data.url = './productController.php?action=recordAdd';
			data.success = '添加成功！';

			if(!result(data))	return false;

			ajax(data, $(this));
		});

		$tbody.on('click', '.btn-del', function(){
			var data = {}, $btn = $(this);
			data.url = './productController.php?action=recordDel';
			data.id = $(this).parents('tr').find('.id').val();
			data.info = '你确定要删除吗？';
			data.success = '删除成功！';

			ajaxTips(data, $btn);
		});

		var $limit = $pages.data('limit');

		var $pageBtn = $dom.find('.nav-page .pagination');
		$pageBtn.on('click', '.page-link', function(e){
			var $page = $(this).data('page');
			dataAjax($page, $limit);
		});
		$pageBtn.on('click', '.btn-go', function(e){
			var $page = $(this).parents('.page-go').find('input').val().trim();
			dataAjax($page, $limit);
		});
		
		function dataAjax(page, limit){
			$.ajax({
				url : './productController.php?action=record',
				type : "post",
				dataType : "json",
				data : {'page': page, 'limit': limit, 'start': 0,},
				success : function(r){
					if(r.msg == 'success'){
						getHtml(r, page, limit);
					}
					// console.log(r);
				},
			});
		}

		function getHtml(result, page, limit){
			var data = result.data, html = '';
			for(var i = 0; i < data.length; i++) {
				var num = i + 1 + (page - 1) * limit;
				html += '<tr><td>' + num + '<input class="id hidden" value="' + data[i].id + '" /></td><td><span class="img"><img src="../upload/images/' + data[i].img + '" alt="" /></span></td><td><span class="subtitle">' + data[i].subtitle + '</span></td>' + 
					'<td><span class="record">' + data[i].record + '</span></td><td><span class="date">' + data[i].date + '</span></td><td><span class="content">' + data[i].content + '</span></td>' + 
					'<td><ul class="list-inline oprate"><li><a class="btn btn-del">删除</a></li></ul></td></tr>';
			}

			$tbody.empty().append(html);
			$pages.find('.pagination').empty().append(result.page);
		}

		function result(data){
			if(data.pid == ""){
				tips('产品不能为空');
				return false;
			}
			if(data.record == ""){
				tips('进货数量不能为空');
				return false;
			}
			if(data.date == ""){
				tips('日期不能为空');
				return false;
			}
			
			return true;
		}
	})();

	var order = (function(){
		var $dom = $('.order');

		//主体信息
		var $tbody = $dom.find('.order-table'),
			$pages = $dom.find('.nav-page');

		var $limit = 10, $page = 1, $id = getQueryString('id'), $date = '';
		dataAjax($page, $limit, $id, $date); //初始化

		var $pageBtn = $dom.find('.nav-page .pagination');
		$pageBtn.on('click', '.page-link', function(){
			var $page = $(this).data('page');
			dataAjax($page, $limit, $id, $date);
		});
		$pageBtn.on('click', '.btn-go', function(){
			var $page = $(this).parents('.page-go').find('input').val().trim();
			dataAjax($page, $limit, $id, $date);
		});

		$('.nav-date .form .check-btn').on('click', function(){
			$limit = 10, $page = 1, $id = getQueryString('id'),
			$date = $('.nav-date .form .check-date').val();
			dataAjax($page, $limit, $id, $date);
		});

		function dataAjax(page, limit, id, date){
			$.ajax({
				url : './orderController.php?action=index',
				type : "post",
				dataType : "json",
				data : {'page': page, 'limit': limit, 'status': id, 'date': date},
				success : function(r){
					$tbody.empty();
					$pages.find('.pagination').empty();

					if(r.msg == 'success'){
						getHtml(r, page, limit);

						$dom.find('.excel-form .page').val(page);
						$dom.find('.excel-form .limit').val(limit);
						$dom.find('.excel-form .status').val(id);
						$dom.find('.excel-form .date').val(date);
					}
					// console.log(r);
				},
				error : function(r){
					// console.log(r.responseText);
				}
			});
		}
			
		function getHtml(result, page, limit){
			var $data = result.data, html = '';
			for(var $i = 0; $i < $data.length; $i++) {
				html += '<tbody class="tb ' + $data[$i]['status'] + '"><tr class="tr-th"><td colspan="9">' +
		        	'<span class="message">' + 
		        		'<button class="btn btn-copy" data-clipboard-action="copy" onclick="">复制</button>' + 
		        		'<cite class="msg hidden" onclick="">' + $data[$i]['msg_model'] + '</cite>' + 
		        	'</span>' + 
		        	'<span class="p-id">产品ID： <cite>' + $data[$i]['pid'] + '</cite></span>' + 
		        	'<span class="time">' + $data[$i]['date'] + '</span>' + 
		        	'<span class="o-id">订单号： <cite>' + $data[$i]['oid'] + '</cite></span>' + 
		        	'<span class="t-id">快递单号： <cite>' + $data[$i]['tid'] + '</cite></span>' + 
		        	'<span class="state">订单状态： ' + 
		        		'<strong class="s0">待确认</strong>' + 
		        		'<strong class="s1">未发货</strong>' + 
		        		'<strong class="s2">运输中</strong>' + 
		        		'<strong class="s3">已完成</strong>' + 
		        		'<strong class="s4">未完成</strong>' + 
		        	'</span>' + 
		        '</td></tr>' + 
		        '<tr class="tr-td"><td>' + 
		        	'<div class="info">' + 
		        		'<span class="img"><a href="http://www.morrich.cn/web/product.php?id=' + $data[$i]['pid'] + '"><img src="../upload/images/' + $data[$i]['img'] + '" alt=""></a></span>' +
			        	'<span class="txt"><cite>' + $data[$i]['subtitle'] + '</cite> <br /><label>' + $data[$i]['types'] + '</label></span>' + 
			        	'<span class="num"><strong>× ' + $data[$i]['number'] + '</strong></span>' + 
			        '</div>' + 
		        '</td>' + 
		        '<td><span>' + $data[$i]['name'] + '</span> <br /> <span>' + $data[$i]['phone'] + '</span></td>' + 
		        '<td><span class="address">' + $data[$i]['address'] + '</span></td>' +
		        '<td><p class="price"><span>总额 <strong>￥' + $data[$i]['price'] + '</strong></span> <br /> <span>货到付款</span></p></td>' +
		        '<td><a class="content btn" title="' + $data[$i]['content'] + '">查看</a></td>' +
		        '<td><p class="place">' + $data[$i]['place'] + '</p></td>' +
		        '<td><p class="ip">' + $data[$i]['ip'] + '</p></td>' +
		        '<td><p class="tool">' + $data[$i]['tool'] + '</p></td>' +
		        '<td>' +
		        	'<div class="oprate">' + 
		        		'<ul class="call list-inline">' + 
			        		'<li><a class="btn confirm-btn">确认</a></li>' + 
			        		'<li><a class="btn discard-btn">放弃</a></li>' + 
			        	'</ul>' + 
			        	'<ul class="send list-inline">' + 
			        		'<li><a class="btn send-btn">发货</a></li>' + 
			        		'<li><a class="btn cancel-btn">取消</a></li>' + 
			        	'</ul>' + 
			        	'<ul class="end list-inline">' + 
			        		'<li><a class="btn finish-btn">完成</a></li>' + 
			        		'<li><a class="btn fail-btn">退货</a></li>' + 
			        	'</ul>' + 
			        	'<ul class="ending list-inline">' + 
			        		'<li><a class="btn ending-btn">结束</a></li>' + 
			        	'</ul>' + 
			        	'<p class="fail">未完成</p>' + 
			        	'<p class="finish">已完成</p>' + 
			        '</div>' + 
		        '</td></tr>' + 
		    	'<tr class="tr-row"><td colspan="9"></td></tr></tbody>';
			}

			$tbody.append(html);
			$pages.find('.pagination').append(result.page);
			$dom.find('.content').tooltip();//备注提示
		}

		var $msg = $dom.find('.msg-btn'),
			$msg_form = $('.nav-msg'),
			$msg_btn = $msg_form.find('.submit .btn');
		$msg.on('click', function(){
			$('.nav-msg').fadeIn();
		});

		$msg_btn.on('click', function(){
			var data = {}, $btn = $(this);
			data.url = './orderController.php?action=message';
			data.message = $msg_form.find('textarea').val();
			data.info = '你确定要修改吗？';
			data.success = '修改成功！';

			ajaxTips(data, $btn);
		});

		var $tid = $dom.find('.t-id cite'),
			$tid_close = $dom.find('.nav-box .btn-close');

		$tid.on('click', function(){
			var data = {}, $btn = $(this);

			data.tid = $btn.text().trim();

			$.ajax({
				url : "./orderController.php?action=tidapi",
				type : "post",
				dataType : "json",
				data : data,
				beforeSend : function(r){
					$btn.attr('disabled', true);
				},
				success : function(r){
					eval('(' + r + ')');
					var opts = JSON.parse(r);
					// console.log(opts);
					getTidHtml(opts);
				},
				error : function(r){
					alert('查询失败！');
				},
				complete : function(r){
					$btn.attr('disabled', false);
				}
			});

			function getTidHtml(opts){
				var $dom = $('.order .nav-tid'),
					$tb = $dom.find('tbody');
				var data = opts.list;

				if(!data) return false;

				$dom.find('.htr .h4 span').text(opts.no);
				$tb.find('tr').remove();

				for(var i = 0; i < data.length; i++) {
					var $tr = '<tr><td>' + data[i].time + '</td><td>' + data[i].content + '</td></tr>';
					$tb.append($tr);
				}

				$dom.fadeIn();

			}
		});

		$tid_close.on('click', function(){
			$('.nav-box').fadeOut();
		});

		$dom.on('click', '.oprate .confirm-btn', function(){
			var data = grasp($(this), 'confirm'), $btn = $(this);
			data.info = '你确定要确认吗？';
			data.success = '确认成功！';
			ajaxTips(data, $btn);
		});

		$dom.on('click', '.oprate .discard-btn', function(){
			var data = grasp($(this), 'discard'), $btn = $(this);
			data.info = '你确定要放弃吗？';
			data.success = '操作成功！';
			ajaxTips(data, $btn);
		});

		$dom.on('click', '.oprate .send-btn', function(){
			var oid = $(this).parents('tbody').find('.o-id cite').text().trim();
			var pid = $(this).parents('tbody').find('.p-id cite').text().trim();
			$('.nav-add .oid').val(oid);
			$('.nav-add .pid').val(pid);
			$('.nav-add').fadeIn();
		});

		$dom.on('click', '.oprate .cancel-btn', function(){
			var data = grasp($(this), 'cancel'), $btn = $(this);
			data.info = '你确定将订单返回待确认吗？';
			data.success = '操作成功！';
			ajaxTips(data, $btn);
		});

		$dom.on('click', '.oprate .finish-btn', function(){
			var data = grasp($(this), 'change'), $btn = $(this);
			data.status = 3;
			data.info = '你确定要完成吗？';
			data.success = '订单完成！';
			ajaxTips(data, $btn);
		});

		$dom.on('click', '.oprate .fail-btn', function(){
			var data = grasp($(this), 'change'), $btn = $(this);
			data.status = 5;
			data.info = '你确定要退货吗？';
			data.success = '订单失败！';
			ajaxTips(data, $btn);
		});

		$dom.on('click', '.oprate .ending-btn', function(){
			var data = grasp($(this), 'change'), $btn = $(this);
			data.status = 4;
			data.info = '你确定收到货了吗？';
			data.success = '入库成功！';
			ajaxTips(data, $btn);
		});

		var grasp = function($btn, $act){
			var opts = {};
			opts.url = './orderController.php?action=' + $act;
			opts.pid = $btn.parents('tbody').find('.p-id cite').text().trim();
			opts.oid = $btn.parents('tbody').find('.o-id cite').text().trim();
			return opts;
		};
	})();

	var nav_model = (function(){
		var $dom = $('.nav-body'),
			$add = $dom.find('.nav-group .btn-add'),
			$add_c = $dom.find('.nav-add .add-close'),
			$check = $dom.find('.check'),
			$edit = $dom.find('.oprate .btn-edit'),
			$cannel = $dom.find('.oprate .btn-cannel');

		$add.on('click', function(){
			$dom.find('.nav-add').fadeIn();
		});
		$add_c.on('click', function(){
			$dom.find('.nav-add').fadeOut();
		});

		$check.on('click', function(){
			$(this).toggleClass('active');

			if($(this).hasClass('active')){
				$(this).next('.checkbox').prop('checked', true);
			}	else{
				$(this).next('.checkbox').prop('checked', false);
			}
		});

		$edit.on('click', function(){
			$(this).parents('tr').addClass('active');
		});

		$cannel.on('click', function(){
			$(this).parents('tr').removeClass('active');
		});
	})();

	var classification = (function(){
		var $dom = $('.classification'),
			$con = $dom.find('.oprate .btn-con'),
			$del = $dom.find('.oprate .btn-del');

		$con.on('click', function(){
			var data = {}, $btn = $(this);
			data.url = './classController.php?action=change';
			data.id = $(this).parents('tr').find('input[name="id"]').val();
			data.name = $(this).parents('tr').find('input[name="name"]').val();
			data.content = $(this).parents('tr').find('input[name="content"]').val();
			data.image = $(this).parents('tr').find('input[name="img"]').val();
			data.info = '你确定要修改吗？';
			data.success = '修改成功！';

			ajaxTips(data, $btn);

		});

		$del.on('click', function(){
			var data = {}, $btn = $(this);

			data.url = './classController.php?action=delete';
			data.id = $(this).parents('tr').find('input[name="id"]').val();
			data.info = '你确定要删除吗？';
			data.success = "删除成功！";

			ajaxTips(data, $btn);
		});
	})();

	var types = (function(){
		var $dom = $('.types'),
			$con = $dom.find('.oprate .btn-con'),
			$del = $dom.find('.oprate .btn-del'),
			$del_a = $dom.find('.nav-group .btn-del');

		$con.on('click', function(){
			var data = {}, $btn = $(this);
			data.url = './typesController.php?action=change';
			data.id = $(this).parents('tr').find('input[name="id"]').val();
			data.name = $(this).parents('tr').find('input[name="name"]').val();
			data.info = '你确定要修改吗？';
			data.success = '修改成功！';

			ajaxTips(data, $btn);

		});

		$del.on('click', function(){
			var data = {}, $btn = $(this);

			data.url = './typesController.php?action=delete';
			data.id = $(this).parents('tr').find('input[name="id"]').val();
			data.info = '你确定要删除吗？';
			data.success = "删除成功！";

			ajaxTips(data, $btn);
		});

		$del_a.on('click', function(){
			var data = {}, $btn = $(this), n = 0;

			data.url = './typesController.php?action=allDelete';
			data.id = [];
			$('.nav-model table .checkbox').each(function(){
				if($(this).prop('checked')){
					data.id[n] = $(this).val();
					n++;
				}
			});

		});
	})();
	
});