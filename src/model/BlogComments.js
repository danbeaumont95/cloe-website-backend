const mongoose = require('mongoose');

const blogCommentsSchema = new mongoose.Schema(
  {
    blogId: { type: mongoose.Types.ObjectId, ref: 'Blog' },
    body: { type: String },
    author: { type: String }
  },
  { timestamps: true },
);


const BlogComments = mongoose.model('Blog', blogCommentsSchema);

module.exports = {
  BlogComments
};
