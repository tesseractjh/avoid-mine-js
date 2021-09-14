const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChallengeLog = new Schema(
  {
    id: Number,
    log: [
      {
        modelId: Number,
        cellCount: Number,
        time: Number,
        movement: Number,
        isAllEnsured: Boolean,
        score: Number
      }
    ]
  },

  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('ChallengeLog', ChallengeLog);