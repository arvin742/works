<?php
	require dirname(__FILE__)."/header.php";
	require dirname(__FILE__)."/orderController.php";

	$pid = isset($_GET['id']) ? $_GET['id'] : '';
	if($pid == ""){
		header("Location: ./");
	}

	$o = new orderController();
	$data = $o->product($pid);

	if(!isset($_SESSION['order_visit']) || empty($_SESSION['order_visit'])) {
	 	$_SESSION['order_visit'] = $o->GetRandWord(6).$o->GetRandStr(3);
	 	$r = $o->orderVisit();
	}

	$day = time();
	$u = $o->orderUse($pid, $day, $_SESSION['order_visit']);
	// var_dump($u);
?>

<link href="../css/jquery.city.css" rel="stylesheet" type="text/css" />

<style>
	body{
		background: #f2f2f2;
	}
</style>

<div class="content order">

	<div class="head">
		<a class="c-back btn">&nbsp;</a>
		<p class="h4">确认订单</p>
	</div>

	<div class="sec01">
		<div class="container">
			
			<div class="row">
				<div class="col-3 img"><img src="../upload/images/<?php echo $data[0]['img_index']; ?>" alt="" /></div>
				<div class="col-9 info">
					<p class="h4"><?php echo $data[0]['subtitle']; ?></p>
					<p class="h5">货到付款并顺丰包邮</p>
				</div>
			</div>
			
		</div>
	</div>
	
	<div class="sec02">
		<div class="container">
			
			<form class="form">
				
				<div class="info">
					<input class="form-control hidden" type="text" name="pid" value="<?php echo $pid; ?>">
					<input class="form-control hidden" type="text" name="place" value="<?php echo $_SESSION['place']; ?>">
					<input class="form-control hidden visit" type="text" name="visit" value="<?php echo $day; ?>">
					<p class="h6">产品规格</p>
					
					<?php
						if($data[0]['type']){
							$t_html = '<div class="form-group types"><ul class="list-inline">';

							$types = $data[0]['types'];
							if($types){
								for($i = 0; $i < count($types); $i++){
									$t_c = $pid != $types[$i]['id'] ? "" : "active";
									$t_html .= '<li class="'.$t_c.'"><a href="order.php?id='.$types[$i]['id'].'" class="btn">'.$types[$i]['type'].'</a></li>';
								}
							}	else{
								$t_html .= '<li class="active"><a class="btn">'.$data[0]['type'].'</a></li>';
							}

							$t_html .= '</ul></div>';

							echo $t_html;
						}
					?>

					<?php
						$cid = array('', '', '');
						if($data[0]['model']){
							$m_html = '<div class="form-group model"><ul class="list-inline">';

							$data[0]['cid'] = $data[0]['cid'] < 3 ? 0 : $data[0]['cid'] - 3;
							$cid[$data[0]['cid']] = "active";

							$model = $data[0]['model'];
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
					<div class="form-group number">
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
								$data[0]['sel_price'] *= 2;
							}
							echo $data[0]['sel_price'].".00";
						?>
						</span>
						<input class="form-control hidden" type="text" name="price" value="<?php echo $data[0]['sel_price']; ?>" />
					</div>

				</div>
				
				<div class="message">
					<p class="h6">收货信息 <span>（请填写完成的信息，以供我们发货）</span></p>
					
					<div class="name form-group">
						<label>收货人姓名</label>
						<input class="form-control" type="text" name="name" placeholder="请输入收货人姓名" />
					</div>
					<div class="phone form-group">
						<label>联系手机</label>
						<input class="form-control" type="text" name="phone" placeholder="请输入手机" />
					</div>
					<div class="iphone form-group">
						<div class="browser">
					        <section class="express-area">
				            <a id="expressArea" href="javascript:void(0)">
					            <dl>
					                <dt>选择地区 </dt>
					                <dd>省、市、区/县</dd>
					                <input class="form-control hidden" type="text" name="city" />
					            </dl>
				            </a>
					        </section>
					        <section id="areaLayer" class="express-area-box">
					            <div class="head">
					              	<h3>选择地区</h3>
					              	<a id="backUp" class="back" href="javascript:void(0)" title="返回"></a>
					              	<a id="closeArea" class="close" href="javascript:void(0)" title="关闭"></a>
					            </div>
					            <article id="areaBox">
					              	<ul id="areaList" class="area-list"></ul>
					            </article>
					        </section>
					        <div id="areaMask" class="mask"></div>
				    	</div>
					</div>
					<div class="address form-group">
						<label>详细地址</label>
						<input class="form-control" type="text" name="address" placeholder="详细地址" />
					</div>
					<div class="content form-group">
						<label>客户留言</label>
						<input class="form-control" type="text" name="content" placeholder="输入留言备注" />
					</div>
					<div class="form-group payment">
						<label>付款方式</label>
						<div class="form-control">
							<div class="row">
								<div class="col-6"><img src="../images/icon-10.png" alt="" /><span>货到付款</span></div>
								<div class="col-6"><img src="../images/icon-11.png" alt="" /><span>顺丰包邮</span></div>
							</div>
						</div>
						<p class="tips">温馨提示： 选择货到付款在家等快递公司送货上门，先验货后付款！</p>
					</div>
				</div>
				
				<div class="submit">
					<button class="btn" type="button">提交订单</button>
				</div>
				
			</form>
			
		</div>
	</div>
	
	<div class="sec03">
		<p class="h4">&nbsp;</p>
	</div>

	<div class="sec">
		<div class="img"><img src="../upload/images/7gotou.jpg" alt="" /></div>
	</div>
	
</div>

<script src="../js/jquery.city.js"></script>

<?php
	require dirname(__FILE__)."/footer.php";
?>