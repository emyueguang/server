"use strict"

let http = require("http")
let querystring = require("querystring")

let options = {
	hostname:"localhost",
	port:8088,
	path:"/chattext",
	method:"POST"
}

let postdata = querystring.stringify({
	from:"chenyongId",
	target:"target1, target2",
	content:"来自NODE_CLIENT的消息"
});

let body = ""
let request = http.request(options, function(response){
	response.on("data", function(chunk){
		body += chunk;
	});

	response.on("end", function(){
		console.log(body);
	});
});

request.write(postdata);
request.end();