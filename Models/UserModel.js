const {isEmail} = require("validator");
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema ({
    firstname:{
        type:String ,
         required:[true,"Firstname is required"]
        },
    lastname:{
        type:String ,
         required:[true,"Lastname is required"]
        },
    email :{
        unique:[true,"Email is already in use"],
        required:[true,"Email is required"],
        lowercase:true,
        type:String,
        validate:[isEmail ,"Email adrress is invalid"]
    },
    password:{type:String,
        required:[true,"Password is required"],
        minlength:[6,"Password must have at least 6 characters"]
    },
})

UserSchema.post('save',function(doc,next) {
    next();
})
UserSchema.pre('save',async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt)
    next()
})
UserSchema.statics.login = async function(email,password) {
    const user = await this.findOne({email});
    if (user) {
            var auth = await bcrypt.compare(password,user.password)
            if(auth) {
                return user;
            }
            throw Error(message="incorrect password")
    }
    throw Error(message ="incorrect email")
}

module.exports = mongoose.model("user",UserSchema)

