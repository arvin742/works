<?php
	require dirname(__FILE__)."/header.php";
	require dirname(__FILE__)."/successController.php";

	$id = isset($_GET['id']) ? $_GET['id'] : '';
	if($id == ""){
		header("Location: ./");
	}
	$s = new successController();
	$data = $s->success($id);
?>

<div class="content success">
	<div class="container">
		
		<p class="h2">恭喜你，订购成功！ </p>
		
		<!-- <div class="img"><img src="../images/icon-2.png" alt=""/></div> -->
		
		<ul class="message list-unstyled">
			<li class="oid">
				<cite>订单号</cite>
				<p><?php echo $data[0]['oid']; ?></p>
			</li>
			<li>
				<cite>订购产品</cite>
				<p><?php echo $data[0]['subtitle']; ?></p>
			</li>
			<li>
				<cite>数量/价格</cite>
				<p><?php echo $data[0]['number'].'/'.$data[0]['price']; ?></p>
			</li>
			<li>
				<cite>姓名</cite>
				<p><?php echo $data[0]['name']; ?></p>
			</li>
			<li class="phone">
				<cite>手机号</cite>
				<p><?php echo $data[0]['phone']; ?></p>
			</li>
			<li>
				<cite>详细地址</cite>
				<p><?php echo $data[0]['address']; ?></p>
			</li>
			<li>
				<cite>付款方式</cite>
				<p>货到付款</p>
			</li>
		</ul>
		
		<a class="btn" href="./">返回 <span>(<cite>120</cite>s)</span></a>
		
	</div>
</div>

<script>
	var s = parseInt($('.success .btn cite').text());
	var time = setInterval(function(){
		if(s <= 0){
			clearInterval(time);
			window.location.href = "./";
		}	else{
			$('.success .btn cite').text(--s);
		}
	}, 1000);

	history.pushState(null, null, location.href);
	window.addEventListener('popstate', function(event) {
	    history.pushState(null, null, location.href);
	    //此处加入回退时你要执行的代码
	}); 
</script>

<?php
	require dirname(__FILE__)."/footer.php";
?>