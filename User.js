const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema(
  {
    id: Number,
    ranking: Number,
    name: String,
    rank: String,
    score: Number,
    stage: Number
  },

  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('User', User);