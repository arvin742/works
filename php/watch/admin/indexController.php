<?php
	header("Content-Type: text/html; charset=UTF-8");

	// require dirname(dirname(__FILE__))."/model/data.php";	#在commonController引用了
	require dirname(__FILE__)."/commonController.php";

	$h = new indexController();
	$act = isset($_GET['action']) ? $_GET['action'] : '';
	switch($act){
		case 'visit': $h->orderVisitPage($_POST);break;
		default: return false;break;
	}

	class indexController{

		public function index(){
			$d = new dataBase();

			$day = strtotime(date('Y-m-d 00:00:00'));

			$sql = "SELECT * FROM db_index_visit WHERE date='$day'";
			$result = $d->select($sql);

			if(!$result){
				$result[0]['visit'] = 0;
				$result[0]['time_morring'] = 0;
				$result[0]['time_noon'] = 0;
				$result[0]['time_night'] = 0;
				$result[0]['visit_order'] = 0;
			}

			$start = date('Y-m-d 00:00:00');
			$end = date('Y-m-d 23:59:59');

			$s2 = "SELECT id FROM db_orders_use WHERE date >= unix_timestamp('$start') AND date <= unix_timestamp('$end') AND place=1";
			$r2 = $d->select($s2);
			$result[0]['place2'] = $r2 ? count($r2) : 0;

			$s4 = "SELECT id FROM db_orders_use WHERE date >= unix_timestamp('$start') AND date <= unix_timestamp('$end') AND place=4";
			$r4 = $d->select($s4);
			$result[0]['place4'] = $r4 ? count($r4) : 0;

			$result_json = json_encode($result, JSON_UNESCAPED_UNICODE);

			return $result;
		}

		public function orderVisitPage($post){
			if(!$post){
				header("Location: ../404.php");
				return false;
			}

			$d = new dataBase();
			$data = $post;
			$result = new stdClass();	#定义空的对象

			$start = date('Y-m-d 00:00:00');
			$end = date('Y-m-d 23:59:59');

			$countSql = "SELECT id FROM db_orders_use WHERE date >= unix_timestamp('$start') AND date <= unix_timestamp('$end')";
			$countResult = $d->select($countSql);		#总个数
			$result->count = $countResult ? count($countResult) : 0;

			$limit = $data['limit'] ? $data['limit'] : 10;
			$person = $data['page'] > 0 ? ($data['page'] - 1) * $limit : 0;

			$sql = "SELECT a.*, b.subtitle AS subtitle FROM db_orders_use AS a, db_products AS b WHERE a.pid=b.id AND a.date >= unix_timestamp('$start') AND a.date <= unix_timestamp('$end') ORDER BY a.date DESC LIMIT $person, $limit";
			// $sql = "SELECT a.*, b.subtitle AS subtitle FROM db_orders_use AS a, db_products AS b WHERE a.pid=b.id ORDER BY a.date DESC LIMIT $person, $limit";
			$result->data = $d->select($sql);

			if($result->data) {
				$result->msg = 'success';

				for($i = 0; $i < count($result->data); $i++) {
					$result->data[$i]['date'] = date("Y-m-d H:i:s", $result->data[$i]['date']);
					$result->data[$i]['place'] = "00".$result->data[$i]['place'];
				}
			}	else{
				$result->msg = 'error';
			}

			$page = new commonController();	#分页
			$result->page = $page->pagination($result->count, $data['page'], $limit);

			$result_json = json_encode($result, JSON_UNESCAPED_UNICODE);

			echo $result_json;
		}

	}
?>