<?php 
	header("Content-Type: text/html; charset=UTF-8");

	require dirname(dirname(__FILE__))."/model/data.php";

	class indexController{
		public $path = "../upload/images/";	#默认的图片文件路径

		public function index(){
			$data = new stdClass();	#定义空的对象
			$d = new dataBase();

			#查找首页banner
			$data_banner = "SELECT * FROM db_index_banner";
			$data->banner = $d->select($data_banner);
			if($data->banner){
				$data->banner[0]['image'] = $this->path.$data->banner[0]['image'];
				$pid = $data->banner[0]['pid'];
				$pro_sql = "SELECT sel_price, ori_price, sales FROM db_products WHERE id=$pid";

				$data->banner[0]['price'] = $d->select($pro_sql);
			}

			#查找首页分类
			$data_cft = "SELECT * FROM db_classification";
			$data->cft = $d->select($data_cft);

			#查找首页产品
			for($i = 0; $i < count($data->cft); $i++) { 
				$cid = $data->cft[$i]['id'];
				$data_pro = "SELECT id, name, img_index, sel_price, ori_price, status FROM db_products WHERE cid='$cid' ORDER BY inorder ASC";
				// $data_pro = "SELECT id, name, img_index, sel_price, ori_price, status FROM db_products WHERE cid='$cid'";
				$data->cft[$i]['pro'] = $d->select($data_pro);
			}

			return $data;
		}

		public function indexVisit(){
			$d = new dataBase();

			$day = strtotime(date('Y-m-d 00:00:00'));
			$now_sql = "SELECT id FROM db_index_visit WHERE date='$day'";
			$now_result = $d->select($now_sql);
			
			$time = array(0, 0, 0);
			$now = time();
			$time_1 = strtotime(date('Y-m-d 08:00:00'));
			$time_2 = strtotime(date('Y-m-d 16:00:00'));

			if($now >= $day && $now < $time_1){
				$time[0] = 1;
			}	else if($now >= $time_1 && $now < $time_2){
				$time[1] = 1;
			}	else{
				$time[2] = 1;
			}

			if($now_result){
				$id = $now_result[0]['id'];
				$sql = "UPDATE db_index_visit SET visit=visit+1, time_morring=time_morring+$time[0], time_noon=time_noon+$time[1], time_night=time_night+$time[2] WHERE id='$id'";
				$result = $d->update($sql);

			}	else{
				$sql = "INSERT INTO db_index_visit (visit, date, time_morring, time_noon, time_night, visit_order) VALUES (1, '$day', '$time[0]', '$time[1]', '$time[2]', '0')";
				$result = $d->insert($sql);
			}

			return $result;
		}

	}
?>