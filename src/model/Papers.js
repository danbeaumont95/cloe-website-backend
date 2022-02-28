const mongoose = require('mongoose');

const papersSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, default: '' },
    body: { type: String, required: true },
    tags: { type: Array, default: [] },
    link: { type: String, default: '' },
  },
  { timestamps: true },
);

const Papers = mongoose.model('Papers', papersSchema);

module.exports = {
  Papers,
};
