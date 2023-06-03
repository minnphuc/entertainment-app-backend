const User = require("../models/userModel");

const filterBody = body => {
  const { password, passwordConfirm, email, photo, ...filteredBody } = body;

  return filteredBody;
};

exports.updateMe = async (req, res, next) => {
  try {
    const filteredBody = filterBody(req.body);

    const me = await User.findByIdAndUpdate(req.user._id, filteredBody, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        user: me,
      },
    });
  } catch (error) {
    console.log(error.message);
    error.statusCode = 404;
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    const [photoUrl, coverUrl] = await Promise.all([
      s3Util.signImageUrl(user.photo),
      s3Util.signImageUrl(user.cover),
    ]);
    user.photoUrl = photoUrl;
    user.coverUrl = coverUrl;

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};
