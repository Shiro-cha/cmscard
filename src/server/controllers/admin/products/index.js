const validator = require("express-validator");
const mkdirp = require("mkdirp");
const fs = require("fs-extra");
const path = require("path");
// const ImageResize = require("image-resize");

let product_model = require("../../../models/product");
let category_model = require("../../../models/category");

class Product{
	
	//
	// get the page for product
	//
	getPageProduct(req,res){
		
		var count;
		
		product_model.count(function(err,c){
			count = c;
		});
		product_model.find(function(err,products){
			res.render("admin/products",{
				products:products,
			  count:count
			});
		});
		
	}
	
	//
	//get page for adding new product
	//
	
	getAddProduct(req,res){
		
		let title="";
		let price;
		let desc="";
		
		category_model.find(function(err,cats){
				res.render("admin/add_product",{
				  title: title,
				  price:price,
				  desc:desc,
				  categories:cats
			});
		});
		
		
	}
	
	
	//
	//add new product 
	//
	
	addProduct(req,res){
		req.body.image = "";
		const errors = validator.validationResult(req);
		if(errors.errors.length){
			res.send(JSON.stringify({data:errors.errors,success:false}));
		}else{
			let image = typeof req.files.image != "undefined"? req.files.image.name:"";
			let title = req.body.title;
			let price = parseFloat(req.body.price).toFixed(2);
			let desc = req.body.desc;
			let category = req.body.category;
			let slog = title.replace(/\s+/g,"-").toLowerCase();
			product_model.findOne({slog:slog},function(err,element){
				if(element){
					
					// if the title of the product already exist in the database
					req.flash("danger","category title exist , choose another one");
					return res.status(200).json({data:"Product title already exist , choose another one",success:false});
					
				}else{
					// if all is fine 
					var newproduct = new product_model({
						title:title,
						price:price,
						desc:desc,
						category:category,
						slog:slog,
						image:image ==""? "noimage.jpg":image
					});
					
					newproduct.save(function(err){
						
						
						mkdirp("public/product_image/"+newproduct._id).then(function(data ,err){
						if(err) throw err;
						console.log(data);
						mkdirp("public/product_image/"+newproduct._id+"/gallery").then(function(data,derr){
							if(err) throw err;
							console.log(data);
							mkdirp("public/product_image/"+newproduct._id+"/gallery/thumbs").then(function(data,err){
								if(err) throw err; 
								console.log(data);
								if(image !=""){
									
									var productImage = req.files.image;
									var path_ = path.join(__dirname,`../../../../../public/product_image/${newproduct._id}/${productImage.name}`);
									console.log(__dirname);
									productImage.mv(path_,function(err){
										if(err) throw err;
										console.log("image move..");
									});
									
								}
							});
						});
						});
				
						
						
						
						req.flash("success","Product add");
						res.redirect("/admin/product");
						
					});
					
					
					
				}
				
				
			});
			
			
		}
		
		
	}
	
} 

module.exports = new Product();
