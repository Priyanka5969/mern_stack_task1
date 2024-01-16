const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  userBlogControlller,
} = require("../controllers/blogControlller");
const verifyToken = require("../auth");

//router object
const router = express.Router();

//routes
// GET || all blogs
router.get("/all-blog",verifyToken, getAllBlogsController);

//POST || create blog
router.post("/create-blog",verifyToken ,createBlogController);

//PUT || update blog
router.put("/update-blog/:id", verifyToken, updateBlogController);

//GET || SIngle Blog Details
router.get("/get-blog/:id",verifyToken, getBlogByIdController);

//DELETE || delete blog
router.delete("/delete-blog/:id", verifyToken, deleteBlogController);

//GET || user blog
router.get("/user-blog/:id", verifyToken, userBlogControlller);

module.exports = router;
