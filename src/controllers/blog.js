const multiparty = require('multiparty');
const fs = require('fs');
const { uniqueId } = require('lodash');
const { upload, generateSuffix } = require('../helpers/aws');
const { getAllBlogs } = require('../service/blog');
const { Blog } = require('../model/Blog');

const getAllBlogsHandler = async (req, res) => {
  const respBody = {
    success: true,
    message: '',
    data: {},
  };
  try {
    const allBlogs = await getAllBlogs();

    if (!allBlogs) {
      respBody.message = '[BadRequest] Unable to find blogs';
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

// eslint-disable-next-line consistent-return
const createBlogHandler = async (req, res) => {
  const respBody = {
    success: true,
    message: '',
    data: {},
  };
  try {
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
      const { title, body } = fields;
      const newBlogTitle = title[0];
      const newBlogBody = body[0];
      if (!title) {
        throw new Error('[BadRequest] Blog needs a title');
      }
      if (!body) {
        throw new Error('[BadRequest] Blog needs a body');
      }
      const newBlog = await Blog.create({ title: newBlogTitle, body: newBlogBody });
      const { _id } = newBlog;
      if (error) {
        throw new Error(error);
      }
      const { path } = files.file[0];

      const buffer = fs.readFileSync(path);

      const uuid = uniqueId();
      const suffix = generateSuffix(files.file[0].headers['content-type']);
      const fileName = `blogImages/${_id}/${uuid}_${suffix}`;

      const data = await upload(buffer, fileName);

      const updatedBlog = await Blog.findByIdAndUpdate(_id, {
        $set: {
          image: data.Location,
        },
      }, {
        new: true,
      }).lean();

      respBody.success = true;
      respBody.data = updatedBlog;
      return res.status(200).json(respBody);
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

module.exports = {
  getAllBlogsHandler,
  createBlogHandler,
};
