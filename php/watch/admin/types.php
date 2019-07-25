<?php
	header("Content-Type: application/json");
	header("Content-Type: text/html; charset=UTF-8");

	require dirname(__FILE__)."/meta.php";
	require dirname(__FILE__)."/header.php";
	require dirname(__FILE__)."/typesController.php";

?>

<div class="content nav-body nav-model types">
	<div class="nav-crumbs">
		<ol class="breadcrumb">
			<li><a href="./index.php">主页</a></li>
			<li><a href="./product.php">商品管理</a></li>
			<li><a href="./types.php">模型管理</a></li>
		</ol>
	</div>

	<ul class="nav-group list-inline">
		<li><a class="btn btn-add">添加</a></li>
		<li><a class="btn btn-del">批量删除</a></li>
	</ul>

	<div class="table-responsive-xl">
		<table class="table">
			<thead>
				<tr>
					<td>&nbsp;</td>
					<td>ID</td>
					<td>名称</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody>
				<?php
			    	$t = new typesController();
			    	$data = $t->types();
			    	if($data){
			    		for($i = 0; $i < count($data); $i++) {
							echo getHtml($data, $i); 
				    	}
			    	}
			    ?>
			</tbody>
		</table>
	</div>

	<div class="nav-add">
		<div class="add-main">
			<div class="add-htr">
				<p class="add-head">新增模型</p>
				<a class="add-close btn"><i class="fa fa-remove"></i></a>
			</div>
			<div class="add-text">
				<form class="add-form" action="./typesController.php?action=insert" method="post">
					<div class="form-group">
						<input class="form-control" type="text" name="c_name" placeholder="名称" required />
					</div>
					<div class="form-group add-btn">
						<button class="btn btn-sub" type="submit">提交</button>
						<button class="btn btn-res" type="reset">重置</button>
					</div>
				</form>
			</div>
		</div>
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
			<td><span>{$num}</span></td>
			<td>
				<span>{$data[$i]['name']}</span>
				<input class="form-control" type="text" name="name" value="{$data[$i]['name']}" />
			</td>
			<td>
				<ul class="list-inline oprate">
					<li><a class="btn btn-con">确定</a></li>
					<li><a class="btn btn-cannel">取消</a></li>
					<li><a class="btn btn-edit">修改</a></li>
					<li><a class="btn btn-del">删除</a></li>
				</ul>
			</td>
		</tr>
EOF;
	}
?>