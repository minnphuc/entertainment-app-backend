const express = require("express");

const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");

const skipIfQuery = function (middleware) {
  return function (req, res, next) {
    if (Object.keys(req.query).length !== 0) return next();
    return middleware(req, res, next);
  };
};

const router = express.Router();

router
  .route("/")
  .get(skipIfQuery(commentController.getAllComments), commentController.getCommentsOfPost)
  .post(authController.protect, commentController.createComment);

module.exports = router;
