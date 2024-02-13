const UserModel = require("./../Models/UserModel")
const jwt = require("jsonwebtoken")

const handleErrors =(err) => {
      let error = {firstname:"",lastname:"",email:"",password:""}
      if (err.code === 11000) {
        error.email = "Email already exists";
        return error
      }
      if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({properties})=>{
            error[properties.path] = properties.message;
        })
      }
      if (err.message === "incorect email"){
              error.email = "Email does not exist"
      }
      if (err.message === "incorect password"){
           error.password = "Incorrect password"
      }
      return error;
      
}
const maxAge = 60*60*5;
const createToken = (id) => {
    let secret = process.env.JWT_SECRET
    return jwt.sign({id},secret,{
      expiresIn:maxAge
    })
}
const signUp =async (req,res) => {
    const {firstname,lastname,email,password} = req.body;
    try {
          const user = await UserModel.create({firstname,lastname,email,password})
          const token = createToken(user._id)
          res.status(200).json({token});
    } catch(error) {
      console.log(error)
        const errors = handleErrors(error)
        res.status(400).json({errors})
    }
    
}

const login = async (req,res) => {
    const {email ,password} = req.body;
    try {
      const user = await UserModel.login(email,password);
      const token = createToken(user._id);
      res.status(200).json({token})

    }catch(error) {
      console.log(error)
      const errors = handleErrors(error)
      res.status(400).json({errors})
    }
}
const logout = async (req,res) =>{
    res.clearCookie('token')
    res.status(200).json({message:"Logged out successfully"})
}

module.exports =  {
    signUp,
    login,
    logout
}






