<?php
	require dirname(__FILE__)."/meta.php";
	require dirname(__FILE__)."/header.php";
	require dirname(__FILE__)."/productController.php";

	$p = new productController();
	$pro_info = $p->productSelect();

	$post['limit'] = 6;
	$post['page'] = 1;
	$post['start'] = 1;

	$result = $p->productRecord($post);
?>

<div class="content nav-body nav-model product-record">
	<div class="nav-crumbs">
		<ol class="breadcrumb">
			<li><a href="./index.php">主页</a></li>
			<li><a href="./product.php">商品管理</a></li>
			<li><a href="./product-record.php">库存记录</a></li>
		</ol>
	</div>

	<ul class="nav-group list-inline">
		<li><a class="btn fiexd-on">添加</a></li>
	</ul>

	<div class="table-responsive">
		<table class="table">
			<thead>
				<tr>
					<td>&nbsp;</td>
					<td>产品</td>
					<td>名称</td>
					<td>数量</td>
					<td>时间</td>
					<td>备注</td>
					<td>操作</td>
				</tr>
			</thead>

			<tbody>
				<?php
					if($result->data){
						$r = $result->data;
						for($i = 0; $i < count($r); $i++) { 
							echo getHtml($r[$i], ($i + 1));
						}
					}
				?>
			</tbody>
		</table>
	</div>

	<nav class="nav-page" data-limit="<?php echo $post['limit'] ? $post['limit'] : 10; ?>">
		<ul class="pagination">
			<?php
				echo $result->page;
			?>
		</ul>
	</nav>

	<div class="nav-fiexd">
		<div class="back">
			
			<div class="htr">
				<p class="h4">添加进货记录</p>
				<a class="btn fiexd-off"><i class="fa fa-close"></i></a>
			</div>
			
			<form class="form">
				<div class="form-group selector">
					<input class="form-control hidden pid" type="text" name="pid" />
					<input class="form-control subtitle" type="text" readonly="readonly" placeholder="选择产品" required />
					<ul class="list-unstyled select">
						<?php
							if($pro_info){
								for($i = 0; $i < count($pro_info); $i++) {
									echo "<li data-pid='".$pro_info[$i]['id']."'><img src='../upload/images/".$pro_info[$i]['img_index']."' /><cite>".$pro_info[$i]['subtitle']."</cite></li>";
								}
							}
						?>
					</ul>
				</div>
				<div class="form-group">
					<input class="form-control" type="text" name="record" placeholder="数量" required />
				</div>
				<div class="form-group">
					<input class="form-control" type="date" name="date" placeholder="日期 Y/m/d" required />
				</div>
				<div class="form-group">
					<textarea class="form-control" rows="4" name="content" placeholder="备注" required></textarea>
				</div>
				<div class="form-group submit">
					<button class="btn btn-sub" type="button">确定</button>
					<button class="btn btn-res" type="reset">重置</button>
				</div>
			</form>
			
		</div>
	</div>

</div>

<?php
	require dirname(__FILE__)."/footer.php";

	function getHtml($data, $num){
return <<<EOF
		<tr>
			<td>{$num}<input class="id hidden" value="{$data['id']}" /></td>
			<td><span class="img"><img src="../upload/images/{$data['img']}" alt="" /></span></td>
			<td><span class="subtitle">{$data['subtitle']}</span></td>
			<td><span class="record">{$data['record']}</span></td>
			<td><span class="date">{$data['date']}</span></td>
			<td><span class="content">{$data['content']}</span></td>
			<td><ul class="list-inline oprate"><li><a class="btn btn-del">删除</a></li></ul></td>
		</tr>
EOF;
	}
?>