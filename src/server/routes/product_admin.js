const validator = require("express-validator");
const express = require("express");
const mkdirp = require("mkdirp");
const fs = require("fs-extra");
const path = require("path");
const ImageResize = require("image-resize");
let router = express.Router();


let product_admin = require("../controllers/admin/products/index");

//GET product index 
router.get("/",product_admin.getPageProduct);


//GET add-product 

router.get("/add-product",product_admin.getAddProduct);

//POST add-product

router.post(
	"/add-product",validator.body("title","Product name should not be empty").notEmpty(),validator.body("desc","You should add description").notEmpty(),validator.body("category","You should select a category").notEmpty(),validator.body("image").custom(function(value,{req}){
		console.log(req.files);
		if(typeof(req.files) == null){
			return true;
		}else{
			
			var extensions = path.extname(req.files.image.name).toLowerCase();
			switch(extensions){
				case '.jpg':
					return '.jpg';
				case '.jpeg':
					return '.jpeg';
				case '.png':
					return '.png';
				case '.gif':
					return '.gif';
				default:
					throw new Error("The file extension is not valid...");
					return false;
					
			}
			
		}
		
				
		
	}),product_admin.addProduct);





// GET edit-product/:id

router.get("/edit-product/:id",product_admin.getEditProduct);


// POST edit-category/:id

router.post("/edit-category/:id",validator.body("title","Title should not be empty").notEmpty(),function(req,res){
	
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
					  
					  
			
			
	
});


// POST delete category
router.post("/delete-category/:id",function(req,res){
	category_model.findByIdAndRemove(req.params.id,function(err){
		if(err) throw err;
		console.log(req.url);
		res.send("deleting success");
		
	});
})



module.exports = router;
