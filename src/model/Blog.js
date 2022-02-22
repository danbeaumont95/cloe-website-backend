const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, default: '' },
    body: { type: String, required: true },
    numComments: { type: Number, default: 0 },
    tags: { type: Array, default: [] },
  },
  { timestamps: true },
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = {
  Blog,
};
