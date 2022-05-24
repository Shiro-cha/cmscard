const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const db_config = require("../../config/database");
const session = require("express-session");
const expressValidator = require("express-validator");
const fileUpload = require("express-fileupload");

//connect to database

mongoose.connect(`mongodb://localhost:27017/${db_config.db}`);

	mongoose.connection.once("open",function(){

	console.log("Connexion has been made , now fireworks...");

	}).on("error",function(err){
	console.log("connexion error : "+err);
	});


//init app
let app = express();



//set configuration

app.set("views",path.join(__dirname,"views"))
console.log(__dirname);
app.set("view engine","ejs");

//set defautlt static response
app.use(express.static(path.join(__dirname,"../../public")));


//set body-parser middelware

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//set express session middelware
app.set("trust proxy",1);
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}))

//set express validator middelware


// app.use(expressValidator({
// 	errorFormatter:function(param,msg,value){
// 		var namespace = param.split("-"),
// 		root = namespace.shift(),
// 		formParm = root;
// 		while(namespace.length){
// 			formParam += '['+name.shift()+']';
// 		}
// 		return{
// 			param:formParam,
// 			msg : msg,
// 			value:value
// 		}
// 	}
// }))

// set express messages middelware

app.use(require('connect-flash')());
app.use(function (req, res, next) {
	res.locals.messages = require('express-messages')(req, res);
	next();
});

//set express-fileupload middelware

app.use(fileUpload());

//set routes

let routes = require("./routes/index")(app);

//start server

let port = process.env.PORT || 3000;

app.listen(port,function(err){
    if (err) throw err;
    console.log(`Server start at port ${port}`);
});
