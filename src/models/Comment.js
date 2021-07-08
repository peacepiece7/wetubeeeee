import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  creator: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    reuquire: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
    require: true,
  },
});

const CommentModel = mongoose.model("Comment", CommentSchema);
export default CommentModel;
