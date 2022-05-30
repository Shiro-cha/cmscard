const express = require("express");
let router = express.Router();

let pages = require("../controllers/index");

router.get("/",pages.getPage);
router.get("/:page",pages.getPageParam);

module.exports = router;
