<?php
	header('Access-Control-Allow-Origin: localhost');
	header('Content-Type: application/json');
	header("Content-Type: text/html; charset=UTF-8");

	require dirname(dirname(__FILE__))."/model/data.php";

	$o = new orderController();
	$act = isset($_GET['action']) ? $_GET['action'] : '';
	switch($act){
		case 'index': $o->order($_POST);break;
		case 'orderUser': $o->orderUser($_POST);break;
		case 'orderEnd': $o->orderEnd($_POST);break;
		case 'orderClick': $o->orderClick($_POST);break;
		default: return false;break;
	}

	class orderController{

		public function product($pid = ""){
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

		public function order($post = ""){
			if(!$post){
				echo "error";
				exit();
			}

			$d = new dataBase();
			$result = new stdClass();	#定义空的对象

			$data = $post;
			$data['date'] = time();
			$data['endtime'] = time();
			$data['oid'] = $data['date'].$this->GetRandStr(3);
			$data['status'] = '0';

			$pro_sql = "SELECT name FROM db_products WHERE id='$data[pid]'";
			$pro = $d->select($pro_sql);
			$pro_name = $pro ? $pro[0]['name'] : '';

			$sql = "INSERT INTO db_orders (oid, pid, name, phone, city, address, number, price, content, types, date, endtime, status, place, ip, tool) VALUES ('$data[oid]', '$data[pid]', '$data[name]', '$data[phone]', '$data[city]', '$data[address]', '$data[number]', '$data[price]', '$data[content]', '$data[types]', '$data[date]', '$data[endtime]', '$data[status]', '$data[place]', '$data[ip]', '$data[tool]')";
			
			$r = $d->insert($sql);

			if($r){
				$pid = $data['pid'];
				$sal_sql = "UPDATE db_products SET sales=sales+1 WHERE id='$pid'";
				$sal = $d->update($sal_sql);

				$result->msg = 'success';
				$result->oid = $data['oid'];
			} else {
				$result->msg = 'error';
			}
			
			$result_json = json_encode($result, JSON_UNESCAPED_UNICODE);

			echo $result_json;
		}

		public function orderVisit(){
			$d = new dataBase();

			$day = strtotime(date('Y-m-d 00:00:00'));
			$now_sql = "SELECT id FROM db_index_visit WHERE date='$day'";
			$now_result = $d->select($now_sql);

			if($now_result){
				$id = $now_result[0]['id'];
				$sql = "UPDATE db_index_visit SET visit_order=visit_order+1 WHERE id='$id'";
				$result = $d->update($sql);

				return $result;
			}
		}

		public function orderUser($post = ""){
			if(!$post){
				echo "<script>alert('数据不能为空')</script>";
				return false;
			}

			$d = new dataBase();
			$data = $post;
			$day = time();

			$sql = "INSERT INTO db_orders_use (pid, date, click_model, click_num, click_name, click_phone, click_city, click_address, click_content, click_btn, user, scroll, status, place) VALUES ('$data[pid]', '$day', '0', '0', '0', '0', '0', '0', '0', '0', '$data[ip]', '0%', '1', '$data[place]')";
			$result = $d->insert($sql);

			$result_json = json_encode($result, JSON_UNESCAPED_UNICODE);
			echo $result_json;
		}

		public function orderEnd($post = ""){
			if(!$post){
				echo "<script>alert('数据不能为空')</script>";
				return false;
			}

			$d = new dataBase();
			$data = $post;

			$sql = "UPDATE db_orders_use SET scroll='$data[scroll]', status='$data[status]' WHERE user='$data[ip]' AND status=1";
			$result = $d->update($sql);

			$result_json = json_encode($result, JSON_UNESCAPED_UNICODE);
			echo $result_json;
		}

		public function orderClick($post = ""){
			$d = new dataBase();

			$click = array(0, 0, 0, 0, 0, 0, 0, 0);
			$click[$_POST['num']] = 1;
			$sql = "UPDATE db_orders_use SET click_model=click_model+$click[0], click_num=click_num+$click[1], click_name=click_name+$click[2], click_phone=click_phone+$click[3], click_city=click_city+$click[4], click_address=click_address+$click[5], click_content=click_content+$click[6], click_btn=click_btn+$click[7] WHERE user='$post[ip]' AND status=1 AND pid='$post[pid]'";
			
			$result = $d->update($sql);

			echo $result;
		}
		
		public function GetRandStr($len = 3){
			$chars = array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');

			$keys = array_rand($chars, $len);

			$result = '';
			for($i = 0; $i < $len; $i++){ 
				$result .= $chars[$keys[$i]];
			}

			return $result;
		}

		public function GetRandWord($len = 3){
			$chars = array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'm', 'n', 'p', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y');

			$keys = array_rand($chars, $len);

			$result = '';
			for($i = 0; $i < $len; $i++){ 
				$result .= $chars[$keys[$i]];
			}

			return $result;
		}
	}
?>