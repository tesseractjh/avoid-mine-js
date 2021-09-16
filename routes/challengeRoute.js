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

// 이전 버전
router.post('/save/challenge/:modeId', (req, res) => {
  const { modeId } = req.params;
  const { name, score, time, ensuredCell, movement, item1, item2, item3, log } = req.body;

  challengeUser.set('collection', `challengeuser${modeId}`);
  const ChallengeUser = mongoose.model('ChallengeUser', challengeUser, `challengeusers${modeId}`);

  const user = new ChallengeUser();
  user.name = name;
  user.score = score;
  user.time = time;
  user.ensuredCell = ensuredCell;
  user.movement = movement;
  user.item1 = item1;
  user.item2 = item2;
  user.item3 = item3;

  if (user.score <= 0) {
    res.send('fail');
  } else {
    ChallengeUser.find({}, 'id').sort({ id: -1 }).limit(1)
      .then(arr => {
        const lastUser = arr[0];
        user.id = lastUser ? lastUser.id + 1 : 1;
      })
      .then(() => ChallengeUser.find({}, 'score').sort({ score: -1 }))
      .then(users => binSearch(users.map(u => u.score).sort((a, b) => b - a), score))
      .then(ranking => {
        user.ranking = ranking;
        return ranking;
      })
      .then(ranking => ChallengeUser.updateMany({ ranking: { $gte: ranking }}, { $inc: { ranking: 1} }))
      .then(() => user.save())
      .then(() => res.send('success'))
      .then(() => console.log(`name: ${name}, modeId: ${modeId}, score: ${score}`))
      .catch(console.error);
  }
});

// 현재 버전
router.post('/v100/save/challenge/:modeId', (req, res) => {
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

// 이전 버전
router.get('/leaderboard/challenge/:modeId/:page', (req, res) => {
  const { modeId, page } = req.params;

  challengeUser.set('collection', `challengeuser${modeId}`);
  const ChallengeUser = mongoose.model('ChallengeUser', challengeUser, `challengeusers${modeId}`);

  const end = (+page + 1) * 100;
  ChallengeUser.find({ ranking: { $gte: 1, $lte: end } }, '-_id ranking name score time ensuredCell movement item1\ item2\ item3')
    .sort({ ranking: 1 }).exec()
    .then(users => res.json(users))
    .catch(console.error);
});

// 현재 버전
router.get('/v100/leaderboard/challenge/:modeId', (req, res) => {
  const { modeId } = req.params;

  challengeUser.set('collection', `challengeuser${modeId}`);
  const ChallengeUser = mongoose.model('ChallengeUser', challengeUser, `challengeusers${modeId}`);

  ChallengeUser.find({}, '-_id ranking name score time ensuredCell movement item1\ item2\ item3')
    .sort({ score: -1, createdAt: 1 }).exec()
    .then(users => res.json(users))
    .catch(console.error);
});

module.exports = router;