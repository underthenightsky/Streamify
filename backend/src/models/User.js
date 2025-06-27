import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        default:"",
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:4,
        maxLength:10,
    },
    bio:{
        type:String,
        default:"",
    },
    profilePic:{
        type:String,
        default:"",
    },
    nativeLanguage:{
        type:String, 
        default:"",
    },
    learningLanguage:{
        type:String,
        default:"",
    },
    isOnboarded:{
        type:Boolean,
        default:false,
    },
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
},{timestamps:true}) ;
// timestamps help to find user created at, 
// updated at , member since values



// Using bcrypt js to hash the passwords before storing them , pre hook 


userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    try{
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next(); // will be used after the signup functionality , which page the user needs to be taken to 
    }
    catch(error){
        console.log(error);
        next(error);
    }  
})
// lets create a funciton for password matching where we will compare the stored hashed password and the current one, add a method
userSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password,this.password)
}
const User = mongoose.model("User",userSchema);

export default User;