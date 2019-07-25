<?php
	header("Content-Type: text/html; charset=UTF-8");
	header('Cache-control: private, must-revalidate');
	session_start();
	
	require dirname(dirname(__FILE__))."/model/data.php";
	
	$g = new loginControler();
	$act = isset($_GET['action']) ? $_GET['action'] : 'main';
	if($act == "index"){
		$g->login($_POST);
	}	else{
		header("Location: ../admin/login.php");
	}
	
	class loginControler{

		public function login($post = ""){
			if(!$post){
				echo "<script>alert('数据不能为空')</script>";
				return false;
			}

			if($post["name"] == "" || $post["pwd"] == "" || $post["code"] == ""){
				echo "<script>alert('格式错误');</script>";
				header("Location: login.php");
			}	else{
				if ($post["code"] != $_SESSION['code']) {
					echo "<script>alert('验证码错误'); window.history.go(-1);</script>";
				}	else{
					$this->requestData($post);
				}
			}
		}
		
		private function requestData($post = ""){
			$d = new dataBase();
			$sql = "SELECT * FROM db_admin WHERE admin='$post[name]' AND status=0";
			$result = $d->select($sql);

			if(!$result){
				echo "<script>alert('账号不存在'); window.history.go(-1);</script>";
			}	else{
				if($post['pwd'] != $result[0]['pwd']){
					echo "<script>alert('密码错误'); window.history.go(-1);</script>";
				}	else{
					$_SESSION['user'] = $post['name'];
					echo "<script>alert('登录成功'); window.location.href='../admin/index.php'</script>";
				}
			}
		}
		
	}
?>