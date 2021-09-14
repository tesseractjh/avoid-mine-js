const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChallengeUser = new Schema(
  {
    id: Number,
    ranking: Number,
    name: String,
    score: Number,
    time: Number,
    cellCount: Number
  },

  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('ChallengeUser', ChallengeUser);