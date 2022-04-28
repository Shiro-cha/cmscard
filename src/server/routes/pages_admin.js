const validator = require("express-validator");
const express = require("express");
let router = express.Router();


let page_admin = require("../controllers/admin/pages/page_admin");




//POST reorder-page

router.post("/reorder-page",page_admin.reorderPage);

//GET page index 

router.get("/",page_admin.getPageIndex);


//GET add-page 

router.get("/add-page",page_admin.getAddPage);

//POST add-page

router.post(
	"/add-page",validator.body("title","Title should not be empty").notEmpty(),validator.body("content","You should add content").notEmpty(),page_admin.addpage);





// GET edit-page/:slog

router.get("/edit-page/:slog",page_admin.getEditPage);


// PUT edit-page/:slog

router.put("/edit-page/:slog",validator.body("title","Title should not be empty").notEmpty(),validator.body("content","Content should not be empty").notEmpty(),page_admin.editPage);


// DELETE page
router.delete("/delete-page/:id",page_admin.deletePage);



module.exports = router;
