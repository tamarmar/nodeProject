
const mongoose = require('mongoose')

const users = mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:Number,
    }

})

module.exports = mongoose.model("users", users)