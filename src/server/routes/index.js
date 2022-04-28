var pages = require("./pages");
var pages_admin = require("./pages_admin");
var category_admin = require("./category_admin");
var product_admin = require("./product_admin");


module.exports = function(app){
	
	app.use("/admin/pages",pages_admin);
	app.use("/admin/category",category_admin);
	app.use("/admin/product",product_admin);
	app.use("/",pages);
	
}
