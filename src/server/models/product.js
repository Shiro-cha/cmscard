const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
	
	title:{
		type:String,
		required:true
	},
	slog:{
		type:String,
		required:true
	},
	desc:{
		type:String,
		required:true
	},
	category:{
		type:String,
		required:true
	},
	price:{
		type:Number
	},
	image:{
		type:String
	}
	
	
});

module.exports = mongoose.model("product",productSchema);
