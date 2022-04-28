const validator = require("express-validator");
const express = require("express");
let router = express.Router();
 
let category_admin = require("../controllers/admin/categories/index.js");



//GET page index 

router.get("/",category_admin.getCategory);


//GET add-category 

router.get("/add-category",category_admin.getAddCategory);

//POST add-category

router.post(
	"/add-category",validator.body("title","Title should not be empty").notEmpty(),category_admin.addCategory);

// GET edit-category/:id

router.get("/edit-category/:id",category_admin.getEditPage);


// POST edit-category/:id

router.post("/edit-category/:id",validator.body("title","Title should not be empty").notEmpty(),category_admin.editCategory);


// POST delete category
router.post("/delete-category/:id",category_admin.deleteCategory)



module.exports = router;
