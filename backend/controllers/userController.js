import {User} from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register =async(req,res)=>{
    try{
     const {fullName,username,password,confirmPassword,gender}=req.body;
     if(!fullName || !username || !password || !confirmPassword || !gender) {
        return res.status(400).json({message:"All fields are required"});
      }
      if(password!==confirmPassword){
        return res.status(400).json({message:"Password and confirm password do not match"});
    }
    const user=await User.findOne({username});
    if(user){
        return res.status(400).json({message:"Username already exists"});
    }
    const hashedPassword=await bcrypt.hash(password,10);

    const maleProfilePhoto=`https://avatar.shifaul.dev/public/boy?username=${username}`;
    const femaleProfilePhoto=`https://avatar.shifaul.dev/public/girl?username=${username}`;
    await User.create({
        fullName,
        username,
        password:hashedPassword,
        profilePhoto:gender==="male"?maleProfilePhoto:femaleProfilePhoto,
        gender,
    });
return res.status(201).json({message:"User registered successfully"});
}catch(error){
     console.log(error);
}
}

export const login=async(req,res)=>{
try{
const {username,password}=req.body;
if(!username || !password){
    return res.status(400).json({message:"All fields are required"});
};
const user=await User.findOne({username});
if(!user){
    return res.status(400).json({
        message:"Invalid username or password",
        success:false
    });

};
const isPasswordValid=await bcrypt.compare(password,user.password);
if(!isPasswordValid){
    return res.status(400).json({
        message:"Invalid username or password",
        success:false
    });
}
       
const token=await jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
    return res.status(200).cookie("token",token,{maxAge:24*60*60*1000,httpOnly:true,sameSite:"strict"}).json({
       
          _id:user._id,
          username:user.username,
          fullName:user.fullName,
        profilePhoto:user.profilePhoto, 
      
    });
}catch(error){
    console.log(error);
}
}
export const logout=(req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logout successful"
        }) 
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
}


export const getOtherUser=async (req,res)=>{
    try{
const loggedInUserId=req.id;
const otherUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
return res.status(200).json(otherUsers);
    }
    catch(error){
          console.log(error);  
    }
}
