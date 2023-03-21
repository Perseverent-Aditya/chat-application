require('dotenv').config()
const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcryptjs');
const cors=require('cors');
const nodemailer=require('nodemailer');
const port=process.env.PORT;

// models //
const User=require('./db/models/user');
const UserVerification=require('./db/models/userVerification')
const Coach=require('./db/models/coachModel');
const Request=require('./db/models/Requests')
const { default: mongoose } = require('mongoose');
require('./db/con')
const app=express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json());
app.set('view engine','hbs')
// const transporter=nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//         user:process.env.AUTH_USER,
//         pass:process.env.AUTH_PASSWORD
//     }
// })
// transporter.verify((err,success)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(success);
// })

app.get('/random',(req,res)=>{
    res.send("This is good")
})
app.get('/',(req,res)=>{
    res.send("Good")
})

// app.post('/random2',async(req,res)=>{

//     const password=req.body.password;
//     const cpassword=req.body.cpassword;
//     if(password===cpassword){
//         let newUser=new User(req.body);
//         newUser=await newUser.save();
//         let {_id,email}=newUser;
//         const currUrl=`http://localhost:${process.env.PORT}`
//         const mailOptions={
//             from:process.env.AUTH_USER,
//             to:email,
//             subject:"Please Verify your email address first",
//             html:`<p>Please verify your email</p><p>Click <a href=${currUrl + '/verify/' +_id}>here</a>to continue`
//         }
//         let newUserVerification=new UserVerification({
//             id:_id,
//             email:email
//         })
//         newUserVerification=await newUserVerification.save()
//         transporter.sendMail(mailOptions)
//         .then(()=>{
//             console.log("mail sent");
//             res.send({status:"Success",message:"Mail sent"})
//         })

//     }
// })
 
app.post('/signup2',async(req,res)=>{

    // const password=req.body.password;
    // const cpassword=req.body.cpassword;
    // if(password===cpassword){
    //     let newUser=new User(req.body);
    //     newUser=await newUser.save();
    //     let {_id,email}=newUser;
    //     const currUrl=`http://localhost:${process.env.PORT}`
    //     const mailOptions={
    //         from:process.env.AUTH_USER,
    //         to:email,
    //         subject:"Please Verify your email address first",
    //         html:`<p>Please verify your email</p><p>Click <a href=${currUrl + '/verify/' +_id}>here</a>to continue`
    //     }
    //     let newUserVerification=new UserVerification({
    //         id:_id,
    //         email:email
    //     })
    //     newUserVerification=await newUserVerification.save()
    //     transporter.sendMail(mailOptions)
    //     .then(()=>{
    //         console.log("mail sent");
    //         res.send({status:"Success",message:"Mail sent"})
    //     })

    // }
})

app.get('/verify/:id',async(req,res)=>{
    const id=req.params.id
    const verificationRequest=await UserVerification.findOne({id:id});
    console.log(verificationRequest)
    if(verificationRequest){
        const email=verificationRequest.email;
       let user=await User.findOne({email:email});
       let ans=await user.updateOne({isVerified:true});
       console.log(ans)
    }
    let finalAns=await UserVerification.deleteOne({id:id})
    console.log(finalAns)
    
    res.render('index')
    
})

app.post('/login',async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const user=await User.findOne({email:email});
    const {name,email2,isVerified,_id}=user;
    if(user.isVerified){
      const isMatch=await bcrypt.compare(password,user.password);
      const dummyUser={
        name:name,
        email:email2,
        isVerified:isVerified,
        id:_id
      }
      if(isMatch){
          res.send({status:"Success",message:"Logged in successfull",user:dummyUser})
      }
      else{
        res.send({status:"Error",message:"Invalid login or password"})
      }
    }
    else{
        res.send({status:"Error",message:"Verify your email first"})
    }
})

app.post('/registerCoach',async(req,res)=>{
    const id=new mongoose.Types.ObjectId
    const data={...req.body,id:id};
    let newCoach=new Coach(data);
    newCoach=await newCoach.save();
    res.send(newCoach);
})

app.get('/getCoaches',async(req,res)=>{
    const coaches=await Coach.find();
    res.send(coaches);
})

app.post('/addRequest',async(req,res)=>{
   let request=new Request(req.body);
   request
})

app.listen(port,()=>{
    console.log(`App is running on ${port}`)
})