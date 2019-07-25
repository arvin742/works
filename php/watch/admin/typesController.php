<?php
	header('Access-Control-Allow-Origin: localhost');
	header('Content-Type: application/json');
	header("Content-Type: text/html; charset=UTF-8");

	require dirname(dirname(__FILE__))."/model/data.php";

	$t = new typesController();
	$act = isset($_GET['action']) ? $_GET['action'] : 'main';
	if($act == "change"){
		$t->typesUpdate($_POST);
	}	else if($act == "insert"){
		$t->typesInsert($_POST);
	}	else if($act == "delete"){
		$t->typesDelete($_POST);
	}	else if($act == "allDelete"){
		$t->typesAllDelete($_POST);
	}


	class typesController{

		public function types(){

			$sql = "SELECT * FROM db_types ORDER BY id ASC";
			$d = new dataBase();
			$result = $d->select($sql);

			return $result;
		}

		public function typesUpdate($post = ""){
			if(!$post){
				echo "<script>alert('数据不能为空')</script>";
				return false;
			}

			$data = $post;
			$result = new stdClass();	#定义空的对象

			$sql = "UPDATE db_types SET name='$data[name]' WHERE id='$data[id]'";
			$d = new dataBase();
			$r = $d->update($sql);

			if($r){
				$result->msg = 'success';
			} else {
				$result->msg = 'error';
			}

			$result_json = json_encode($result, JSON_UNESCAPED_UNICODE);

			echo $result_json;
		}

		public function typesInsert($post = ""){
			if(!$post){
				echo "<script>alert('数据不能为空')</script>";
				return false;
			}

			$data = $post;

			$sql = "INSERT INTO db_types (name) VALUES ('$data[c_name]')";
			$d = new dataBase();
			$result = $d->insert($sql);

			if($result){
				echo "<script>alert('新增成功'); window.location.href='./types.php'</script>";
			} else {
				echo "<script>alert('新增失败'); window.history.go(-1);</script>";
			}
		}

		public function typesDelete($post = ""){
			if(!$post){
				echo "<script>alert('数据不能为空')</script>";
				return false;
			}

			$data = $post;
			$result = new stdClass();	#定义空的对象

			$sql = "DELETE FROM db_types WHERE id='$data[id]'";
			$d = new dataBase();
			$r = $d->delete($sql);

			if($r){
				$result->msg = 'success';
			} else {
				$result->msg = 'error';
			}

			$result_json = json_encode($result, JSON_UNESCAPED_UNICODE);

			echo $result_json;
		}

	}
?>