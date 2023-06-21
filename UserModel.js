
// const mongoose = require('mongoose')

// const users = mongoose.Schema({
//     name:{
//         type:String,
//     },
//     email:{
//         type:String,
//     },
//     phone:{
//         type:Number,
//     }

// })

// module.exports = mongoose.model("users", users)
class User {
  constructor(id, name, email, phone) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}
const users = [{ id: 1, name: "a", email: "s", phone: 1 }, { id: 2, name: "b", email: "i", phone: 2 }];

module.exports = {
  users
};


// export default User;