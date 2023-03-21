const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/coach',()=>{
    console.log("Database is connected")
})