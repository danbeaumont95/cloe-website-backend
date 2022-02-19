const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
    type: { type: String }
  },
  { timestamps: true },
);

const Session = mongoose.model('Session', sessionSchema);

module.exports = { Session };