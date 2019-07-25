function textReady(){
	var opts = {},
		province = 	["北京", "天津", "河北", "河南", "山西", "山东", "辽宁", "吉林", "上海", "江苏", "浙江", "福建", "江西", "安徽", "湖北", "湖南", "广东", "广西", "海南", "重庆", "四川", "贵州", "云南", "陕西", "甘肃"],
		name = ['赵', '刘', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '卫', '沈', '蒋', '韩', '杨', '朱', '秦', '许', '何', '张', '曹', '魏', '苏', '程', '叶', '鲁', '马', '陶', '江', '杜', '余', '徐', '顾', '谢', '林', '金'],
		price = ['799', '1080', '899', '1120', '1050', '788', '1320', '1295', '1560', '1580', '1488', '1500', '1288', '1380', '1580', '1450', '1680', '1190', '1350'],
		num = [130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 150, 151, 152, 153, 155, 156, 157, 158, 159, 166, 173, 176, 177, 178, 182, 183, 184, 185, 186, 187, 188],
		n = [1, 2, 3, 4, 5, 6, 7, 8, 9],
		model = ['男款', '女款', '情侣款'];
	
	var rand = function(arr){
		return arr[Math.floor(Math.random() * arr.length)];
	}
	
	opts.city = rand(province);
	opts.name = rand(name) + "**";
	opts.phone = rand(num) + "****";
	for(var i = 0; i < 4; i++){
		opts.phone += rand(n);
	}

	var time = new Date(),
		date = new Date(time.getTime() - Math.floor(Math.random() * 6 + 1) * 24 * 3600 * 1000),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate();
		
	opts.date = year + '-' + month + '-' + day;

	opts.scend = Math.floor(Math.random() * 28 + 2);
	opts.model = rand(model);
	opts.price = opts.model != "情侣款" ? rand(price) : rand(price) * 2;
	
	return opts;
}