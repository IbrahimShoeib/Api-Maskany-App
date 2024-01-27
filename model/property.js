const mongoose = require("mongoose")




const propertySchema=mongoose.Schema({

    distance:{
        type:String,
        required:true
    },
    rooms:{
        type:Number,
        required:true
    },
    toilet:{
        type:Number,
        required:true
    },
    roaf:{
        type:String,
        required:true
    },


})





