<?php
	header("Content-Type: text/json; charset=UTF-8");

	require dirname(__FILE__)."/meta.php";
	require dirname(__FILE__)."/header.php";
	require dirname(__FILE__)."/orderController.php";

	$id = isset($_GET['id']) ? $_GET['id'] : -1;
?>

<div class="content nav-body order">
	<div class="nav-crumbs">
		<ol class="breadcrumb">
			<li><a href="./index.php">主页</a></li>
			<li><a href="./order.php?id=0">订单管理</a></li>
		</ol>
	</div>

	<div class="nav-htr btn-group">
		<a href="./order.php?id=0" class="btn active">待确认订单</a>
		<a href="./order.php?id=1" class="btn">未发货订单</a>
		<a href="./order.php?id=2" class="btn">运输中订单</a>
		<a href="./order.php?id=3" class="btn">完成的订单</a>
		<a href="./order.php?id=4" class="btn">退货的订单</a>
		<a href="./order.php?id=-1" class="btn">所有的订单</a>
	</div>

	<div class="nav-date float-right">
		<form class="excel-form" action="./orderController.php?action=excel" method="post">
			<input class="hidden page" type="text" name="page" />
			<input class="hidden limit" type="text" name="limit" />
			<input class="hidden status" type="text" name="status" />
			<input class="hidden date" type="text" name="date" />
			<button class="btn excel-btn" type="submit">导出数据</button>
		</form>

		<a class="btn msg-btn">信息模板</a>

		<form class="form">
			<label><input class="form-control check-date" type="date"></label>
			<label><button class="btn check-btn" type="button">查询</button></label>
		</form>
	</div>

	<div class="table-responsive-xl">
		<table class="table order-table" data-id="<?php echo $id; ?>">

		    <thead>
		      <tr>
		        <th>订单详情</th>
		        <th>收货人</th>
		        <th>收货地址</th>
		        <th>金额</th>
		        <th>备注</th>
		        <th>渠道</th>
		        <th>IP</th>
		        <th>设备</th>
		        <th>操作</th>
		      </tr>
		    </thead>

		</table>
	</div>

	<div class="nav-add">
		<div class="add-main">
			<div class="add-htr">
				<p class="add-head">填写快递单号</p>
				<a class="add-close btn"><i class="fa fa-remove"></i></a>
			</div>
			<div class="add-text">
				<form class="add-form" action="./orderController.php?action=send" method="post">
					<div class="form-group">
						<input class="form-control" type="text" name="tid" placeholder="快递单号" required />
						<input class="form-control hidden oid" type="text" name="oid" />
						<input class="form-control hidden pid" type="text" name="pid" />
					</div>
					<div class="form-group add-btn">
						<button class="btn btn-sub" type="submit">提交</button>
						<button class="btn btn-res" type="reset">重置</button>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div class="nav-box nav-msg">
		<div class="box-back">
			<div class="htr">
				<p class="h4">信息模板</p>
				<a class="btn btn-close"><i class="fa fa-close"></i></a>
			</div>

			<?php 
				$msg_model = $o->msgModel();
				$message = $msg_model ? $msg_model[0]['message'] : '';
			?>

			<div class="box-text">
				<div class="tips">
					<p class="h4">Tips:</p>
					<p class="info">
						<span>{product} : 产品名称</span>
						<span>{types} : 产品类型</span>
						<span>{name} : 收货姓名</span>
						<span>{phone} : 收货电话</span>
						<span>{address} : 收货地址</span>
					</p>
				</div>
				
				<form class="form">
					<div class="form-group">
						<textarea class="form-control" rows="10" placeholder="信息模板" ><?php echo $message; ?></textarea>
					</div>
					<div class="form-group submit">
						<button class="btn" type="button">提交</button>
					</div>
				</form>
			</div>

		</div>
	</div>

	<div class="nav-box nav-tid">
		<div class="box-back">
			<div class="htr">
				<p class="h4">
					快递单号：<span>&nbsp;</span>
				</p>
				<a class="btn btn-close"><i class="fa fa-close"></i></a>
			</div>

			<div class="main">
				<table class="table">

					<thead>
						<tr>
							<td>时间</td>
							<td></td>
							<td>跟踪</td>
						</tr>
					</thead>

					<tbody></tbody>

				</table>
			</div>

		</div>
	</div>

	<nav class="nav-page">
		<ul class="pagination">
			
		</ul>
	</nav>

</div>

<script>
	$(function(){
		var msg = '';
		$('.btn-copy').on('click', function(){
			msg = $(this).parents('.message').find('.msg').text();
		});

		var clipboard = new Clipboard('.btn-copy', {
			text: function(){
				return msg;
			}
		});

	    clipboard.on('success', function(e) {
	    	alert('复制成功');
	        // console.log(e);
	    });

	    clipboard.on('error', function(e) {
	    	alert('复制失败');
	        // console.log(e);
	    });
	});
</script>

<?php
	require dirname(__FILE__)."/footer.php";
?>