const mongoose=require('mongoose');

const requestSchema=new mongoose.Schema({
    userEmail:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    coachId:{
        type:String,
        required:true
    }
})

const Request=mongoose.model('request',requestSchema);

module.exports=Request