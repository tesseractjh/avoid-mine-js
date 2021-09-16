const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Schema } = mongoose;

const challengeUser = new Schema(
  
  {
    name: String,
    score: Number,
    time: Number,
    ensuredCell: Number,
    movement: Number,
    item1: Number,
    item2: Number,
    item3: Number,
    mine: Number,
    accessableLength: Number,
    shortest: Number,
    isItemUsed: Boolean,
    isDead: Boolean,
    isAllEnsured: Boolean,
  },

  {
    timestamps: true,
    versionKey: false
  }

);

router.post('/save/challenge/:modeId', (req, res) => {
  const { modeId } = req.params;
  challengeUser.set('collection', `challengeuser${modeId}`);
  const ChallengeUser = mongoose.model('ChallengeUser', challengeUser, `challengeusers${modeId}`);
  const user = new ChallengeUser();
  for (const [ key, value ] of Object.entries(req.body)) {
    user[key] = value;
  }

  if (user.score <= 0) {
    res.send('fail');
  } else {
    ChallengeUser.find({}, '_id score').sort({ score: -1, createdAt: 1 })
      .then(users => {
        const len = users.length;
        if (len < 50) {
          user.save();
        } else {
          const lastUser = users[len-1];
          const { _id, score } = lastUser;
          if (user.score <= score) {
            console.log(`50위 점수 ${score}점 이하라서 저장되지 않습니다.`)
            return;
          }

          Promise.all([
            user.save(),
            new Promise(resolve => resolve(ChallengeUser.deleteOne({ _id })))
          ])
          .then(() => console.log(`_id ${_id}, score ${score} document 삭제됨`));
        }
      })
      .then(() => res.send('success'))
      .then(() => console.log(`name: ${user.name}, modeId: ${modeId}, score: ${user.score}`))
      .catch(console.error);
  }
});

router.get('/leaderboard/challenge/:modeId', (req, res) => {
  const { modeId } = req.params;

  challengeUser.set('collection', `challengeuser${modeId}`);
  const ChallengeUser = mongoose.model('ChallengeUser', challengeUser, `challengeusers${modeId}`);

  ChallengeUser.find({}, '-_id ranking name score time ensuredCell movement item1\ item2\ item3')
    .sort({ score: -1, createdAt: 1 }).exec()
    .then(users => res.json(users))
    .catch(console.error);
});

module.exports = router;