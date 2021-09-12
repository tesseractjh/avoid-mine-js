const mongoose = require('mongoose');
const { Schema } = mongoose;

const Log = new Schema(
  {
    id: Number,
    log: [
      {
        stage: Number,
        cellCount: Number,
        time: Number,
        movement: Number,
        isItemUsed: Boolean,
        isDead: Boolean,
        isAllEnsured: Boolean,
        life: Number,
        item1: Number,
        item2: Number,
        item3: Number,
        score: Number
      }
    ]
  },

  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('Log', Log);