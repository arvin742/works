<?php
	require dirname(__FILE__)."/meta.php";
	require dirname(__FILE__)."/header.php";
	require dirname(__FILE__)."/productController.php";
?>

<div class="content nav-body nav-model product">
	<div class="nav-crumbs">
		<ol class="breadcrumb">
			<li><a href="./index.php">主页</a></li>
			<li><a href="./product.php">商品管理</a></li>
			<li><a href="./product.php">产品管理</a></li>
		</ol>
	</div>

	<ul class="nav-group list-inline">
		<li><a class="btn btn-add" href="product-add.php">添加</a></li>
		<li><a class="btn btn-del">批量删除</a></li>
	</ul>

	<div class="table-responsive-xl">
		<table class="table">
			<thead>
				<tr>
					<td>&nbsp;</td>
					<td>ID</td>
					<td>详细信息</td>
					<td>库存</td>
					<td>销量</td>
					<td>访问量</td>
					<td>创建时间</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody>

				<?php
			    	$p = new productController();
			    	$data = $p->product();
			    	if($data){
			    		for($i = 0; $i < count($data); $i++) {
							echo getHtml($data, $i); 
				    	}
			    	}
			    ?>

			</tbody>
		</table>
	</div>

</div>

<?php
	require dirname(__FILE__)."/footer.php";

	function getHtml($data, $i){
		$num = $i + 1;
return <<<EOF
		<tr>
			<td>
				<span class="check">
					<i class="no fa fa-square-o"></i>
					<i class="yes fa fa-check-square-o"></i>
				</span>
				<input class="form-control checkbox" type="checkbox" name="id" value="{$data[$i]['id']}">
			</td>
			<td><span>{$data[$i]['id']}</span></td>
			<td>
				<div class="info">
					<span class="img"><img src="../upload/images/{$data[$i]['img_index']}" alt=""></span>
		        	<span class="txt">
		        		<cite>{$data[$i]['subtitle']}</cite> <br />
		        		<label>￥ {$data[$i]['sel_price']}</label>
		        	</span>
				</div>
			</td>
			<td>{$data[$i]['real_stock']}</td>
			<td>{$data[$i]['sales']}</td>
			<td>{$data[$i]['access']}</td>
			<td>
				<span class="date">{$data[$i]['date']}</span> <br />
				<span class="date">{$data[$i]['time']}</span>
			</td>
			<td>
				<div class="oprate {$data[$i]['status']}">
		        	<ul class="list-inline">
		        		<li><a class="btn" href="./product-edit.php?id={$data[$i]['id']}">编辑</a></li>
		        		<li><a class="btn btn-com" href="./product-com.php?id={$data[$i]['id']}">评论</a></li>
		        		<li class="up"><a class="btn btn-up">上架</a></li>
		        		<li class="down"><a class="btn btn-down">下架</a></li>
		        		<li><a class="btn btn-del">删除</a></li>
		        	</ul>
		        </div>
			</td>
		</tr>
EOF;
	}
?>