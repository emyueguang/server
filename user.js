"use strict"

/**
* 注册用户
* @cellphone 手机号
* @verification 验证码
* @pwd 密码
* */

let http = require("http")
let querystring = require("querystring")
let request = require("request")
let db = require("./db")

String.format = function()
{
	let args = arguments;
	return args[0].replace(/\{\d+\}/g, function(m){
		return args[m.substring(1, m.length-1)];
	});
}

/**
* 获取当前时间的时间戳
* */
function timestamp(){
	function add0(m){ return m<10?'0'+m:m }
	
	//shijianchuo是整数，否则要parseInt转换
	let time = new Date(Date.now());
	let y = time.getFullYear();
	let m = time.getMonth()+1;
	let d = time.getDate();
	let h = time.getHours();
	let mm = time.getMinutes();
	let s = time.getSeconds();
	return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}

console.log(timestamp())

/**
* 查询用户是否已存在
* */
function exist_user(cellphone, callback){
	db.query(String.format("select id from guser where cellphone='{1}';", cellphone), function(error, result){
		if (error){
			console.log("exist_user() error:", error.message);
			return callback(error, result);
		}

		callback(false, result.rows);
	});
}

/**
* 验证注册码是否正确
* */
function check_verification_code(cellphone, code, callback){
	request.post({
		url:"https://webapi.sms.mob.com/sms/verify", 
		form:{
			appkey:"126f41f81ddb8",
			phone:15295639550,
			zone:"86",
			code:7656}},
		function(error, response, body){
			console.log(error, response, body)
			if (!error && response.status == 200){
				callback(body)
				console.log(body);
			}
	});	
}

/**
* 注册用户
* */
function regist_user(cellphone, verificationCode, pwd, callback){
	exist_user(cellphone, function(error, rows){
		console.log(rows);
		if (rows.length > 0){
			callback(String.format("手机号:{1}已注册", cellphone));
		}
		else{ // 手机号未注册
			check_verification_code(cellphone, verificationCode, function(data){
				if (data.status === 200){
					// 验证通过
					db.query(String.format("insert into guser(cellphone, pwd, timestamp) values('{1}', '{2}', '{3}');", cellphone, pwd, timestamp()), function(error, result){
						if (error) {
							// 插入失败
							console.log("regist_user(). insert new user failed.", error.message);
							return callback(error);
						}

						callback("添加用户成功");
					});
				} else {
					// 验证失败
					console.log("验证失败!", data)
					callback("验证失败");
				}
			});
			if (rows.length === 0){
				db.query("insert into guser(cellphone, pwd)")
			}
		}
	});
}

/**
* 登陆
* @cellphone 手机号
* @pwd 密码
* */
function login(cellphone, pwd){

}

/**
* 重置密码
* @uid 用户id
* @pwd 密码
* */
function modify_pwd(uid, pwd){

}

module.exports.regist_user = regist_user
module.exports.login = login
moudle.exports.modify_pwd = modify_pwd