const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
	title:String,
	slog:String
});

module.exports = mongoose.model("categories",categorySchema);
