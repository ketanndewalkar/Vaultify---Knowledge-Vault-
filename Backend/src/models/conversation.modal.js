import mongoose from "mongoose";

const stepSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["plan", "input_required", "action"]
  },
  Fn: String,
  arg: [String],
  message: String
}, { _id: false });

const stateSchema = new mongoose.Schema({
  intent: {
    type: String,
    default: null
  },
  step: {
    type: [stepSchema],
    default: []
  },
  data: {
    type: Object,
    default: {}
  }
}, { _id: false });

const conversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  state: {
    type: stateSchema,
    default: () => ({
      intent: null,
      step: [],
      data: {}
    })
  },

  recentMessages: {
    type: [stateSchema],  // stores FULL objects (not references)
    default: []
  }
  ,
  sessionId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
},{timestamps:true});

export default mongoose.model("conversation",conversationSchema)