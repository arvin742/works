<?php
	header('Content-Type:text/html; charset=UTF-8');

	require dirname(__FILE__)."/header.php";
	require dirname(__FILE__)."/indexController.php";

	$place = isset($_GET['place']) ? $_GET['place'] : 0;
	$_SESSION['place'] = $place;
	
	$h = new indexController();
	$data = $h->index();

	if(!isset($_SESSION['index_visit']) || empty($_SESSION['index_visit'])) {
	 	$_SESSION['index_visit'] = 1;
	 	$r = $h->indexVisit();
	}

	$banner = $data->banner[0]['price'];

	// var_dump($data);
	// return false;
?>

<link href="http://cdn.morrich.cn/cdn/swiper4/swiper-4.1.0.min.css" rel="stylesheet" type="text/css" />
<script src="http://cdn.morrich.cn/cdn/swiper4/swiper-4.1.0.min.js"></script>

<header class="header">
	<div class="swiper-container swiper-htr text-center">
		<div class="swiper-wrapper">
			<div class="swiper-slide"><a class="btn" data-id="0">双11甄选</a></div>
<?php
	for($i = 0; $i < count($data->cft); $i++) { 
echo <<<EOF
		<div class="swiper-slide"><a class="btn" data-id="{$data->cft[$i]['id']}">{$data->cft[$i]['name']}</a></div>
EOF;
	}
?>	

		</div>
	</div>
</header>

<div class="content index">
	<div class="container">
		
		<div class="sec01">
			<a href="./product.php?id=4"><img src="../upload/images/banner-01.jpg" alt="banner"/></a>
			
			<div class="icon"><img src="../images/icon-4.png" alt="" /></div>

			<div class="back clearfix">
				<div class="info float-left">
					<p class="price">
						￥<span><?php echo $banner[0]['sel_price']; ?></span>
					</p>
					<p class="original h5">
						原价：<span><?php echo $banner[0]['ori_price']; ?></span>
					</p>
				</div>
				<div class="count float-left">
					<p class="h5"><span><?php echo $banner[0]['sales']; ?></span>人已付款</p>
					<ul class="list-unstyled scroll">

					</ul>
				</div>
				<div class="time active">
					<p class="list h5">
						<span></span><label>:</label><span></span><label>:</label><span></span><label>:</label><span></span>
					</p>
					<div class="img"><img src="../images/icon-12.png" alt="" /></div>
				</div>
				<div class="s-btn">
					<a class="btn" href="./product.php?id=4">&nbsp;</a>
				</div>
			</div>
		</div>
		
		<div class="sec02 slide-0">
			<p class="title">· 双11甄选 ·</p>
			<p class="text">双11国际狂欢，为你推荐四款靠谱腕间伴侣</p>
			
			<ul class="pro-list list-unstyled">
				<li><a href="./product.php?id=21" class="img"><img src="../upload/images/index-2.jpg" alt="" /></a></li>
				<li><a href="./product.php?id=20" class="img"><img src="../upload/images/index-3.jpg" alt="" /></a></li>
				<li><a href="./product.php?id=12" class="img"><img src="../upload/images/index-4.jpg" alt="" /></a></li>
				<li><a href="./product.php?id=28" class="img"><img src="../upload/images/index-2.png" alt="" /></a></li>
			</ul>	
		</div>

		<div class="sec02 sec-new">
			<p class="title">· 新品推荐 ·</p>
			<p class="text">二款人气新品抢先发售，立享1折优惠</p>
			
			<ul class="pro-list list-unstyled">
				<li><a href="./product.php?id=31" class="img"><img src="../upload/images/new-01.jpg" alt="" /></a></li>
				<li><a href="./product.php?id=30" class="img"><img src="../upload/images/new-02.jpg" alt="" /></a></li>
			</ul>	
		</div>

		<?php
			for($i = 0; $i < count($data->cft); $i++) {
				echo getHtml($data->cft, $i);
			}
		?>
		
		<div class="loading">
			<p class="h5">没有更多内容…</p>
		</div>
		
	</div>

	<div class="box">
		<div class="main text-center">
			<div class="img"><img src="../upload/images/group-8.png" alt="" /></div>
			<a class="btn"><img src="../images/close.png" alt="" /></a>
		</div>
	</div>
</div>

<script type="text/javascript">
	var swiper_htr = new Swiper ('.swiper-htr', {
		slidesPerView : 4,
 	});
</script>

<?php
	require dirname(__FILE__)."/footer.php";

	function getHtml($data, $i){
		$num = $i + 3;
		$class = "sec".($num < 10 ? "0".$num : $num);

		if($data[$i]['pro']){
			$pro_info = $data[$i]['pro'];

$htr = <<<EOF
		<div class="{$class} slide-{$data[$i]['id']} sec">
			<p class="title">· {$data[$i]['name']} ·</p>
			<div class="t-img"><img src="../upload/images/{$data[$i]['image']}" alt="" /></div>
			
			<div class="row text-center">
EOF;
			$con = "";
			for($j = count($pro_info) - 1; $j >= 0; $j--){ 
				$status = "";
				if($pro_info[$j]['status'] == 0){
					$status = "over";
				}

				$con .= <<<EOF
				<div class="col-6 {$status}">
					<div class="main">
						<a href="./product.php?id={$pro_info[$j]['id']}" class="img"><img src="../upload/images/{$pro_info[$j]['img_index']}" alt="" /></a>
						<p class="h4">{$pro_info[$j]['name']}</p>
						<p class="price">特价：<span>¥{$pro_info[$j]['sel_price']}</span></p>
						<p class="original">原价：<span>{$pro_info[$j]['ori_price']}</span></p>
						<a class="btn" href="product.php?id={$pro_info[$j]['id']}">购买</a>
					</div>
				</div>
EOF;
			}
		
$ftr = <<<EOF
			</div>
		</div>
EOF;
			return $htr.$con.$ftr;
		}	else{
			return <<<EOF
			<div class="{$class} slide-{$data[$i]['id']} sec hidden"></div>
EOF;
		}
	}
?>