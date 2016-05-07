"use strict"

let request = require("request")

request.post({
	url:"https://webapi.sms.mob.com/sms/verify", 
	form:{
		appkey:"126f41f81ddb8",
		phone:15295639550,
		zone:"86",
		code:7656}},
	function(error, response, body){
		console.log(error, response, body)
		if (!error && response.statusCode == 200){
			console.log(body);
		}
});