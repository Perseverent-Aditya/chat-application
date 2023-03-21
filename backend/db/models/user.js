const mongoose=require('mongoose');
const bcrypt=require('bcryptjs')
const userModel=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    }
})
userModel.pre('save',async function(){
    this.password=await bcrypt.hash(this.password,10);
    this.cpassword=await bcrypt.hash(this.cpassword,10)
})


const User=new mongoose.model("User",userModel)

module.exports=User;