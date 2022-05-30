const page_model = require("../models/pages")
const category_model = require("../models/category")
const product_model = require("../models/product")


class Pages{
	
	getPage(req,res){
		
		page_model.find().sort({sorting:1}).exec(function(err,pages){
			if(err) throw err
			category_model.find(function(err,categories){
				if(err) throw err
				let category = req.query.products
				if(category){
					product_model.find({category:category},function(err,products){
						category_model.findOne({slog:category},function(err,cat){
							res.render("index",{
								title:"Welcome",
								pages:pages,
								catTitle: cat.title,
								products:products,
								categories:categories,
							  projectname:"Shiro Shop"
							})
						})
						
					})
				}else{
					product_model.find(function(err,products){
						res.render("index",{
							title:"Welcome",
							pages:pages,
							catTitle:"All",
							products:products,
							categories:categories,
						  projectname:"Shiro Shop"
						})
					})
				}
				
				
			})
			
		})
		
	}
	getPageParam(req,res){
		page_model.find().sort({sorting:1}).exec(function(err,pages){
			if(err) throw err
		let slog = req.params.page
		if(slog){
			page_model.findOne({slog: slog},function(err,page){
				if(err) throw err 
				if(page){
					if(page.slog === "home"){
						res.redirect("/")
					}else{
						res.render("pages",{
							title:page.title,
							pages:pages,
							projectname:"Shiro Shop",
							content:page.content
						})
					}
					
				}else{
					res.redirect("/")
				}
				
			})
		}else{
			res.redirect("/")
		}
		
	})
	}	
	
} 

module.exports = new Pages();
