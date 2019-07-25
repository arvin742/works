<?php
	require dirname(__FILE__)."/meta.php";
	require dirname(__FILE__)."/header.php";
	require dirname(__FILE__)."/productController.php";
?>

<div class="content nav-body product-edit">
	<div class="nav-crumbs">
		<ol class="breadcrumb">
			<li><a href="./index.php">主页</a></li>
			<li><a href="./product.php">商品管理</a></li>
			<li><a href="./product.php">产品管理</a></li>
		</ol>
	</div>

	<p class="title">添加产品</p>

	<form class="form" action="./productController.php?action=add" method="post">
		<div class="form-group">
			<p class="h4">产品分类</p>
			<div class="form-text">
				<label>分类：</label>
				<select class="form-control" name="cid">
					<option value="0">&nbsp;</option>
					<?php
				    	$p = new productController();
						$data = $p->productClass();
				    	if($data){
				    		for($i = 0; $i < count($data); $i++) {
								echo "<option value='".$data[$i]['id']."'>".$data[$i]['name']."</option>";
					    	}
				    	}
				    ?>
				</select>
			</div>
		</div>
		<div class="form-group">
			<p class="h4">产品信息</p>
			<div class="form-text">
				<label>名称：</label>
				<input class="form-control" type="text" name="name" placeholder="名称" required />
				<span>（* 必填）</span>
			</div>
			<div class="form-text">
				<label>副标题：</label>
				<input class="form-control long" type="text" name="subtitle" placeholder="副标题" required />
				<span>（* 必填）</span>
			</div>
			<div class="form-text">
				<label>排序：</label>
				<input class="form-control" type="text" name="inorder" placeholder="排序" required />
				<span>（* 必填）</span>
			</div>
		</div>
		<div class="form-group">
			<p class="h4">产品规格</p>
			<div class="form-text">
				<label>属性名：</label>
				<input class="form-control" type="text" name="type" placeholder="属性名" />
			</div>
			<div class="form-text">
				<label>属性类：</label>
				<input class="form-control" type="text" name="type_id" placeholder="属性类" />
			</div>
		</div>
		<div class="form-group toggle">
			<p class="h4">产品款式</p>
			<div class="form-text">
				<label><input class="form-control" type="checkbox" name="model[]" value="1" /><cite>男款</cite></label>
				<label><input class="form-control" type="checkbox" name="model[]" value="2" /><cite>女款</cite></label>
				<label><input class="form-control" type="checkbox" name="model[]" value="3" /><cite>情侣款</cite></label>
			</div>
		</div>
		<div class="form-group">
			<p class="h4">产品图片</p>
			<div class="form-text">
				<label>主图：</label>
				<input class="form-control long" type="text" name="img_index" placeholder="主图" required />
				<span>（* 必填）</span>
			</div>
			<div class="form-text">
				<label>详情主图：</label>
				<input class="form-control long" type="text" name="img_detail" placeholder="详情主图" required />
				<span>（* 必填）</span>
			</div>
			<div class="form-text">
				<label>品牌故事图：</label>
				<input class="form-control long" type="text" name="img_history" placeholder="品牌故事图" />
			</div>
			<div class="form-text">
				<label>产品参数图：</label>
				<input class="form-control long" type="text" name="img_msg" placeholder="产品参数图" />
			</div>
			<div class="form-text">
				<label>产品形象图：</label>
				<input class="form-control long" type="text" name="img_model" placeholder="产品形象图" />
			</div>
			<div class="form-text">
				<label>产品详细图：</label>
				<input class="form-control long" type="text" name="img_info" placeholder="产品详细图" />
			</div>
			<div class="form-text">
				<label>产品评论图：</label>
				<input class="form-control long" type="text" name="img_comment" placeholder="产品评论图" />
			</div>
		</div>
		<div class="form-group">
			<p class="h4">价格库存</p>
			<div class="form-text">
				<label>产品售价：</label>
				<input class="form-control" type="text" name="sel_price" placeholder="产品售价" required />
				<span>（* 必填）</span>
			</div>
			<div class="form-text">
				<label>产品原价：</label>
				<input class="form-control" type="text" name="ori_price" placeholder="产品原价" required />
				<span>（* 必填）</span>
			</div>
			<div class="form-text">
				<label>真实库存：</label>
				<input class="form-control" type="text" name="real_stock" placeholder="真实库存" required />
				<span>（* 必填）</span>
			</div>
			<div class="form-text">
				<label>库存量：</label>
				<input class="form-control" type="text" name="stock" placeholder="库存量" required />
				<span>（* 必填）</span>
			</div>
			<div class="form-text">
				<label>销售量：</label>
				<input class="form-control" type="text" name="sales" placeholder="销售量" required />
				<span>（* 必填）</span>
			</div>
		</div>
		<div class="form-group toggle">
			<p class="h4">产品上架</p>
			<div class="form-text">
				<label><input class="form-control" type="radio" name="status" value="1" /><cite>上架</cite></label>
				<label><input class="form-control" type="radio" name="status" value="0" checked /><cite>下架</cite></label>
				<span>（* 必填）</span>
			</div>
		</div>
		<div class="form-group text-center">
			<button class="btn btn-con" type="submit">提交</button>
			<button class="btn btn-res" type="reset">重置</button>
			<a class="btn" href="./product.php">退出</a>
		</div>
	</form>

</div>

<?php
	require dirname(__FILE__)."/footer.php";
?>