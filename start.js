"use strict"

console.time("HTTPServer")

let http = require("http")
let url = require("url")
let fs = require("fs")
let path = require("path")
let querystring = require("querystring")

let easemob = require('./easemob');

let config = {
	ip:"127.0.0.1",
	port:"8088"
}

function start(){
	let httpServer = http.createServer(process_request);

	httpServer.listen(config.port, function(){
		console.log("HTTPServer start on port:" + config.port);
		console.timeEnd("HTTPServer");

		easemob.getToken(function(token){
			console.log("TOKEN:" + token);
		});
	});

	httpServer.on("error", function(error){
		console.log("start http server failed.", error.message);
	});
}

function process_request(request, response){

	let path = decodeURI(url.parse(request.url).pathname);	// 使用decodeURI对字符串进行中文解码
	console.log(path)

	let data = "";
	request.on("data", function(chunk){
		data += chunk;
	});

	request.on("end", function(){
		data = querystring.parse(data);
		console.log(data);
		response.end("收到你的数据了");
		process_data(data);		
	});

	function process_data(data){
		if (path === "/chattxt"){
			console.log(data);
			easemob.sendText({
			type:'users',
			from:data.from,
			target:data.target.split(","),
			content:data.content});
		}
	}
}

start();