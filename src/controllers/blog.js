const { getAllBlogs } = require('../service/blog');

const getAllBlogsHandler = async (req, res) => {
  const respBody = {
    success: true,
    message: '',
    data: {}
  };
  try {
    const allBlogs = await getAllBlogs();

    if (!allBlogs) {
      respBody.message = `[BadRequest] Unable to find blogs`;
      return res.status(400).json(respBody);
    }
    if (!allBlogs.length) {
      respBody.success = true;
      respBody.message = '[BadRequest] No blogs posted yet';
      return res.status(200).json(respBody);
    }
    respBody.success = true;
    respBody.data = allBlogs;

  } catch (error) {
    return res.send({ error: error.message });
  }
  return res.status(200).json(respBody);
};

const createPostHandler = async (req, res) => {
  const respBody = {
    success: true,
    message: '',
    data: {}
  };
  try {

  } catch (error) {
    return res.send({ error: error.message });
  }
  return res.status(200).json(respBody);

};

module.exports = {
  getAllBlogsHandler
};
