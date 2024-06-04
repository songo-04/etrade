import User from "../model/user.mjs";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {SECRET_KEY} from "./../config.mjs";

async function signup(req, res, next) {
  try {
    const { user_name, user_email, user_password } = req.body;
    const userckeck = await User.findOne({ user_email });
    if (userckeck) { return res.status(400).json({ message: "Email already exists" }) }
    if (!user_name || !user_email || !user_password) {
      return res.json('Please provide all the required fields')
    }
    const hashPassword = bcryptjs.hashSync(user_password, 10);
    const user = new User({ user_name, user_email, user_password: hashPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user: user })
  } catch (err) { next(err) }
}
async function signin(req, res, next) {

  try {
    const { user_email, user_password } = req.body;
    if (!user_email || !user_password) {
      return res.json('Please provide all the required fields')
    }
    const isUserValide = await User.findOne({ user_email: user_email });
    if (!isUserValide) {
      return res.json('user email not found')
    }
    const isPasswordValide = bcryptjs.compareSync(user_password, isUserValide.user_password);
    if (!isPasswordValide) {
      return res.json('user password not found')
    }
    const token = jwt.sign({ user_id: isUserValide._id },SECRET_KEY, {expiresIn: '1h'})

    res.status(200).json({ message: 'User login successfully', user: isUserValide ,token: token })
    res.status(200).cookie('token', token,{httpOnly: true, maxAge: 3600000})

  } catch (err) { next(err) }
}
async function signout(req, res, next) { }
async function update(req, res, next) {

  const a = 0
}
async function deleteUser(req, res, next) { }

export { signin, signup, signout, update, deleteUser }