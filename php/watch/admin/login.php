<?php 
	header("Content-Type: text/html; charset=UTF-8");
	header('Cache-control: private, must-revalidate');
	session_start();
	unset($_SESSION['user']);

	if(!isset($_SESSION['start']) && empty($_SESSION['start'])) {
		header("Location: ../404.php");
	}
?>

<!DOCTYPE html>
<html>
<head lang="en">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
<meta http-equiv="x-ua-compatible" content="IE=edge,chrome=1">
<meta content="yes" name="apple-mobile-web-app-capable" />
<meta content="black" name="apple-mobile-web-app-status-bar-style" />
<title></title>
<link href="http://cdn.morrich.cn/cdn/bootstrap4/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="../css/admin.css" rel="stylesheet" type="text/css" />
<script src="http://cdn.morrich.cn/cdn/js/jquery-1.11.3.min.js"></script>
<!--[if lt IE 9]>
<script src="//cdn.bootcss.com/html5shiv/r29/html5.min.js"></script>
<script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
</head>

<style>
	body{
		background: #000;
	}
</style>

<body>

<div class="content login">
	
	<canvas class="canvas" id="canvas"></canvas>
	
	<div class="container">
		
		<div class="main">
			<form class="form" action="../admin/loginController.php?action=index" method="post">
				<div class="form-group">
					<input class="form-control" name="name" type="text" placeholder="账号" required autofocus />
				</div>
				<div class="form-group">
					<input class="form-control" name="pwd" type="password" placeholder="密码" required />
				</div>
				<div class="form-group code">
					<input class="form-control" name="code" type="text" placeholder="验证码" required />
					<img  title="点击刷新" src="../model/captcha.php" onclick="this.src='../model/captcha.php?'+Math.random();"></img>
				</div>
				<div class="form-group">
					<button class="btn" type="submit">登录</button>
				</div>
			</form>
		</div>
		
	</div>
</div>

<script src="http://cdn.morrich.cn/cdn/bootstrap4/bootstrap.min.js"></script>
<script src="http://cdn.morrich.cn/cdn/jquery.canvas/jquery-spew.js"></script>
<script src="../js/admin.js"></script>
<script>
	$('.login .main form .code img').attr('src', '../model/captcha.php?'+Math.random());
</script>
</body>

</html>