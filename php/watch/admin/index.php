<?php
	header("Content-Type: text/html; charset=UTF-8");
	
	require dirname(__FILE__)."/meta.php";
	require dirname(__FILE__)."/header.php";
	require dirname(__FILE__)."/indexController.php";
	
	$h = new indexController();
	$data = $h->index();

	$data[0]['visit'] = $data[0]['visit'] ? $data[0]['visit'] : 0;
?>

<div class="content nav-body index">
	
	<div class="sec01 row">
		<div class="nav-card">
			<p class="h4">今天的访问量</p>
			<p class="h4"><span><?php echo $data[0]['visit']; ?></span>次</p>
		</div>

		<div class="nav-card">
			<p class="h4">0~8点的访问量</p>
			<p class="h4"><span><?php echo $data[0]['time_morring']; ?></span>次</p>
		</div>

		<div class="nav-card">
			<p class="h4">8~16点的访问量</p>
			<p class="h4"><span><?php echo $data[0]['time_noon']; ?></span>次</p>
		</div>

		<div class="nav-card">
			<p class="h4">16~24点的访问量</p>
			<p class="h4"><span><?php echo $data[0]['time_night']; ?></span>次</p>
		</div>

		<div class="nav-card">
			<p class="h4">002的访问量</p>
			<p class="h4"><span><?php echo $data[0]['place2']; ?></span>次</p>
		</div>

		<div class="nav-card">
			<p class="h4">004的访问量</p>
			<p class="h4"><span><?php echo $data[0]['place4']; ?></span>次</p>
		</div>
	</div>

	<div class="sec02 table-responsive">
		<table class="table">
			<thead>
				<tr>
					<td>用户</td>
					<td>产品</td>
					<td>浏览位置</td>
					<td>渠道</td>
					<td>时间</td>
					<td>款式</td>
					<td>名字</td>
					<td>手机</td>
					<td>城市</td>
					<td>详细地址</td>
					<td>备注</td>
					<td>提交按钮</td>
				</tr>
			</thead>
			
			<tbody>
				
			</tbody>
		</table>
	</div>

	<nav class="nav-page">
		<ul class="pagination">
			
		</ul>
	</nav>

</div>

<?php
	require dirname(__FILE__)."/footer.php";
?>