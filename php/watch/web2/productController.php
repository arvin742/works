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

	}
?>