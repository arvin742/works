<?php 
	header("Content-Type: text/html; charset=UTF-8");

	require dirname(dirname(__FILE__))."/model/data.php";

	class successController{

		public function success($id = ""){
			if(!$id)	return false;

			$d = new dataBase();

			$sql = "SELECT a.oid, a.pid, a.name, a.phone, a.address, a.city, a.number, a.price, b.subtitle FROM db_orders AS a, db_products AS b WHERE oid='$id' AND a.pid = b.id";
			$result = $d->select($sql);

			if($result){
				$result[0]['address'] = str_replace(' ', '', $result[0]['city']).$result[0]['address'];
			}

			return $result;
		}

	}
?>