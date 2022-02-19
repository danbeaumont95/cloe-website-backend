const { Blog } = require('../model/Blog');

const getAllBlogs = async () => {
  try {
    const allBlogs = await Blog.find();
    return allBlogs;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllBlogs
};
