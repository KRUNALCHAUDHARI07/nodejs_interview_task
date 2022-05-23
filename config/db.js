const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/nodedemo",(err)=>{
    if(err){
        console.log("err");
    }
    console.log("connected");
});

module.exports = mongoose;