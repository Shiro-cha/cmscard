
class Pages{
	
	getPage(req,res){
		res.render("index",{
			title:'Home',
			 projectname:"Shiro Shop"
		});
	}
	
} 

module.exports = new Pages();
