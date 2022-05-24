const page_model = require("../models/pages")


class Pages{
	
	getPage(req,res){
		
		page_model.find().sort({sorting:1}).exec(function(err,pages){
			res.render("index",{
				title:"welcome",
				pages:pages,
			  projectname:"Shiro Shop"
			});	
		})
		
	}
	
} 

module.exports = new Pages();
