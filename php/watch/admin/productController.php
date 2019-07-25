<?php 

	header('Access-Control-Allow-Origin: localhost');
	header('Content-Type: application/json');
	header("Content-Type: text/html; charset=UTF-8");

	require dirname(__FILE__)."/commonController.php";

	$p = new productController();
	$act = isset($_GET['action']) ? $_GET['action'] : 'main';
	switch($act){
		case 'index': $p->product();break;
		case 'add': $p->productAdd($_POST);break;
		case 'change': $p->productStatus($_POST);break;
		case 'delete': $p->productDelete($_POST);break;
		case 'edit': $p->productUpdate($_POST);break;
		case 'comEdition': $p->productComEdition($_POST);break;
		case 'comEdit': $p->productComEdit($_POST);break;
		case 'comAdd': $p->productComAdd($_POST);break;
		case 'comDel': $p->productComDel($_POST);break;
		case 'record': $p->productRecord($_POST);break;
		case 'recordAdd': $p->productRecordAdd($_POST);break;
		case 'recordDel': $p->productRecordDel($_POST);break;
		default: return false;break;
	}

	class productController{

		public function product(){
			$sql = "SELECT id, subtitle, img_index, sel_price, sales, access, real_stock, date, status FROM db_products";
			$d = new dataBase();
			$result = $d->select($sql);

			if($result){
				for($i = 0; $i < count($result); $i++) {
					$result[$i]['time'] = date("H:i:s", $result[$i]['date']);
					$result[$i]['date'] = date("Y-m-d", $result[$i]['date']);
					$result[$i]['sel_price'] = $result[$i]['sel_price'].".00";
		    		$result[$i]['status'] = $result[$i]['status'] > 0 ? 'active' : '';
				}

				$result_json = json_encode($result, JSON_UNESCAPED_UNICODE);
			}

			return $result;
		}

		public function productSelect(){
			$sql = "SELECT id, subtitle, img_index FROM db_products";
			$d = new dataBase();
			$result = $d->select($sql);

			return $result;
		}

		public function productAdd($post = ""){
			if(!$post){
				header("Location: ../404.php");
				return false;
			}

			$data = $post;
			$data['model'] = isset($data['model']) ? $data['model'] : "";
			if($data['model']){
				$data['model'] = implode('、', $data['model']);
			}
			$data['access'] = 0;
			$data['date'] = time();

			$sql = "INSERT INTO db_products (name, subtitle, cid, type, type_id, model, img_index, img_detail, img_history, img_model, img_msg, img_info, img_comment, sel_price, ori_price, stock, sales, access, date, status, inorder, real_stock) VALUES ('$data[name]', '$data[subtitle]', '$data[cid]', '$data[type]', '$data[type_id]', '$data[model]', '$data[img_index]', '$data[img_detail]', '$data[img_history]', '$data[img_model]', '$data[img_msg]', '$data[img_info]', '$data[img_comment]', '$data[sel_price]', '$data[ori_price]', '$data[stock]', '$data[sales]', '$data[access]', '$data[date]', '$data[status]', '$data[inorder]', '$data[real_stock]')";

			$d = new dataBase();
			$result = $d->insert($sql);

			if($result){
				echo "<script>alert('添加成功'); window.location.href='./product.php'</script>";
			} else {
				echo "<script>alert('添加失败'); window.history.go(-1);</script>";
			}

		}

		public function productStatus($post = ""){
			if(!$post){
				header("Location: ../404.php");
				return false;
			}

			$data = $post;
			$result = new stdClass();	#定义空的对象

			$sql = "UPDATE db_products SET status='$data[status]' WHERE id='$data[id]'";
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

		public function productDelete($post = ""){
			if(!$post){
				header("Location: ../404.php");
				return false;
			}

			$data = $post;
			$result = new stdClass();	#定义空的对象

			$sql = "DELETE FROM db_products WHERE id='$data[id]'";
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

		public function productEdit($id = ""){
			$sql = "SELECT * FROM db_products WHERE id=$id";
			$d = new dataBase();
			$result = $d->select($sql);

			$result[0]['model'] = $result[0]['model'] ? explode("、", $result[0]['model']) : "";

			if($result){
				$result_json = json_encode($result, JSON_UNESCAPED_UNICODE);
			}

			return $result;
		}

		public function productUpdate($post = ""){
			if(!$post){
				header("Location: ../404.php");
				return false;
			}

			$data = $post;
			$data['model'] = isset($data['model']) ? $data['model'] : "";
			if($data['model']){
				$data['model'] = implode('、', $data['model']);
			}

			// var_dump($data['model']);
			// return false;

			$sql = "UPDATE db_products SET name='$data[name]', subtitle='$data[subtitle]', cid='$data[cid]', type='$data[type]', type_id='$data[type_id]', model='$data[model]', img_index='$data[img_index]', img_detail='$data[img_detail]', img_history='$data[img_history]', img_model='$data[img_model]', img_msg='$data[img_msg]', img_info='$data[img_info]', img_comment='$data[img_comment]', sel_price='$data[sel_price]', ori_price='$data[ori_price]', stock='$data[stock]', sales='$data[sales]', status='$data[status]', inorder='$data[inorder]', real_stock='$data[real_stock]' WHERE id='$data[id]'";

			$d = new dataBase();
			$result = $d->update($sql);

			if($result){
				echo "<script>alert('修改成功'); window.location.href='./product.php'</script>";
			} else {
				echo "<script>alert('修改失败'); window.history.go(-1);</script>";
			}
		}

		public function productClass(){
			$sql = "SELECT * FROM db_classification";
			$d = new dataBase();
			$result = $d->select($sql);

			return $result;
		}

		public function productCom($pid = ""){
			$sql = "SELECT * FROM db_products_comment WHERE pid=$pid";
			$d = new dataBase();
			$result = $d->select($sql);

			if($result){
				for($i = 0; $i < count($result); $i++) {
					$result[$i]['date'] = date("Y-m-d", $result[$i]['date']);
				}

				$result_json = json_encode($result, JSON_UNESCAPED_UNICODE);
			}

			return $result;
		}

		public function productComAdd($post = ""){
			if(!$post){
				header("Location: ../404.php");
				return false;
			}

			$data = $post;
			$data['date'] = strtotime($data['date']);

			$sql = "INSERT INTO db_products_comment (pid, name, score, image, content, support, date) VALUES ('$data[pid]', '$data[name]', '$data[score]', '$data[image]', '$data[content]', '$data[support]', '$data[date]')";

			$d = new dataBase();
			$result = $d->insert($sql);

			if($result){
				echo "<script>alert('添加成功'); window.location.href='./product-com.php?id=".$data['pid']."'</script>";
			} else {
				echo "<script>alert('添加失败'); window.history.go(-1);</script>";
			}

		}

		public function productComEdition($post = ""){
			$id = $post['id'];

			$sql = "SELECT * FROM db_products_comment WHERE id=$id";
			$d = new dataBase();
			$result = $d->select($sql);

			if($result){
				$result[0]['date'] = date("Y-m-d", $result[0]['date']);
				$result_json = json_encode($result, JSON_UNESCAPED_UNICODE);

				echo $result_json;
			}	else{
				echo false;
			}
			
		}

		public function productComEdit($post = ""){
			if(!$post){
				header("Location: ../404.php");
				return false;
			}

			$data = $post;
			$data['date'] = strtotime($data['date']);

			$sql = "UPDATE db_products_comment SET name='$data[name]', score='$data[score]', image='$data[image]', content='$data[content]', support='$data[support]', date='$data[date]' WHERE id='$data[id]'";

			$d = new dataBase();
			$result = $d->update($sql);

			if($result){
				echo "<script>alert('修改成功'); window.location.href='./product-com.php?id=".$data['pid']."'</script>";
			} else {
				echo "<script>alert('修改失败'); window.history.go(-1);</script>";
			}
		}

		public function productComDel($post = ""){
			if(!$post){
				header("Location: ../404.php");
				return false;
			}

			$data = $post;
			$result = new stdClass();	#定义空的对象

			$sql = "DELETE FROM db_products_comment WHERE id='$data[id]'";
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

		public function productRecord($post = ""){
			if(!$post){
				header("Location: ../404.php");
				return false;
			}

			$d = new dataBase();
			$data = $post;
			$result = new stdClass();	#定义空的对象

			$countSql = "SELECT id FROM db_products_record";
			$countResult = $d->select($countSql);
			$result->count = $countResult ? count($countResult) : 0;

			$limit = $data['limit'] ? $data['limit'] : 10;
			$start = $data['page'] > 0 ? ($data['page'] - 1) * $limit : 0;

			$sql = "SELECT a.*, b.subtitle AS subtitle, b.img_index AS img FROM db_products_record AS a, db_products AS b WHERE a.pid=b.id ORDER BY id DESC LIMIT $start, $limit";
			$result->data = $d->select($sql);

			if($result->data) {
				$result->msg = 'success';

				for($i = 0; $i < count($result->data); $i++) {
					$result->data[$i]['date'] = date("Y-m-d", $result->data[$i]['date']);
					$result->data[$i]['content'] = $result->data[$i]['content'] ? $result->data[$i]['content'] : "无";
				}
			}	else{
				$result->msg = 'error';
			}

			$page = new commonController();	#分页
			$result->page = $page->pagination($result->count, $data['page'], $limit);

			$result_json = json_encode($result, JSON_UNESCAPED_UNICODE);

			if($data['start']){
				return $result;
			}	else{
				echo $result_json;
			}
		}

		public function productRecordAdd($post = ""){
			if(!$post){
				header("Location: ../404.php");
				return false;
			}

			$data = $post;
			$result = new stdClass();	#定义空的对象
			$d = new dataBase();
			$com = new commonController();

			$data['date'] = strtotime($data['date']);
			$data['dateTime'] = time();

			$sql = "INSERT INTO db_products_record (pid, record, date, dateTime, content) VALUES('$data[pid]', '$data[record]', '$data[date]', '$data[dateTime]', '$data[content]')";
			$r = $d->insert($sql);

			if($r){
				$count = $com->addRecord($post['pid'], $post['record']);
				$result->msg = 'success';
			} 	else{
				$result->msg = 'error';
			}

			$result_json = json_encode($result, JSON_UNESCAPED_UNICODE);

			echo $result_json;
		}

		public function productRecordDel($post = ""){
			if(!$post){
				header("Location: ../404.php");
				return false;
			}

			$data = $post;
			$result = new stdClass();	#定义空的对象
			$d = new dataBase();
			$com = new commonController();

			$recorSql = "SELECT pid, record FROM db_products_record WHERE id='$data[id]'";
			$recordResult = $d->select($recorSql);
			$recordPid = $recordResult[0]['pid'];
			$recordCount = $recordResult[0]['record'];
			$result->pid = $recordPid;

			$count = $com->reduceRecord($recordPid, $recordCount);

			if($count){
				$sql = "DELETE FROM db_products_record WHERE id='$data[id]'";
				$r = $d->delete($sql);

				if($r){
					$result->msg = 'success';
				} 	else{
					$count = $com->addRecord($recordPid, $recordCount);
					$result->msg = 'error';
				}
			}	else{
				$result->msg = '库存不足，删除失败！';
			}

			$result_json = json_encode($result, JSON_UNESCAPED_UNICODE);

			echo $result_json;
		}
	}

?>