import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  genres: {
    type: Array,
  },
  createAt: {
    type: Date,
    defualt: Date.now(),
  },
  view: {
    type: Number,
    defualt: 0,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const VideoModel = mongoose.model("Video", VideoSchema);
export default VideoModel;
