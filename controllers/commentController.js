const Comment = require("../models/commentModel");
const AppError = require("../utils/AppError");

exports.createComment = async (req, res, next) => {
  try {
    const body = { ...req.body, user: req.user._id };

    const newComment = await Comment.create(body);
    await newComment.populate({ path: "user", select: "name photo" });

    res.status(201).json({
      status: "success",
      data: {
        comment: newComment,
      },
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

exports.getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find();

    res.status(200).json({
      status: "success",
      results: comments.length,
      data: {
        comments,
      },
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

exports.getCommentsOfPost = async (req, res, next) => {
  try {
    const queryParams = req.query;

    if (!queryParams.post)
      throw new AppError("Please use '{url}/comments?post={postId}'", 400);

    const comments = await Comment.find({ post: queryParams.post }).sort("-postedAt");

    res.status(200).json({
      status: "success",
      results: comments.length,
      data: {
        comments,
      },
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};
