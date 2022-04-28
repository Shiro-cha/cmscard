const validator = require("express-validator");
let page_model = require("../../../models/pages");


class Page_admin{
	//
	//reoder the page
	//
	reorderPage(req,res){

		var ids = req.body["id[]"];
		console.log(ids);
		var count = 0;
		ids.forEach(function(id){
			count++;

			(function(count){
				page_model.findById(id,function(err,page){
					page.sorting = count;
					page.save(function(err){
						if(err)
							return console.log(err);
					});
				});
			})(count);


		});

	}
	//
	//get the page for /admin/pages
	//
	getPageIndex(req,res){
		req.session.users = "Hellooooooooo";
		page_model.find().sort({sorting:1}).exec(function(err,pages){
			console.log(pages);
			res.render("admin/pages",{
				pages : pages
			});
		});
	}

	//
	//get the page for /admin/add-page
	//
	getAddPage(req,res){
		console.log(req.session);
		let title = "";
		let slog = "";
		let content = "";
		res.render("admin/add_pages",{
			title: title,
			 slog: slog ,
			 content: content
		});

	}

	//
	// add new page
	//
	addpage(req,res){

		const errors = validator.validationResult(req);
		if(errors.errors.length){
			res.send(JSON.stringify({data:errors.errors,success:false}));
		}else{
			let title = req.body.title;
			let slog = req.body.slog;
			console.log(req.body);
			if(slog == ""){
				slog = title.replace(/\s+/g,"-").toLowerCase();
			}else{
				slog = slog.replace(/\s+/g,"-").toLowerCase();
			}
			let content = req.body.content;
			console.log(req.body);
			page_model.findOne({slog:slog},function(err,page){
				console.log(slog);
				if(page){

					req.flash("danger","Page slug exist , choose another one");
					res.send(JSON.stringify({data:"Page slug exist , choose another one",success:false}));

				}else{

					let page = new page_model({
						title:title,
						slog:slog,
						content:content,
						sorting:100

					});

					page.save(function(err){
						if(err) return console.log(err);

							  req.flash("success","page added!");
						res.send(JSON.stringify({
							title:title,
							slog:slog,
							content:content,
							success:true
						}));

					});
					}
				});
			}
		}


	//
	// get page for edit-page
	//

	getEditPage(req,res){

		page_model.findOne({slog:req.params.slog},function(err,page){
			if(err) throw err;

				res.render("admin/edit-page",{
					title:page.title,
					slog:page.slog,
					content:page.content,
					id: page._id
			});
		});

	}

	//
	// edit the file with the current slog
	//

	editPage(req,res){

		const errors = validator.validationResult(req);
		if(errors.errors.length){
			res.send(JSON.stringify({data:errors.errors,succes:false}));
		}else{

			let title = req.body.title;
			let slog = req.body.slog;
			if(slog == ""){
				slog = title.replace(/\s+/g,"-").toLowerCase();
			}else{
				slog = slog.replace(/\s+/g,"-").toLowerCase();
			}
			let content = req.body.content;

			page_model.findOne({slog:req.params.slog},function(err,page){

				if(page.slog === slog){

					page.title = title;
					page.content = content;

					page.save(function(err){
						if(err) return console.log(err);

							  req.flash("success","page edit!");
						res.send(JSON.stringify({
							title:title,
							slog:slog,
							content:content,
							success:true
						}));

					});


				}else{

					page_model.findOne({slog:slog},function(err,_page){

						if(_page){
							console.log("The slog already exist");
							res.send(JSON.stringify({data:"The slog already exist",success:false}));
						}else{
							page.slog = slog;
							page.save(function(err){
								if(err) return console.log(err);

									  req.flash("success","page edit!");
								res.send(JSON.stringify({
									title:title,
								slog:slog,
								content:content,
								success:true
								}));

							});
						}

					});

				}

			});
		}

	}

	//
	// delete page with the current id
	//
	deletePage(req,res){

		page_model.findByIdAndRemove(req.params.id,function(err){
			if(err) throw err;
									 console.log(req.url);
			res.send("deleting success");

		});

	}

}


module.exports = new Page_admin();
