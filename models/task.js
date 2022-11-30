const mongoose=require("mongoose");
const Schema=mongoose.Schema

const userSchema=new Schema({
    title:{type:String},
    is_completed:{type:Boolean}

})

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel