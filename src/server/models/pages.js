const mongoose = require("mongoose");

let pagesSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    slog:{
        type:String
    },
    content:{
        type:String,
        required:true
    },
    sorting:{
        type:Number
    }
});

var pages = module.exports = mongoose.model("pages",pagesSchema);

