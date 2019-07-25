<?php
	header('Access-Control-Allow-Origin: localhost');
	header('Content-Type: application/json');
	header("Content-Type: text/html; charset=UTF-8");

	require dirname(__FILE__)."/commonController.php";

	$o = new orderController();
	$act = isset($_GET['action']) ? $_GET['action'] : 'main';
	switch($act){
		case 'index': $o->order($_POST);break;
		case 'change': $o->orderUpdate($_POST);break;
		case 'confirm': $o->orderConfirm($_POST);break;
		case 'discard': $o->orderDiscard($_POST);break;
		case 'send': $o->orderSend($_POST);break;
		case 'cancel': $o->orderCancel($_POST);break;
		case 'excel': $o->orderExcel($_POST);break;
		case 'message': $o->msgUpdate($_POST);break;
		case 'tidapi': $o->tidApi($_POST);break;
		default: return false;break;
	}

	class orderController{

		#查询订单的信息
		public function order($post){
			if(!$post){
				header("Location: ../404.php");
				return false;
			}

			$d = new dataBase();
			$data = $post;
			$result = new stdClass();	#定义空的对象
			
			//status状态条件
			if($data['status'] == -1){
				$status = "(a.status >= 0)";
			}	else if($data['status'] == 4 || $data['status'] == 5){
				$status = "(a.status = 4 OR a.status = 5)";
			} else{
				$status = "(a.status = ".$data['status'].")";
			}

			//按日期查询的
			if($data['date'] == ""){
				$start = date('2017-01-01 00:00:00');
				$date = "(a.date > unix_timestamp('".$start."'))";
			}	else{
				$start = date($data['date'].' 00:00:00');
				$end = date($data['date'].' 23:59:59');
				$date = "(a.date >= unix_timestamp('".$start."') AND a.date <= unix_timestamp('".$end."'))";
			}

			#总个数
			$countSql = "SELECT a.id AS id FROM db_orders AS a WHERE ".$date." AND ".$status;
			$countResult = $d->select($countSql);
			$result->count = $countResult ? count($countResult) : 0;

			#当前页，限制个数
			$limit = $data['limit'] ? $data['limit'] : 10;
			$person = $data['page'] > 0 ? ($data['page'] - 1) * $limit : 0;

			$sql = "SELECT a.*, b.subtitle AS subtitle, b.img_index AS img FROM db_orders AS a, db_products AS b WHERE a.pid=b.id AND ".$date." AND ".$status." ORDER BY a.oid DESC LIMIT $person, $limit";
			$result->data = $d->select($sql);

			//短信模板
			$msg_sql = "SELECT message FROM db_message_model WHERE id=1";
			$msg_model = $d->select($msg_sql);
			$msg_str = array('{product}', '{types}', '{name}', '{phone}', '{address}');

			if($result->data){
				for($i = 0; $i < count($result->data); $i++) { 
					$result->data[$i]['date'] = date("Y-m-d H:i:s", $result->data[$i]['date']);
		    		$result->data[$i]['address'] = str_replace(' ', '', $result->data[$i]['city']).$result->data[$i]['address'];
		    		$result->data[$i]['content'] = $result->data[$i]['content'] ? $result->data[$i]['content'] : '无';
		    		$result->data[$i]['status'] = 'tb-i'.$result->data[$i]['status'];
		    		$result->data[$i]['tid'] = $result->data[$i]['tid'] ? $result->data[$i]['tid'] : "无";
		    		$result->data[$i]['place'] = "00".$result->data[$i]['place'];

		    		//短信模板参数
		    		$msg_val = array($result->data[$i]['subtitle'], $result->data[$i]['types'], $result->data[$i]['name'], $result->data[$i]['phone'], $result->data[$i]['address']);
		    		$result->data[$i]['msg_model'] = $msg_model ? str_replace($msg_str, $msg_val, $msg_model[0]['message']) : "";
				}

				$result->msg = 'success';
			}

			$page = new commonController();	#分页
			$result->page = $page->pagination($result->count, $data['page'], $limit);

			$result_json = json_encode($result, JSON_UNESCAPED_UNICODE);

			echo $result_json;
		}

		#确认订单
		public function orderConfirm($post = ""){
			if(!$post){
				header("Location: ../404.php");
				return false;
			}

			$data = $post;
			$result = new stdClass();	#定义空的对象
			$d = new dataBase();
			$com = new commonController();

			$data['status'] = 1;
			$data['endtime'] = time();

			// $stock = $com->reduceRecord($data['pid'], 1);	#判断有没有库存
			$stock = true;

			if($stock){
				$sql = "UPDATE db_orders SET status='$data[status]', endtime='$data[endtime]' WHERE oid='$data[oid]'";
				$r = $d->update($sql);
				if($r){
					$result->msg = 'success';
				} else {
					$result->msg = '操作失败！';
					$com->addRecord($data['pid'], 1);
				}

			}	else{
				$result->msg = '库存不足，请尽快进货！';
			}

			$result_json = json_encode($result, JSON_UNESCAPED_UNICODE);

			echo $result_json;
		}

		#放弃订单
		public function orderDiscard($post = ""){
			if(!$post){
				header("Location: ../404.php");
				return false;
			}

			$data = $post;
			$result = new stdClass();	#定义空的对象

			$sql = "SELECT name, phone FROM db_orders WHERE oid='$data[oid]'";
			$d = new dataBase();
			$r_cus = $d->select($sql);

			if(!$r_cus){
				$result->msg = 'error';
			} else {
				$name = $r_cus[0]['name'];
				$phone = $r_cus[0]['phone'];
				$ins_sql = "INSERT INTO db_customer (name, phone) VALUES ('$name', '$phone')";
				$r_ins = $d->insert($ins_sql);

				$del_sql = "DELETE FROM db_orders WHERE oid='$data[oid]'";
				$r_del = $d->insert($del_sql);

				if($r_ins && $r_del){
					$result->msg = 'success';
				}	else{
					$result->msg = 'error';
				}
			}

			$result_json = json_encode($result, JSON_UNESCAPED_UNICODE);

			echo $result_json;
		}

		#填写快递单号
		public function orderSend($post = ""){
			if(!$post){
				header("Location: ../404.php");
				return false;
			}

			$data = $post;
			$data['status'] = 2;
			$d = new dataBase();

			if($data['tid'] == " " || $data['tid'] == ""){
				echo "<script>alert('订单号不能为空！'); window.history.go(-1);</script>";
				return false;
			}

			$sql = "UPDATE db_orders SET tid='$data[tid]', status='$data[status]' WHERE oid='$data[oid]'";
			$result = $d->update($sql);

			if($result){
				echo "<script>alert('发货成功'); window.location.href='./order.php?id=1'</script>";
			}	else{
				echo "<script>alert('发货失败'); window.history.go(-1);</script>";
			}
			
		}

		#取消订单返回确认
		public function orderCancel($post = ""){
			if(!$post){
				header("Location: ../404.php");
				return false;
			}

			$data = $post;
			$result = new stdClass();	#定义空的对象
			$d = new dataBase();
			$com = new commonController();

			$data['status'] = 0;
			$data['endtime'] = time();

			$stock = $com->addRecord($data['pid'], 1);

			if($stock){
				$sql = "UPDATE db_orders SET status='$data[status]', endtime='$data[endtime]' WHERE oid='$data[oid]'";
				$r = $d->update($sql);
				if($r){
					$result->msg = 'success';
				} else {
					$result->msg = '操作失败！';
					$com->reduceRecord($data['pid'], 1);
				}

			}	else{
				$result->msg = '操作失败！';
			}

			$result_json = json_encode($result, JSON_UNESCAPED_UNICODE);

			echo $result_json;
		}

		#订单状态更新
		public function orderUpdate($post = ""){
			if(!$post){
				header("Location: ../404.php");
				return false;
			}

			$data = $post;
			$result = new stdClass();	#定义空的对象
			$d = new dataBase();
			$com = new commonController();

			$data['endtime'] = time();

			if($data['status'] == 4){
				$stock = $com->addRecord($data['pid'], 1);
			}

			$sql = "UPDATE db_orders SET status='$data[status]', endtime='$data[endtime]' WHERE oid='$data[oid]'";
			$r = $d->update($sql);

			if($r){
				$result->msg = 'success';
			} else {
				$result->msg = '操作失败！';
			}

			$result_json = json_encode($result, JSON_UNESCAPED_UNICODE);

			echo $result_json;
		}

		#导出订单的信息
		public function orderExcel($post){
			if(!$post){
				header("Location: ../404.php");
				return false;
			}

			$d = new dataBase();
			$data = $post;
			
			//status状态条件
			if($data['status'] == -1){
				$status = "(a.status >= 0)";
			}	else if($data['status'] == 4 || $data['status'] == 5){
				$status = "(a.status = 4 OR a.status = 5)";
			} else{
				$status = "(a.status = ".$data['status'].")";
			}

			//按日期查询的
			if($data['date'] == ""){
				$start = date('2017-01-01 00:00:00');
				$date = "(a.date > unix_timestamp('".$start."'))";
			}	else{
				$start = date($data['date'].' 00:00:00');
				$end = date($data['date'].' 23:59:59');
				$date = "(a.date >= unix_timestamp('".$start."') AND a.date <= unix_timestamp('".$end."'))";
			}

			#当前页，限制个数
			$limit = $data['limit'] ? $data['limit'] : 10;
			$person = $data['page'] > 0 ? ($data['page'] - 1) * $limit : 0;

			$sql = "SELECT a.pid, a.types, a.name, a.phone, a.city, a.address, a.number, a.price, a.date, a.content, a.place, b.subtitle AS subtitle FROM db_orders AS a, db_products AS b WHERE a.pid=b.id AND ".$date." AND ".$status." ORDER BY a.oid DESC LIMIT $person, $limit";
			$result = $d->select($sql);

			if($result){
				for($i = 0; $i < count($result); $i++) { 
					$result[$i]['date'] = date("Y-m-d H:i:s", $result[$i]['date']);
		    		$result[$i]['address'] = str_replace(' ', '', $result[$i]['city']).$result[$i]['address'];
				}

				//接下来就是写数据到表格里面去
				$filename = "订单信息";
				$header_arr = array('产品ID', '名称', '款式', '姓名', '手机', '地址', '数量', '价格', '日期', '渠道', '备注');
				$indexKey = array('pid', 'subtitle', 'types', 'name', 'phone', 'address', 'number', 'price', 'date', 'place', 'content');

				$excel = new commonController();
				$excel->exportExcel($result, $filename, $header_arr, $indexKey);
			}

		}

		#信息模板更新
		public function msgUpdate($post = ""){
			if(!$post){
				header("Location: ../404.php");
				return false;
			}

			$data = $post;
			$result = new stdClass();	#定义空的对象

			$sql = "UPDATE db_message_model SET message='$data[message]' WHERE id=1";
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

		#信息模板查询
		public function msgModel(){
			$d = new dataBase();

			$sql = "SELECT message FROM db_message_model WHERE id=1";
			$result = $d->select($sql);

			return $result;
		}

		#快递单号api接口
		public function tidApi($post = ""){
			if(!$post){
				header("Location: ../404.php");
				return false;
			}
			/**
	        全球物流快递查询（单号识别）
	        商品购买地址： https://market.aliyun.com/products/56928004/cmapi026963.html
	        String host = "http://goexpress.market.alicloudapi.com"; //服务器
	        String path = "/goexpress"; //接口地址
	         */
	        // $data = $_POST;
	        // $result_json = json_encode($data, JSON_UNESCAPED_UNICODE);
	        // echo $result_json;
	        // return false;

	        $host = "http://goexpress.market.alicloudapi.com";//api访问链接
	        $path = "/goexpress";//API访问后缀
	        $method = "GET";
	        $appcode = "54e149a2e9be40d3961c69bd8037cc70";//替换成自己的阿里云appcode
	        $headers = array();
	        array_push($headers, "Authorization:APPCODE " . $appcode);
	        $querys = "no=".$_POST['tid']."&type=sf";  //参数写在这里
	        $bodys = "";
	        $url = $host . $path . "?" . $querys;//url拼接

	        $curl = curl_init();
	        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
	        curl_setopt($curl, CURLOPT_URL, $url);
	        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
	        curl_setopt($curl, CURLOPT_FAILONERROR, false);
	        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	        curl_setopt($curl, CURLOPT_HEADER, false);
	        if (1 == strpos("$".$host, "https://"))
	        {
	            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
	        }

	        $result = curl_exec($curl);
	        $result_json = json_encode($result, JSON_UNESCAPED_UNICODE);

	        echo $result_json;
		}
	}
?>