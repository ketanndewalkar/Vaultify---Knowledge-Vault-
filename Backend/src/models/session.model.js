import mongoose, { Mongoose } from "mongoose";

const messageSchema = new mongoose.Schema({
  type: {
    type: String,
    required: false,
  },
  role: String,
  content:{
    type:String,
  },
  msg: String,
  Fn: String,
  observation: String,
  args: [String],
});

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  message: {
    type: [messageSchema],
    trim: true,
  },
  conversationId:
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:"conversation",
  }
},{timestamps:true});



export default mongoose.model("session",sessionSchema)
