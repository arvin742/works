<?php 
	header("Content-Type: text/html; charset=UTF-8");

	require dirname(dirname(__FILE__))."/model/data.php";

	class productController{
		public $path = "../upload/images/";	#默认的图片文件路径

		public function product($id = ""){
			if(!$id)	return false;

			$d = new dataBase();

			$sql = "SELECT * FROM db_products WHERE id='$id'";
			$result = $d->select($sql);

			$result[0]['img_info'] = $result[0]['img_info'] ? explode("、", $result[0]['img_info']) : "";
			$result[0]['img_comment'] = $result[0]['img_comment'] ? explode("、", $result[0]['img_comment']) : "";

			return $result;
		}

		public function productVisit($id = ""){
			if(!$id)	return false;

			$d = new dataBase();

			$sql = "UPDATE db_products SET access=access+1 WHERE id='$id'";
			$result = $d->update($sql);

			return $result;
		}

		public function productOrder($pid = ""){
			if(!$pid)	return false;

			$d = new dataBase();

			$sql = "SELECT id, subtitle, cid, type, type_id, model, img_index, sel_price FROM db_products WHERE id='$pid'";
			$result = $d->select($sql);

			if($result[0]['type_id']){
				$type_id = $result[0]['type_id'];
				$type_sql = "SELECT id, type FROM db_products WHERE type_id='$type_id'";
				$result[0]['types'] = $d->select($type_sql);
			}

			$result[0]['model'] = $result[0]['model'] ? explode("、", $result[0]['model']) : "";

			return $result;
		}

	}
?>