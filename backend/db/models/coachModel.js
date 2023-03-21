const mongoose=require('mongoose');
const {Schema}=require('mongoose')
const coachSchema=new mongoose.Schema({
     firstName:{
        type:String,
        required:true
     },
     lastName:{
        type:String,
        required:true
     },
     areas:{
        type:[String],
        required:true
     },
     hourlyRate:{
        type:Number,
        required:true
     },
     description:{
        type:String,
        required:true
     },
     id:{
        type:Schema.Types.ObjectId,
        required:true
     }
})

const Coach=mongoose.model("Coach",coachSchema);

module.exports=Coach;