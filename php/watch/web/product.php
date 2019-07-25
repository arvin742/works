<?php
	require dirname(__FILE__)."/header.php";
	require dirname(__FILE__)."/productController.php";

	$id = isset($_GET['id']) ? $_GET['id'] : '';
	if($id == ""){
		header("Location: ./");
	}
	$p = new productController();
	$data = $p->product($id);

	$str = 'product_'.$id;
	if(!isset($_SESSION[$str]) || empty($_SESSION[$str])) {
	 	$_SESSION[$str] = 1;
	 	$r = $p->productVisit($id);
	}

	if($id == 23){
		$hot = "hot";
	}	else{
		$hot = "";
	}
?>

<header class="header">
	<div class="nav-text"><p class="title">京东海外购特卖专区</p></div>
</header>

<div class="content product">
	<div class="container">
		
		<input id="pid" class="hidden" type="text" value="<?php echo $id; ?>" />
		<input id="place" class="hidden" type="text" value="<?php echo $_SESSION['place']; ?>" />

		<a class="c-back btn" href="index.php">&nbsp;</a>
		
		<div class="sec01">
			<div class="img <?php echo $hot ?>"><img src="../upload/images/<?php echo $data[0]['img_detail'] ?>" alt="" /></div>
			
			<div class="icon"><img src="../images/icon-04.png" alt="" /></div>

			<div class="back clearfix">
				<div class="info float-left">
					<p class="price">
						￥<span><?php echo $data[0]['sel_price'] ?></span>
					</p>
					<p class="original h5">
						原价：<span><?php echo $data[0]['ori_price'] ?></span>
					</p>
				</div>
				<div class="count float-left">
					<p class="h5"><span><?php echo $data[0]['sales'] ?></span>人已付款</p>
				</div>
				<div class="time">
					<p class="h5">距离结束仅剩</p>
					<p class="list h5">
						<span></span> : <span></span> : <span></span> : <span></span>
					</p>
					<div class="img"><img src="../images/icon-12.png" alt="" /></div>
				</div>
			</div>
			
			<div class="img"><img src="../upload/images/pro-2.jpg" alt="" /></div>
			
			<p class="h4"><?php echo $data[0]['subtitle'] ?></p>
		</div>

		<?php
			if($data[0]['img_history']){
				echo '<div class="normal history"><div class="img"><img src="../upload/images/'.$data[0]['img_history'].'" alt="" /></div></div>';
			}
		?>

		<div class="sec">
			<div class="img"><img src="../upload/images/<?php echo $data[0]['img_msg'] ?>" alt="" /></div>
		</div>

		<?php
			if($data[0]['img_model']){
				echo '<div class="normal"><div class="img"><img src="../upload/images/'.$data[0]['img_model'].'" alt="" /></div></div>';
			}
		?>
		
		<?php echo getHtml($data[0]['img_info'], "商品详情", 2); ?>

		<!-- <div class="pro-bt">
			<div class="img"><img src="../upload/images/active-decoration-02.jpg" alt="" /></div>
		</div> -->
		
		<!-- <div class="sec">
			<div class="img"><img src="../upload/images/7gotou.jpg" alt="" /></div>
		</div> -->

		<!-- <div class="contact">
			<div class="img"><img src="../upload/images/contact.jpg" alt="" /></div>
		</div> -->
		
		<div class="sec">
			<div class="img"><img src="../upload/images/image-2.jpg" alt="" /></div>
			<div class="img"><img src="../upload/images/image-3.jpg" alt="" /></div>
		</div>

	</div>
</div>

<?php
	$order = $p->productOrder($id);
?>

<div class="content order" id="order">
	<link href="http://cdn.morrich.cn/cdn/cityPicker/cityPicker.css" rel="stylesheet" type="text/css" />

	<div class="head">
		<p class="h4">京东海外购特卖专区</p>
	</div>

	<div class="sec01 sec">
		<div class="container">
			
			<div class="info">
				<p class="h4">
					<label>订购产品</label>
					<span><?php echo $order[0]['subtitle']; ?></span>
				</p>
			</div>
			
		</div>
	</div>
	
	<div class="sec02 sec">
		<div class="container">
			
			<form class="form">
				
				<div class="info">
					<input class="form-control pid hidden" type="text" name="pid" value="<?php echo $id; ?>">
					<input class="form-control hidden place" type="text" name="place" value="<?php echo $_SESSION['place']; ?>">
					
					<?php
						if($order[0]['type']){
							$t_html = '<div class="form-group types"><ul class="list-inline">';

							$types = $order[0]['types'];
							if($types){
								for($i = 0; $i < count($types); $i++){
									$t_c = $id != $types[$i]['id'] ? "" : "active";
									$t_html .= '<li class="'.$t_c.'"><a href="order.php?id='.$types[$i]['id'].'" class="btn">'.$types[$i]['type'].'</a></li>';
								}
							}	else{
								$t_html .= '<li class="active"><a class="btn">'.$order[0]['type'].'</a></li>';
							}

							$t_html .= '</ul></div>';

							echo $t_html;
						}
					?>

					<?php
						$cid = array('', '', '');
						if($order[0]['model']){
							$m_html = '<div class="form-group model"><ul class="list-inline">';

							$order[0]['cid'] = $order[0]['cid'] < 3 ? 0 : $order[0]['cid'] - 3;
							$cid[$order[0]['cid']] = "active";

							$model = $order[0]['model'];
							for($i = 0; $i < count($model); $i++){
								if($model[$i] == 1){
									$m_html .= '<li class="m1 '.$cid[0].'"><a class="btn">男款</a></li>';
								}	else if($model[$i] == 2){
									$m_html .= '<li class="m2 '.$cid[1].'"><a class="btn">女款</a></li>';
								}	else if($model[$i] == 3){
									$m_html .= '<li class="m3 '.$cid[2].'"><a class="btn">情侣款</a></li>';
								}
							}

							$m_html .= '</ul></div>';

							echo $m_html;
						}
					?>
					<div class="form-group number hidden">
						<label>数量</label>
						<div class="rt">
							<a class="prev btn">-</a>
							<input class="form-control" type="text" name="number" value="1" />
							<a class="next btn">+</a>
						</div>
					</div>
					<div class="form-group price">
						<label>价格</label>
						<span>￥</span>
						<span class="total">
						<?php 
							if($cid[2] == "active"){
								$order[0]['sel_price'] *= 2;
							}
							echo $order[0]['sel_price'].".00";
						?>
						</span>
						<input class="form-control hidden" type="text" name="price" value="<?php echo $order[0]['sel_price']; ?>" />
					</div>

				</div>
				
				<div class="message">
					<p class="h6">收货信息 <span>（请填写完成的信息，以供我们发货）</span></p>
					
					<div class="name form-group">
						<input class="form-control" type="text" name="name" placeholder="请输入收货人姓名" />
						<label>收货人姓名</label>
					</div>
					<div class="phone form-group">
						<input class="form-control" type="text" name="phone" placeholder="请输入手机" />
						<label>联系手机</label>
					</div>
					<div class="citys form-group">
						<label>选择地区</label>
						<input class="form-control hidden" type="text" name="city" placeholder="选择地区" />
						<div class="city-picker-selector" id="city-selector"></div>
					</div>
					<div class="address form-group">
						<input class="form-control" type="text" name="address" placeholder="详细地址" />
						<label>详细地址</label>
					</div>
					<div class="form-group payment">
						<label>付款方式</label>
						<div class="form-control">
							<div class="row">
								<div class="col-6"><img src="../images/icon-10.png" alt="" /><span>货到付款</span></div>
								<div class="col-6"><img src="../images/icon-11.png" alt="" /><span>顺丰包邮</span></div>
							</div>
						</div>
						<p class="tips">全场顺丰包邮，货到付款在家等快递送货上门，先验货后付款！</p>
					</div>
					<div class="content form-group">
						<textarea class="form-control" rows="2" name="content" placeholder="输入留言备注"></textarea>
						<label>客户留言</label>
					</div>
				</div>
				
				<div class="submit">
					<button class="btn" type="button">提交订单</button>
				</div>
				
			</form>
			
		</div>
	</div>

	<div class="nav-tips">
		<div class="back">
			<p class="info animated">
				<i class="fa fa-smile-o"></i>
				<span></span>
			</p>
		</div>
	</div>

	<script src="http://cdn.morrich.cn/cdn/cityPicker/citydata.min.js"></script>
	<script src="http://cdn.morrich.cn/cdn/cityPicker/cityPicker.js"></script>
</div>

<div class="content product pro-bt">
	<div class="container">

		<div class="normal">
			<div class="img"><img src="../upload/images/image-1.jpg" alt="" /></div>
		</div>

		<?php echo getHtml($data[0]['img_comment'], "好评如潮", 3); ?>

		<div class="normal">
			<div class="img"><img src="../upload/images/watch-faq01.jpg" alt="" /></div>
			<div class="img"><img src="../upload/images/watch-faq02.jpg" alt="" /></div>
			<div class="img"><img src="../upload/images/watch-faq03.jpg" alt="" /></div>
		</div>

		<div class="new-bt">
			<div class="row">
				<div class="col-6"><a class="btn to-top">返回顶部</a></div>
				<div class="col-6"><a class="btn buy-btn <?php if($data[0]['status'] == 0) echo "over"; ?>" href="#order">立即购买</a></div>
			</div>
		</div>

		<div class="bottom hidden">
			<ul class="list-unstyled">
				
			</ul>
			<a class="btn <?php if($data[0]['status'] == 0) echo "over"; ?>" href="order.php?id=<?php echo $data[0]['id']; ?>">马上抢</a>
		</div>
		
	</div>
</div>

<script>
	var city = $('#city-selector').cityPicker({
		dataJson: cityData,
		renderMode: true,
		search: false,
		autoSelected: false,
		level: 3,
	});

	$(function() {
		$('.to-top').toTop();

		$('.new-bt .buy-btn').click(function(){
			setTimeout(function(){
				$('.new-bt').addClass('on');
			}, 300);
		});
	});


	var doc_h = 1, scr_h = 0;

	$(window).scroll(function() {
		var top = $(this).scrollTop();

		if(top > 0) {
			$('.header').hide();
		}	else{
			$('.header').show();
		}

		$('.new-bt').removeClass('on');
		var pt = $('.order').offset().top - $(window).height();
		var bt = $('.order').offset().top + $('.order').height() - $(window).height() / 2;		
		if(top > pt && top < bt){
			$('.new-bt').addClass('on');
		}

		scr_h = scr_h < top ? top : scr_h;
		doc_h = $('html').height();
	});

	window.onload = function(){
		var pid = $('.product #pid').val(),
			place = $('.product #place').val(),
			ip = returnCitySN ? (returnCitySN.cname + '\n' + returnCitySN.cip) : '未知位置';

		$.ajax({
			url : "./orderController.php?action=orderUser",
			type : "post",
			dataType : "json",
			data : {'pid': pid, 'ip': ip, 'place': place},
			success : function(r){
				// console.log(r);
			}
		});
	}

	window.onbeforeunload = function(){
		var ip = returnCitySN ? (returnCitySN.cname + '\n' + returnCitySN.cip) : '未知位置',
			scroll = (scr_h / doc_h * 100).toFixed(2) + '%';

		$.ajax({
			url : "./orderController.php?action=orderEnd",
			type : "post",
			async : false,
			dataType : "json",
			data : {'status': 1, 'scroll': scroll, 'ip': ip},
			success : function(r){
				// console.log(r);
			},
		});
	}
	
</script>

<?php
	require dirname(__FILE__)."/footer.php";

	function getHtml($data, $title, $i){

		$class = "sec".($i < 10 ? "0".$i : $i);

		if($data){
$htr = <<<EOF
		<div class="{$class}">
			<p class="h4">{$title}</p>
			<ul class="list-unstyled">
EOF;
			$con = "";
			for($j = 0; $j  < count($data); $j ++){ 
				$con .= <<<EOF
				<li><img src="../upload/images/{$data[$j]}" alt="" /></li>
EOF;
			}
		
$ftr = <<<EOF
			</ul>
		</div>
EOF;
			return $htr.$con.$ftr;
		}	else{
			return <<<EOF
			<div class="{$class} hidden"></div>
EOF;
		}
	}
?>