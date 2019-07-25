<?php
	header('Access-Control-Allow-Origin: localhost');
	header('Content-Type:text/html; charset=UTF-8');
	
	#数据库操作，链接link()，查询select()，插入insert()，更新update()，删除delete()
	class dataBase{
		
		private $conn = "";
		
		private function link(){
			$servername = "47.75.240.114";
			$dbname = "test";
			$username = "root";
			$password = "jxy2018+-";
			
			$this->conn = new mysqli($servername, $username, $password, $dbname);
			if(!$this->conn) {
		   		die("连接服务器失败: " . mysql_connect_error());//连接服务器失败退出程序
			}
			
			#数据库的查、写设置utf-8
			$this->conn->query("set names 'utf8'");
			$this->conn->query("set character set 'utf8'");
		}
		
		public function select($sql){

			$this->link();
			$data = $this->conn->query($sql);
			if($data->num_rows > 0) {
		    	while($row = $data->fetch_assoc()) {
			        $result[] = $row;
			    }
			} else {
		    	$result = false;
			}

			$this->close();

			return $result;
		}
		
		public function insert($sql){
			$this->link();

			if($this->conn->query($sql) === TRUE) {
				$result = true;
			} else {
				$result = false;
			}

			$this->close();
			
			return $result;
		}

		public function update($sql){
			$this->link();

			if($this->conn->query($sql) === TRUE) {
				$result = true;
			} else {
				$result = false;
			}
			
			$this->close();
			
			return $result;
		}

		public function delete($sql){
			$this->link();

			if($this->conn->query($sql) === TRUE) {
				$result = true;
			} else {
				$result = false;
			}

			$this->close();
			
			return $result;
		}
		
		private function close(){
			$this->conn->close();
		}
	}
?>