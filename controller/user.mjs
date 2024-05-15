import User from "../model/user.mjs";
import bcryptjs from "bcryptjs";

async function signup(req, res,next){
  try{
    const{user_name,user_email,user_password} = req.body;
    if(!user_name || !user_email || !user_password){
      return res.json('Please provide all the required fields')
    }
    const hashPassword = await bcryptjs.hash(user_password,10);
    const user = new User({user_name,user_email,user_password:hashPassword});
    await user.save();
    res.status(201).json({message:'User created successfully',user:user})
  }catch(err){next(err)}
}
async function signin(req, res,next){}
async function signout(req, res,next){}
async function update(req, res,next){}
async function deleteUser(req, res,next){}

export {signin,signup,signout,update,deleteUser}