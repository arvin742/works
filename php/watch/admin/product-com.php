<?php
	require dirname(__FILE__)."/meta.php";
	require dirname(__FILE__)."/header.php";
	require dirname(__FILE__)."/productController.php";

	$id = isset($_GET['id']) ? $_GET['id'] : '';
	if($id){
		$p = new productController();
		$data = $p->productCom($id);
	}	else{
		header("Location: ./product.php");
	}
?>

<div class="content nav-body product-com">
	<div class="nav-crumbs">
		<ol class="breadcrumb">
			<li><a href="./index.php">主页</a></li>
			<li><a href="./product.php">商品管理</a></li>
			<li><a href="./product.php">产品管理</a></li>
		</ol>
	</div>

	<ul class="list-inline">
		<li><p class="title">产品评论</p></li>
		<li><a class="btn btn-add">添加</a></li>
	</ul>

	<div class="table-responsive">
		<table class="table">
			<thead>
				<tr>
					<td>序号</td>
					<td>评星</td>
					<td>评论</td>
					<td>图片 </td>
					<td>日期</td>
					<td>点赞</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody>

				<?php
			    	if($data){
			    		for($i = 0; $i < count($data); $i++) {
							echo getHtml($data, $i); 
				    	}
			    	}
			    ?>

			</tbody>
		</table>
	</div>

	<form class="form" action="./productController.php?action=comAdd" method="post">
		<p class="h5 t-add">添加评论</p>
		<p class="h5 t-edit">修改评论</p>
		<div class="form-group hidden">
			<input class="form-control id" type="text" name="id" />
			<input class="form-control pid" type="text" name="pid" value="<?php echo $id; ?>" />
		</div>
		<div class="form-group form-text name">
			<label>用户姓名</label>
			<input class="form-control" type="text" name="name" placeholder="请输入姓名" required />
		</div>
		<div class="form-group star">
			<label>评星</label>
			<ul class="list-inline form-control">
				<li>&nbsp;</li>
				<li>&nbsp;</li>
				<li>&nbsp;</li>
				<li>&nbsp;</li>
				<li class="active">&nbsp;</li>
			</ul>
			<input class="form-control hidden" type="text" name="score" value="5" />
		</div>
		<div class="form-group form-text image">
			<label>图片</label>
			<input class="form-control" type="text" name="image" placeholder="请输图片名称" />
		</div>
		<div class="form-group form-text content">
			<label>评论</label>
			<input class="form-control" type="text" name="content" placeholder="请输入评论" required />
		</div>
		<div class="form-group form-text date">
			<label>日期</label>
			<input class="form-control" type="date" name="date" placeholder="选择日期" required />
		</div>
		<div class="form-group form-text support">
			<label>点赞数</label>
			<input class="form-control" type="text" name="support" placeholder="填写数量" required />
		</div>
		<div class="form-group">
			<button class="btn" type="submit">提交</button>
			<button class="btn btn-cannel" type="button">取消</button>
		</div>
	</form>

</div>

<?php
	require dirname(__FILE__)."/footer.php";

	function getHtml($data, $i){
		$num = $i + 1;
return <<<EOF
		<tr>
			<td>{$num}<span class="id hidden">{$data[$i]['id']}</span></td>
			<td>{$data[$i]['score']}</td>
			<td>{$data[$i]['content']}</td>
			<td>{$data[$i]['image']}</td>
			<td><span class="date">{$data[$i]['date']}</span></td>
			<td>{$data[$i]['support']}</td>
			<td>
				<div class="oprate">
		        	<ul class="list-inline">
		        		<li><a class="btn btn-edit">修改</a></li>
		        		<li><a class="btn btn-del">删除</a></li>
		        	</ul>
		        </div>
			</td>
		</tr>
EOF;
	}
?>