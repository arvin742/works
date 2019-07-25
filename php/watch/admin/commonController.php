<?php
	header('Access-Control-Allow-Origin: localhost');
	header('Content-Type:text/html; charset=UTF-8');

	require dirname(dirname(__FILE__))."/model/data.php";

	//Excel插件文件引入
	require '../vendor/autoload.php';
	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
	use PhpOffice\PhpSpreadsheet\IOFactory;
	use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
	use PhpOffice\PhpSpreadsheet\Worksheet\PageSetup;
	use PhpOffice\PhpSpreadsheet\Cell\DataType;
	use PhpOffice\PhpSpreadsheet\Style\Fill;
	use PhpOffice\PhpSpreadsheet\Style\Color;
	use PhpOffice\PhpSpreadsheet\Style\Alignment;

	class commonController{
		
		#分页
		public function pagination($count, $page, $limit){
			$count = $count ? $count : 1;
			$totalPages = ceil($count / $limit);
			$html = '';
			$arr = array();

			$prev = $page <= 1 ? 'disabled' : '';
			$next = $page >= $totalPages ? 'disabled' : '';
			$prevBtn = $page <= 1 ? 1 : $page-1;
			$nextBtn = $page >= $totalPages ? $totalPages : $page+1;

			if($totalPages > 2){

				$first = $prev ? 1 : 0;
				$last = $next ? 1 : 0;

				$arr = array(($page-1+$first-$last), ($page+$first-$last), ($page+1+$first-$last));

			}	else{

				for($i = 0; $i < $totalPages; $i++) { 
					$arr[$i] = $i + 1;
				}

			}
			

			$html.='<li class="page-item disabled"><a class="page-link btn">共'.$count.'条</a></li>';
			// $html.='<li class="page-item '.$prev.'"><a class="page-link" href="#" data-page="'.$prevBtn.'">上一页</a></li>';
			for($i = 0; $i < count($arr); $i++) {
				$active = ($arr[$i] == $page) ? 'active' : '';
				$html.='<li class="page-item '.$active.'"><a class="page-link btn" data-page="'.$arr[$i].'">'.$arr[$i].'</a></li>';
			}
			// $html.='<li class="page-item '.$next.'"><a class="page-link" href="#" data-page="'.$nextBtn.'">下一页</a></li>';
			$html.='<li class="page-item page-go">共 <input class="form-control" type="text" value="'.$totalPages.'" /> 页 <a class="btn-go btn">Go</a></li>';

			return $html;
		}

		#产品库存++
		public function addRecord($pid = "", $count = 0){
			if(!$pid){
				return false;
			}

			$d = new dataBase();
			$sql = "UPDATE db_products SET real_stock=real_stock+$count WHERE id='$pid'";
			$result = $d->update($sql);

			if($result){
				return true;
			}	else{
				return false;
			}
		}

		#产品库存--
		public function reduceRecord($pid = "", $count = 0){
			if(!$pid){
				return false;
			}

			$d = new dataBase();
			$result = "";

			$p_sql = "SELECT real_stock FROM db_products WHERE id='$pid'";
			$p = $d->select($p_sql);

			if($p){
				if($p[0]['real_stock'] - $count > -1){
					$sql = "UPDATE db_products SET real_stock=real_stock-$count WHERE id='$pid'";
					$result = $d->update($sql);
				}
			}

			if($result){
				return true;
			}	else{
				return false;
			}
		}

		public function exportExcel($list, $filename, $header_arr, $indexKey){
			
			//初始化PhpSpreadsheet
			$spreadsheet = new Spreadsheet();
			$objActSheet = $spreadsheet->getActiveSheet();

			/* 设置默认文字居左，上下居中 */
	        $styleArray = [
	            'alignment' => [
	                'horizontal' => Alignment::HORIZONTAL_LEFT,
	                'vertical'   => Alignment::VERTICAL_CENTER,
	            ],
	        ];

	        // $arrRow = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

	        $styleAutoSize = ['B', 'E', 'F', 'I', 'K'];

	        $spreadsheet->getDefaultStyle()->applyFromArray($styleArray);	//居中
	        $spreadsheet->getDefaultStyle()->getAlignment()->setWrapText(true);	//全部自动换行
	        $spreadsheet->getActiveSheet()->getDefaultRowDimension()->setRowHeight(40);	//行高
	        foreach ($styleAutoSize as $key => $value) {
	        	$spreadsheet->getActiveSheet()->getColumnDimension($value)->setAutoSize(true);	//自动宽度
	        }

			$filename = $filename.'.xlsx';
			$startRow = 1;

			foreach ($header_arr as $key => $value) {
				$objActSheet->setCellValueByColumnAndRow($key + 1, $startRow, $value);
			}

			foreach ($list as $row) {
				$startRow++;
				foreach ($indexKey as $key => $value){
					//这里是设置单元格的内容
					$objActSheet->setCellValueByColumnAndRow($key + 1, $startRow, $row[$value]);
				}
			}
			
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control:must-revalidate, post-check=0, pre-check=0");
			header("Content-Type:application/force-download");
			header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');//告诉浏览器输出07Excel文件
			header("Content-Type:application/octet-stream");
			header("Content-Type:application/download");
			header("Content-Disposition: attachment;filename=".$filename."");//告诉浏览器输出浏览器名称
			header("Cache-Control: max-age=0");//禁止缓存
			header("Content-Transfer-Encoding:binary");
			$objWriter = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
			$objWriter->save("php://output");

			exit;
		}
	}
?>