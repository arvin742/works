<?php
	require dirname(__FILE__)."/meta.php";
	require dirname(__FILE__)."/header.php";
	require dirname(__FILE__)."/productController.php";

	$id = isset($_GET['id']) ? $_GET['id'] : '';
	if($id){
		$p = new productController();
		$data = $p->productEdit($id);
	}	else{
		header("Location: ./product.php");
	}
?>

<div class="content nav-body product-edit">
	<div class="nav-crumbs">
		<ol class="breadcrumb">
			<li><a href="./index.php">主页</a></li>
			<li><a href="./product.php">商品管理</a></li>
			<li><a href="./product.php">产品管理</a></li>
		</ol>
	</div>

	<p class="title">修改产品</p>

	<form class="form" action="./productController.php?action=edit" method="post">
		<div class="form-group">
			<p class="h4">产品分类</p>
			<div class="form-text">
				<label>分类：</label>
				<select class="form-control" name="cid">
					<option value="0">&nbsp;</option>
					<?php
						$class = $p->productClass();
				    	if($class){
				    		for($i = 0; $i < count($class); $i++) {
				    			if($class[$i]['id'] == $data[0]['cid']){
				    				$select = "selected";
				    			}	else{
				    				$select = "";
				    			}
								echo "<option value='".$class[$i]['id']."' ".$select.">".$class[$i]['name']."</option>";
					    	}
				    	}
				    ?>
				</select>
			</div>
		</div>
		<div class="form-group">
			<p class="h4">产品信息</p>
			<div class="form-text hidden">
				<label>ID：</label>
				<input class="form-control" type="text" name="id" placeholder="ID" value="<?php echo $data[0]['id']; ?>" required />
				<span>（* 必填）</span>
			</div>
			<div class="form-text">
				<label>名称：</label>
				<input class="form-control" type="text" name="name" placeholder="名称" value="<?php echo $data[0]['name']; ?>" required />
				<span>（* 必填）</span>
			</div>
			<div class="form-text">
				<label>副标题：</label>
				<input class="form-control long" type="text" name="subtitle" placeholder="副标题" value="<?php echo $data[0]['subtitle']; ?>" required />
				<span>（* 必填）</span>
			</div>
			<div class="form-text">
				<label>排序：</label>
				<input class="form-control" type="text" name="inorder" placeholder="排序" value="<?php echo $data[0]['inorder']; ?>" required />
				<span>（* 必填）</span>
			</div>
		</div>
		<div class="form-group">
			<p class="h4">产品规格</p>
			<div class="form-text">
				<label>属性名：</label>
				<input class="form-control" type="text" name="type" placeholder="属性名" value="<?php echo $data[0]['type']; ?>" />
			</div>
			<div class="form-text">
				<label>属性类：</label>
				<input class="form-control" type="text" name="type_id" placeholder="属性类" value="<?php echo $data[0]['type_id']; ?>" />
			</div>
		</div>
		<div class="form-group toggle">
			<p class="h4">产品款式</p>
			<div class="form-text">
				<?php 
					$model = array('', '', '');
					if($data[0]['model']){
						for ($i = 0; $i < count($data[0]['model']); $i++) {
							$model[$data[0]['model'][$i] - 1] = "checked";
						}
					}
				?>
				<label><input class="form-control" type="checkbox" name="model[]" <?php echo $model[0]; ?> value="1" /><cite>男款</cite></label>
				<label><input class="form-control" type="checkbox" name="model[]" <?php echo $model[1]; ?> value="2" /><cite>女款</cite></label>
				<label><input class="form-control" type="checkbox" name="model[]" <?php echo $model[2]; ?> value="3" /><cite>情侣款</cite></label>
			</div>
		</div>
		<div class="form-group">
			<p class="h4">产品图片</p>
			<div class="form-text">
				<label>主图：</label>
				<input class="form-control long" type="text" name="img_index" placeholder="主图" value="<?php echo $data[0]['img_index']; ?>" required />
				<span>（* 必填）</span>
			</div>
			<div class="form-text">
				<label>详情主图：</label>
				<input class="form-control long" type="text" name="img_detail" placeholder="详情主图" value="<?php echo $data[0]['img_detail']; ?>" required />
				<span>（* 必填）</span>
			</div>
			<div class="form-text">
				<label>品牌故事图：</label>
				<input class="form-control long" type="text" name="img_history" placeholder="品牌故事图" value="<?php echo $data[0]['img_history']; ?>" />
			</div>
			<div class="form-text">
				<label>产品参数图：</label>
				<input class="form-control long" type="text" name="img_msg" placeholder="产品参数图" value="<?php echo $data[0]['img_msg']; ?>" />
			</div>
			<div class="form-text">
				<label>产品形象图：</label>
				<input class="form-control long" type="text" name="img_model" placeholder="产品形象图" value="<?php echo $data[0]['img_model']; ?>" />
			</div>
			<div class="form-text">
				<label>产品详细图：</label>
				<input class="form-control long" type="text" name="img_info" placeholder="产品详细图" value="<?php echo $data[0]['img_info']; ?>" />
			</div>
			<div class="form-text">
				<label>产品评论图：</label>
				<input class="form-control long" type="text" name="img_comment" placeholder="产品评论图" value="<?php echo $data[0]['img_comment']; ?>" />
			</div>
		</div>
		<div class="form-group">
			<p class="h4">价格库存</p>
			<div class="form-text">
				<label>产品售价：</label>
				<input class="form-control" type="text" name="sel_price" placeholder="产品售价" value="<?php echo $data[0]['sel_price']; ?>" required />
				<span>（* 必填）</span>
			</div>
			<div class="form-text">
				<label>产品原价：</label>
				<input class="form-control" type="text" name="ori_price" placeholder="产品原价" value="<?php echo $data[0]['ori_price']; ?>" required />
				<span>（* 必填）</span>
			</div>
			<div class="form-text">
				<label>真实库存：</label>
				<input class="form-control" type="text" name="real_stock" placeholder="真实库存" value="<?php echo $data[0]['real_stock']; ?>" required />
				<span>（* 必填）</span>
			</div>
			<div class="form-text">
				<label>库存量：</label>
				<input class="form-control" type="text" name="stock" placeholder="库存量" value="<?php echo $data[0]['stock']; ?>" required />
				<span>（* 必填）</span>
			</div>
			<div class="form-text">
				<label>销售量：</label>
				<input class="form-control" type="text" name="sales" placeholder="销售量" value="<?php echo $data[0]['sales']; ?>" required />
				<span>（* 必填）</span>
			</div>
		</div>
		<div class="form-group toggle">
			<p class="h4">产品上架</p>
			<div class="form-text">
				<?php 
					$status = array('', '');
					$status[$data[0]['status']] = "checked";
				?>
				<label><input class="form-control" type="radio" name="status" value="1" <?php echo $status[1]; ?> /><cite>上架</cite></label>
				<label><input class="form-control" type="radio" name="status" value="0" <?php echo $status[0]; ?> /><cite>下架</cite></label>
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