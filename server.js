const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: 'variables.env' });
const app = express();
const PORT = process.env.PORT || 5000;
const User = require('./models/User');
const Log = require('./models/Log');
const challengeRoute = require('./routes/challengeRoute');

app.use(cors());
app.use(express.json());
app.use('/', express.static(__dirname + '/'));
app.use('/', challengeRoute);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, err => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected to database successfully');
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

// 
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

// 아직 이전 버전에서 플레이 중인 사람들의 기록 저장을 위함
app.post('/save-record', (req, res) => {
  const { name, score, rank, stage, log } = req.body;
  const user = new User();
  const curLog = new Log();
  user.name = name;
  user.score = score;
  user.rank = rank;
  user.stage = stage;
  curLog.log = log;

  if (user.score <= 0) {
    res.send('fail');
  } else {
    User.find({}, 'id').sort({ id: -1 }).limit(1)
      .then(arr => {
        const lastUser = arr[0];
        user.id = lastUser ? lastUser.id + 1 : 1;
        curLog.id = lastUser ? lastUser.id + 1 : 1;
      })
      .then(() => User.find({}, 'score').sort({ score: -1 }))
      .then(users => binSearch(users.map(u => u.score).sort((a, b) => b - a), score))
      .then(ranking => {
        user.ranking = ranking;
        return ranking;
      })
      .then(ranking => User.updateMany({ ranking: { $gte: ranking }}, { $inc: { ranking: 1} }))
      .then(() => user.save())
      .then(() => curLog.save())
      .then(() => res.send('success'))
      .then(() => console.log(`name: ${name}, score: ${score}, rank: ${rank}, stage: ${stage}`))
      .catch(console.error);
  }
});

app.post('/save/classic', (req, res) => {
  const { name, score, rank, stage, log } = req.body;
  const user = new User();
  const curLog = new Log();
  user.name = name;
  user.score = score;
  user.rank = rank;
  user.stage = stage;
  curLog.log = log;

  if (user.score <= 0) {
    res.send('fail');
  } else {
    User.find({}, 'id').sort({ id: -1 }).limit(1)
      .then(arr => {
        const lastUser = arr[0];
        user.id = lastUser ? lastUser.id + 1 : 1;
        curLog.id = lastUser ? lastUser.id + 1 : 1;
      })
      .then(() => User.find({}, 'score').sort({ score: -1 }))
      .then(users => binSearch(users.map(u => u.score).sort((a, b) => b - a), score))
      .then(ranking => {
        user.ranking = ranking;
        return ranking;
      })
      .then(ranking => User.updateMany({ ranking: { $gte: ranking }}, { $inc: { ranking: 1} }))
      .then(() => user.save())
      .then(() => curLog.save())
      .then(() => res.send('success'))
      .then(() => console.log(`name: ${name}, score: ${score}, rank: ${rank}, stage: ${stage}`))
      .catch(console.error);
  }
});

app.get('/leaderboard/classic/:page', (req, res) => {
  const { page } = req.params;
  const end = (+page + 1) * 100;
  User.find({ ranking: { $gte: 1, $lte: end } }, '-_id ranking name score rank stage')
    .sort({ ranking: 1 }).exec()
    .then(users => res.json(users))
    .catch(console.error);
});

app.post('/log/classic', (req, res) => {
  const { name, stage, tempScore, score } = req.body;
  console.log(`${name}님이 ${stage}스테이지를 ${tempScore}점으로 클리어! 현재 총점: ${score}점`);
  res.send('received');
});

app.post('/log/challenge/fail', (req, res) => {
  const { name, modeId } = req.body;
  console.log(`${name}님이 도전모드 ${modeId}을(를) 실패함!`);
  res.send('received');
});

app.post('/log/challenge', (req, res) => {
  const { name, tempScore, modeId } = req.body;
  console.log(`${name}님이 도전모드 ${modeId}을(를) ${tempScore}점으로 클리어!`);
  res.send('received');
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});