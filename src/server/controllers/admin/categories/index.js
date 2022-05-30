const validator = require("express-validator");
const express = require("express");

let category_model = require("../../../models/category");

class Category{
	
	//
	// get the page for category
	//
	getCategory(req,res){
		
		category_model.find(function(err,categories){
			if(err) throw err
			res.render("admin/categories",{
				categories : categories
			});
		});
		
	}
	
	//
	// get the page to add category
	//
	
	getAddCategory(req,res){
		
		let title = "";
		res.render("admin/add_category",{
			title: title,
		});
		
	}
	
	//
	// add new category
	//
	addCategory(req,res){
		
		const errors = validator.validationResult(req);
		if(errors.errors.length){
			res.send(JSON.stringify({data:errors.errors,success:false}));
		}else{
			let title = req.body.title;
			let slog = title.replace(/\s+/g,"-").toLowerCase();
			category_model.findOne({slog:slog},function(err,element){
				console.log(slog);	
				if(element){
					
					req.flash("danger","category slog exist , choose another one");
					res.send(JSON.stringify({data:"Category already exist , choose another one",success:false}));
					
				}else{
					
					let category = new category_model({
						title:title,
						slog:slog
						
					});
					
					category.save(function(err){
						if(err) return console.log(err);
								  
								  req.flash("success","category added!");
						res.send(JSON.stringify({
							title:title,
							success:true
						}));
						
					});
			
				}
		
			});	
		}		
	}
	
	//
	//get page for editing a category
	//
	
	getEditPage(req,res){
		
		category_model.findById(req.params.id,function(err,category){
			if(err) throw err;
			res.render("admin/edit-category",{
				title:category.title,
				id:category._id
			});
		});
	}
	//
	// editing category by id
	//
	editCategory(req,res){
		
		const errors = validator.validationResult(req);
		if(errors.errors.length){
			res.send(JSON.stringify({msg:errors.errors[0].msg,succes:false}));
		}else{
			
			let title = req.body.title;
			let id = req.params.id;
			
			category_model.findOne({title:title},function(err,element){
				if(err) throw err;
								   console.log(element);
				if(element){
					if(element._id == id){
						res.send(JSON.stringify({success:true}));
					}else{
						res.send(JSON.stringify({msg:"This category already exist",success:false}));
					}
				}else{
					category_model.findById(id,function(err,_element){
						_element.title = title;
						_element.save(function(err){
							if(err) throw err;
							res.send(JSON.stringify({success:true}));
						});
					});
				}
			});		
		}
	}
	//
	// deleting category by id
	//
	
	deleteCategory(req,res){
		
		category_model.findByIdAndRemove(req.params.id,function(err){
			if(err) throw err;
										 console.log(req.url);
			res.send("deleting success");
			
		});
		
	}
	
} 


module.exports = new Category();
