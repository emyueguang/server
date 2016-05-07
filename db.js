"use strict"

let pg = require('pg');
let constr = "tcp://jianglin:jjjjjjj@localhost/postgres"
let client = new pg.Client(constr);
client.connect(function(error){
	if (error){
		return console.log(error.message);
	}

	// client.query("select * from guser", function(err, result){
	// 	if (err){
	// 		return console.log(err);
	// 	}

	// 	console.log(result.rows);
	// });
});

module.exports = client
