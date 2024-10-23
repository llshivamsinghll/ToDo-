const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/mydatabase");

const taskSchema=new mongoose.Schema({
  
    id: Number,
    title: String,
    description: String,

  
})


module.exports=mongoose.model('task',taskSchema)