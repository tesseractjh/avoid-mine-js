const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Schema } = mongoose;

const challengeUser = new Schema(
  
  {
    id: Number,
    ranking: Number,
    name: String,
    score: Number,
    time: Number,
    ensuredCell: Number,
    movement: Number,
    item1: Number,
    item2: Number,
    item3: Number
  },

  {
    timestamps: true,
    versionKey: false
  }

);

const challengeLog = new Schema(
  {
    id: Number,
    log: [
      {
        score: Number,
        time: Number,
        ensuredCell: Number,
        movement: Number,
        item1: Number,
        item2: Number,
        item3: Number,
        mine: Number
      }
    ]
  },

  {
    timestamps: true,
    versionKey: false
  }

);

const binSearch = (arr, n) => {
  let [ low, high ] = [ 0, arr.length - 1 ];
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] < n) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return low + 1;
};

router.post('/save/challenge/:modeId', (req, res) => {
  const { modeId } = req.params;
  const { name, score, time, ensuredCell, movement, item1, item2, item3, log } = req.body;

  challengeUser.set('collection', `challengeuser${modeId}`);
  challengeLog.set('collection', `challengeuser${modeId}`);
  const ChallengeUser = mongoose.model('ChallengeUser', challengeUser, `challengeusers${modeId}`);
  const ChallengeLog = mongoose.model('ChallengeLog', challengeUser, `challengelogs${modeId}`);

  const user = new ChallengeUser();
  const curLog = new ChallengeLog();
  user.name = name;
  user.score = score;
  user.time = time;
  user.ensuredCell = ensuredCell;
  user.movement = movement;
  user.item1 = item1;
  user.item2 = item2;
  user.item3 = item3;
  curLog.log = log;

  if (user.score <= 0) {
    res.send('fail');
  } else {
    ChallengeUser.find({}, 'id').sort({ id: -1 }).limit(1)
      .then(arr => {
        const lastUser = arr[0];
        user.id = lastUser ? lastUser.id + 1 : 1;
        curLog.id = lastUser ? lastUser.id + 1 : 1;
      })
      .then(() => ChallengeUser.find({}, 'score').sort({ score: -1 }))
      .then(users => binSearch(users.map(u => u.score).sort((a, b) => b - a), score))
      .then(ranking => {
        user.ranking = ranking;
        return ranking;
      })
      .then(ranking => ChallengeUser.updateMany({ ranking: { $gte: ranking }}, { $inc: { ranking: 1} }))
      .then(() => user.save())
      .then(() => curLog.save())
      .then(() => res.send('success'))
      .then(() => console.log(`name: ${name}, modeId: ${modeId}, score: ${score}`))
      .catch(console.error);
  }
});

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

module.exports = router;