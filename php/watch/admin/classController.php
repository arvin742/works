<?php
	header('Access-Control-Allow-Origin: localhost');
	header('Content-Type: application/json');
	header("Content-Type: text/html; charset=UTF-8");

	require dirname(dirname(__FILE__))."/model/data.php";

	$c = new classController();
	$act = isset($_GET['action']) ? $_GET['action'] : 'main';
	if($act == "change"){
		$c->classUpdate($_POST);
	}	else if($act == "insert"){
		$c->classInsert($_POST);
	}	else if($act == "delete"){
		$c->classDelete($_POST);
	}

	class classController{

		public function classification(){

			$sql = "SELECT * FROM db_classification ORDER BY id ASC";
			$d = new dataBase();
			$result = $d->select($sql);

			return $result;
		}

		public function classUpdate($post = ""){
			if(!$post){
				echo "<script>alert('数据不能为空')</script>";
				return false;
			}

			$data = $post;
			$result = new stdClass();	#定义空的对象

			$sql = "UPDATE db_classification SET name='$data[name]', image='$data[image]' WHERE id='$data[id]'";
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

		public function classInsert($post = ""){
			if(!$post){
				echo "<script>alert('数据不能为空')</script>";
				return false;
			}

			$data = $post;

			$sql = "INSERT INTO db_classification (name, image) VALUES ('$data[c_name]', '$data[c_image]')";
			$d = new dataBase();
			$result = $d->insert($sql);

			if($result){
				echo "<script>alert('新增成功'); window.location.href='./classification.php'</script>";
			} else {
				echo "<script>alert('新增失败'); window.history.go(-1);</script>";
			}
		}

		public function classDelete($post = ""){
			if(!$post){
				echo "<script>alert('数据不能为空')</script>";
				return false;
			}

			$data = $post;
			$result = new stdClass();	#定义空的对象

			$sql = "DELETE FROM db_classification WHERE id='$data[id]'";
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