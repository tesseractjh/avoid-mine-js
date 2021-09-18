const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema(
  {
    name: String,
    score: Number,
    stage: Number,
    log: [
      {
        stage: Number,
        ensuredCell: Number,
        time: Number,
        movement: Number,
        life: Number,
        item1: Number,
        item2: Number,
        item3: Number,
        score: Number,
        mine: Number,
        accessableLength: Number,
        shortest: Number,
        isDead: Boolean,
        isAllEnsured: Boolean,
        itemInfo: {
          isItemUsed: Boolean,
          item1: Number,
          item2: Number,
          item3: Number,
          item4: Number
        }
      }
    ]
  },

  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('User', User);