const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Schema } = mongoose;

const survivalUser = new Schema(
  
  {
    name: String,
    score: Number,
    time: Number,
    delay: Number,
    cellCount: Number,
    itemInfo: {
      isItemUsed: Boolean,
      item1: Number,
      item2: Number,
      item3: Number,
      item4: Number
    }
  },

  {
    timestamps: true,
    versionKey: false
  }

);

const SurvivalUser = mongoose.model('SurvivalUser', survivalUser);

// 현재 버전
router.post('/survival', (req, res) => {
  const user = new SurvivalUser();
  for (const [ key, value ] of Object.entries(req.body)) {
    user[key] = value;
  }

  if (user.time <= 10 || user.score <= 100) {
    res.send('fail');
  } else {
    SurvivalUser.find({}, '_id score').sort({ score: -1, createdAt: 1 })
      .then(users => {
        const len = users.length;
        if (len < 500) {
          user.save();
        } else {
          const lastUser = users[len-1];
          const { _id, score } = lastUser;
          if (user.score <= score) {
            console.log(`500위 점수 ${score}점 이하라서 저장되지 않습니다.`)
            return;
          }

          Promise.all([
            user.save(),
            new Promise(resolve => resolve(SurvivalUser.deleteOne({ _id })))
          ])
          .then(() => console.log(`_id ${_id}, score ${score} document 삭제됨`));
        }
      })
      .then(() => res.send('success'))
      .then(() => console.log(`name: ${user.name}, score: ${user.score}, time: ${user.time}초`))
      .catch(console.error);
  }
});

// 이전 버전
router.post('/v100/save/survival', (req, res) => {
  const user = new SurvivalUser();
  for (const [ key, value ] of Object.entries(req.body)) {
    user[key] = value;
  }

  if (user.time <= 10 || user.score <= 100) {
    res.send('fail');
  } else {
    SurvivalUser.find({}, '_id score').sort({ score: -1, createdAt: 1 })
      .then(users => {
        const len = users.length;
        if (len < 500) {
          user.save();
        } else {
          const lastUser = users[len-1];
          const { _id, score } = lastUser;
          if (user.score <= score) {
            console.log(`500위 점수 ${score}점 이하라서 저장되지 않습니다.`)
            return;
          }

          Promise.all([
            user.save(),
            new Promise(resolve => resolve(SurvivalUser.deleteOne({ _id })))
          ])
          .then(() => console.log(`_id ${_id}, score ${score} document 삭제됨`));
        }
      })
      .then(() => res.send('success'))
      .then(() => console.log(`name: ${user.name}, score: ${user.score}, time: ${user.time}초`))
      .catch(console.error);
  }
});

// 현재 버전
router.get('/survival', (req, res) => {
  SurvivalUser.find({}, '-_id ranking name score time delay cellCount ')
    .sort({ score: -1, createdAt: 1 }).exec()
    .then(users => res.json(users))
    .catch(console.error);
});

// 이전 버전
router.get('/v100/leaderboard/survival', (req, res) => {
  SurvivalUser.find({}, '-_id ranking name score time delay cellCount ')
    .sort({ score: -1, createdAt: 1 }).exec()
    .then(users => res.json(users))
    .catch(console.error);
});

module.exports = router;