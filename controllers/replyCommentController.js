const ReplyComment = require("../models/replyCommentModel");
const AppError = require("../utils/AppError");

exports.createReplyComment = async (req, res, next) => {
  try {
    const body = { ...req.body, user: req.user._id };

    const newRepComment = await ReplyComment.create(body);
    await newRepComment.populate({ path: "user", select: "name photo" });
    await newRepComment.populate({ path: "replyTo", select: "name" });

    res.status(201).json({
      status: "success",
      data: {
        reply: newRepComment,
      },
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

exports.getAllReplies = async (req, res, next) => {
  try {
    const replies = await ReplyComment.find();

    res.status(200).json({
      status: "success",
      results: replies.length,
      data: {
        replies,
      },
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

exports.getRepliesOfComment = async (req, res, next) => {
  try {
    const queryParams = req.query;

    if (!queryParams.comment)
      throw new AppError("Please use '{url}/replyComments?comment={commentId}'", 400);

    const replies = await ReplyComment.find({ comment: queryParams.comment }).sort(
      "-postedAt"
    );

    res.status(200).json({
      status: "success",
      results: replies.length,
      data: {
        replies,
      },
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};
