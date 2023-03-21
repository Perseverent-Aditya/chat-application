const mongoose=require('mongoose');
const bcrypt=require('bcryptjs')

const userVerificationSchema=new mongoose.Schema({
    id:{
        type:String
    },
    email:{
        type:String
    }
})

const UserVerification=mongoose.model('UserVerification',userVerificationSchema);

module.exports=UserVerification