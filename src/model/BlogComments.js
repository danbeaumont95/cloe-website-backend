const mongoose = require('mongoose');

const blogCommentsSchema = new mongoose.Schema(
  {
    blogId: { type: mongoose.Types.ObjectId, ref: 'Blog', required: true },
    body: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true },
);

const BlogComments = mongoose.model('Blog', blogCommentsSchema);

module.exports = {
  BlogComments,
};
