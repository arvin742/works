<?php
	header("Content-Type: text/html; charset=UTF-8");
?>

<header class="header clearfix">
	<ul class="float-left list-inline">
		<li class="nav-item nav-menu">
			<a href="javascript: void(0);"><i class="fa fa-outdent"></i></a>
		</li>
		<li class="nav-item">
			<a href="../web" target="_blank"><i class="fa fa-globe"></i></a>
		</li>
		<li class="nav-item">
			<a href="javascript:void(0)" onclick="location.reload()"><i class="fa fa-refresh"></i></a>
		</li>
	</ul>
	<ul class="float-right list-inline">
		<li class="nav-item">
			<a href=""><i class="fa fa-bell"></i></a>
		</li>
		<li class="nav-item nav-itemd">
			<a href="javascript: void(0);">
				<i class="fa fa-user-circle-o"></i>
				<cite>Admin</cite>
				<span class="nav-more"></span>
			</a>
			<dl class="nav-child">
				<dd><a href="">个人中心</a></dd>
				<dd><a href="">修改密码</a></dd>
				<dd><a href="./login.php">退出</a></dd>
			</dl>
		</li>
		<li class="nav-item">
			<a href="javascript: void(0);"><i class="fa fa-ellipsis-v"></i></a>
		</li>
	</ul>
</header>

<div class="menu-side">
	<div class="menu-scroll">
		<div class="logo">
			<span>Admin</span>
		</div>
		<ul class="menu list-unstyled">
			<li class="nav-item">
				<a href="./index.php">
					<i class="fa fa-home"></i>
					<cite>主页</cite>
				</a>
			</li>
			<li class="nav-item nav-itemd">
				<a href="javascript: void(0);">
					<i class="fa fa-inbox"></i>
					<cite>商品管理</cite>
					<span class="nav-more"></span>
				</a>
				<dl class="nav-child">
					<dd><a href="./types.php">模型管理</a></dd>
					<dd><a href="./classification.php">分类管理</a></dd>
					<dd><a href="./product-record.php">库存记录</a></dd>
					<dd><a href="./product.php">产品管理</a></dd>
				</dl>
			</li>
			<li class="nav-item active">
				<a href="./order.php?id=0">
					<i class="fa fa-calendar-minus-o"></i>
					<cite>订单管理</cite>
				</a>
			</li>
			<span class="nav-bar">&nbsp;</span>
		</ul>
	</div>
</div>