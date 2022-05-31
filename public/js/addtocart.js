$(function(){
	
	$.ajax({
		url:`/product/${this.id}`,
		method:"GET",
		success: function(res){
			$("#cart").text(res.number)
			$("#cart-list").empty()
			if(res.products){
				res.products.forEach(function(value){
					if(value){
						$("#cart-list").append(`<div class="dropdown-item" style="display:flex;justify-content:space-between"><span><span class="badge badge-danger">${value.number}</span> <b  style="text-decoration:none">${value.product.title}</b></span> <a href="/product/remove/${value.product._id}" >remove</a></div>`)
					}
					
				})
				if(res.number){
					$("#cart-list").append("<hr>")
					$("#cart-list").append(`<a class="btn btn-primary w-100" href="/product/checkout">Validate</a>`)	
				}else{
					$("#cart-list").append("<p class=\" text-center\">There is nothing here</p>")
				}
				
			}else{
				$("#cart-list").append("<p class=\" text-center\">There is nothing here</p>")
			}
				
			
		},
		error: function(err){
			console.log(err)
		}
	})
	
	$(".add-cart").click(function(){
		$.ajax({
			url:`/product/${this.id}`,
		 	method:"POST",
		 	success: function(res){
				$("#cart").text(res.number)
				$("#cart-list").empty()
				if(res.products){
					res.products.forEach(function(value){
						if(value){
							if(value){
								$("#cart-list").append(`<div class="dropdown-item" style="display:flex;justify-content:space-between"><span><span class="badge badge-danger">${value.number}</span> <b  style="text-decoration:none">${value.product.title}</b></span> <a href="/product/remove/${value.product._id}" >remove</a></div>`)
							}
						}
					})
					if(res.number){
						$("#cart-list").append("<hr>")
						$("#cart-list").append(`<a class="btn btn-primary w-100" href="/product/checkout">Validate</a>`)	
					}else{
						$("#cart-list").append("<p class=\" text-center\">There is nothing here</p>")
					}
				}else{
					$("#cart-list").append("<p class=\" text-center\">There is nothing here</p>")
				}
			},
			error: function(err){
				console.log(err)
			}
		})
	})
	
}) 
