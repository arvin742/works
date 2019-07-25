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

<div class="content product">
	<div class="container">

		<input id="pid" class="hidden" type="text" value="<?php echo $id; ?>" />
		<input id="place" class="hidden" type="text" value="<?php echo $_SESSION['place']; ?>" />

		<a class="c-back btn">&nbsp;</a>
		
		<div class="sec01">
			<div class="img <?php echo $hot ?>"><img src="../upload/images/<?php echo $data[0]['img_detail'] ?>" alt="" /></div>
			
			<div class="icon"><img src="../images/icon-4.png" alt="" /></div>

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
				<div class="time active">
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

		<div class="normal">
			<div class="img"><img src="../upload/images/watch-faq01.jpg" alt="" /></div>
			<div class="img"><img src="../upload/images/watch-faq02.jpg" alt="" /></div>
			<div class="img"><img src="../upload/images/watch-faq03.jpg" alt="" /></div>
		</div>

		<!-- <div class="pro-bt">
			<div class="img"><img src="../upload/images/active-decoration-02.jpg" alt="" /></div>
		</div> -->
		
		<div class="sec">
			<div class="img"><img src="../upload/images/7gotou.jpg" alt="" /></div>
		</div>

		<?php echo getHtml($data[0]['img_comment'], "好评如潮", 3); ?>

		<!-- <div class="contact">
			<div class="img"><img src="../upload/images/contact.jpg" alt="" /></div>
		</div> -->
		
		<div class="bottom">
			<ul class="list-unstyled">
				
			</ul>
			<a class="btn <?php if($data[0]['status'] == 0) echo "over"; ?>" href="order.php?id=<?php echo $data[0]['id']; ?>">马上抢</a>
		</div>
		
	</div>
</div>

<script>
	var doc_h = 1, scr_h = 0;
	$(window).scroll(function() {
		var top = $(this).scrollTop();	
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
				console.log(r);
			},
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
				console.log(r);
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