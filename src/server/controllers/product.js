const product_model = require("../models/product")
const page_model = require("../models/pages")
class Product{
	getaddcart(req,res){
		if(req.session.cart){
			let cartNumber = 0
			req.session.cart.forEach(function(value){
				if(value){
					cartNumber = cartNumber + value.number	
				}
			})
			res.json({number:cartNumber,products:req.session.cart})
		}else{
			req.session.cart = []
			res.json({number:0,products:null})
		}
	}
	addcart(req,res,next){
		let productId = req.params.product
		let achat = {product:null,number:0}
		product_model.findById(productId,function(err,product){
			if(err) throw err
				achat.product=product
					if(!(function(){
					let verify = false
				for(let i = 0 ; i < req.session.cart.length ; i++){
					if(req.session.cart[i]){
						if(req.session.cart[i].product.slog === achat.product.slog){ //already in cart
							req.session.cart[i].number++
							verify =  true
							break
							
						}else{
							verify =  false
						}
					}
						
				}
				
				return verify
					
				})()){
					achat.number++
					req.session.cart.push(achat)
				}
				let cartNumber = 0
				req.session.cart.forEach(function(value){
					if(value){
						cartNumber = cartNumber + value.number	
					}
					
				})
				res.json({number:cartNumber,products:req.session.cart})
		})
			
	}
	
	remove(req,res){
		let productId  = req.params.id
		
		for(let i = 0 ; i < req.session.cart.length ; i++){
			if(req.session.cart[i]){
				if(req.session.cart[i].product._id == productId){ //already in cart
					if(req.session.cart[i].number > 1){
						req.session.cart[i].number--	
					}else{
						req.session.cart[i]=null
					}
					break
					
				}	
			}
			
		}
	
		res.redirect("/")
	}
	getCheckout(req,res){
		page_model.find().sort({sorting:1}).exec(function(err,pages){
			if(err) throw err
			let cartPrice = 0
				req.session.cart.forEach(function(value){
					if(value){
						cartPrice = cartPrice + value.number*value.product.price	
					}
					
				})
			if(req.session.cart){
				res.render("cartCheckout",{
					title : "Cart checkout",
					pages:pages,
					price:cartPrice,
					projectname:"Shiro Shop",
					products:req.session.cart
				})
			}else{
				res.send("There is an error on your request")
			}
		})
		
		
	}
	
} 

module.exports = new Product()
