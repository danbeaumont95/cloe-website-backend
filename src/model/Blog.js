const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, },
    image: { type: String },
    body: { type: String },
    numComments: { type: Number },
  },
  { timestamps: true },
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = {
  Blog
};
