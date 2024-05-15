import mongoose, { Schema } from "mongoose";

const userSchema = Schema(
  {
    user_name: { type: String, required: true },
    user_email: { type: String, required: true },
    user_password: { type: String, required: true }
  }, { timestamp: true }
)

const User = mongoose.model("User", userSchema);
export default User