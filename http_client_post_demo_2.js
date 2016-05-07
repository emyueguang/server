"use strict"

let rest = require("./node_modules/restler")

rest.post("localhost", {
	port:8088,
	path:"/chattxt",
	data:{
		from:"chenyongId",
		target:"target1, target2",
		content:"来自NODE_CLIENT的消息"	
	}
}).on("complete", function(data, response){
	console.log(data);
	console.log(response);
	// if (response.statusCode == 200){
	// 	console.log(data);
	// }
});