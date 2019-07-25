<?php
	session_start();
	if(!isset($_SESSION['place']) || empty($_SESSION['place'])) {
	 	$_SESSION['place'] = 0;
	}

	$ip = get_ip();

	function get_ip(){
		static $realip = NULL;
		if($realip !== NULL){
		    return $realip;
		}

		if (getenv("HTTP_CLIENT_IP") && strcasecmp(getenv("HTTP_CLIENT_IP"), "unknown")) 
			$realip = getenv("HTTP_CLIENT_IP"); 
		else if (getenv("HTTP_X_FORWARDED_FOR") && strcasecmp(getenv("HTTP_X_FORWARDED_FOR"), "unknown")) 
			$realip = getenv("HTTP_X_FORWARDED_FOR"); 
		else if (getenv("REMOTE_ADDR") && strcasecmp(getenv("REMOTE_ADDR"), "unknown")) 
			$realip = getenv("REMOTE_ADDR"); 
		else if (isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], "unknown")) 
			$realip = $_SERVER['REMOTE_ADDR']; 
		else 
			$realip = "unknown"; 
		return($realip);
	}
?>

<!DOCTYPE html>
<html>
<head lang="en">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
<meta http-equiv="x-ua-compatible" content="IE=edge,chrome=1">
<meta name="screen-orientation" content="portrait">
<meta name="x5-orientation" content="portrait">
<title>京东全球购特卖专区</title>
<link href="http://cdn.morrich.cn/cdn/bootstrap4/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="http://cdn.morrich.cn/cdn/css/animate.min.css" rel="stylesheet" type="text/css" />
<link href="../css/font-awesome.min.css" rel="stylesheet" type="text/css" />
<link href="../css/main2.css?v=1809180940" rel="stylesheet" type="text/css" />
<script src="http://cdn.morrich.cn/cdn/js/jquery-1.11.3.min.js"></script>
<script src="https://pv.sohu.com/cityjson?ie=utf-8" ></script> 
<!--[if lt IE 9]>
<script src="//cdn.bootcss.com/html5shiv/r29/html5.min.js"></script>
<script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
</head>

<body>