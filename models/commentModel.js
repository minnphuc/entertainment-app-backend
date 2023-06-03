const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  show: {
    type: String,
    required: [true, "Comment must belong to a show"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Comment must belong to a user"],
  },
  content: { type: String, required: [true, "Comment must have content"] },
  postedAt: { type: Date, default: Date.now },
});

commentSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name photo" });

  next();
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
