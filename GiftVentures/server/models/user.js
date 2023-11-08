const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    FirstName:{
        type:String,
        required:true
    },    
    SecondName:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    birthdate:{
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    },
  });

  const User = mongoose.model('User', userSchema)

  module.exports = User;