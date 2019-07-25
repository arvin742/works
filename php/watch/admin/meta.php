<?php
	header("Content-Type: text/html; charset=UTF-8");
	header('Cache-control: private, must-revalidate');
	date_default_timezone_set('PRC');	//默认时区
	
	session_start();

	if(!isset($_SESSION['start']) && empty($_SESSION['start'])) {
		$start = isset($_GET['start']) ? $_GET['start'] : 0;
		if($start == 1){
			$_SESSION['start'] = $start;

			if(!isset($_SESSION['user']) && empty($_SESSION['user'])) {
				header("Location: ../admin/login.php");
				exit();
			}

		}	else{
			header("Location: ../404.php");
		}
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
<title>index</title>
<link href="http://cdn.morrich.cn/cdn/bootstrap4/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="http://cdn.morrich.cn/cdn/css/animate.min.css" rel="stylesheet" type="text/css" />
<link href="../css/font-awesome.min.css" rel="stylesheet" type="text/css" />
<link href="../css/admin.css?v=1809181766" rel="stylesheet" type="text/css" />
<script src="http://cdn.morrich.cn/cdn/js/jquery-1.11.3.min.js"></script>
<script src="http://cdn.morrich.cn/cdn/js/clipboard.min.js"></script>
<!--[if lt IE 9]>
<script src="//cdn.bootcss.com/html5shiv/r29/html5.min.js"></script>
<script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
</head>
<body>
