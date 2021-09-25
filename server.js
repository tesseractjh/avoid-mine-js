const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: 'variables.env' });
const app = express();
const PORT = process.env.PORT || 5000;
const User = require('./models/User');
const challengeRoute = require('./routes/challengeRoute');
const survivalRoute = require('./routes/survivalRoute');

app.use(cors());
app.use(express.json());
app.use('/', express.static(__dirname + '/'));
app.use('/', challengeRoute);
app.use('/', survivalRoute);

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

// 현재 버전
app.post('/v100/save/classic', (req, res) => {
  const user = new User();
  for (const [ key, value ] of Object.entries(req.body)) {
    user[key] = value;
  }

  if (user.score <= 0) {
    res.send('fail');
  } else {
    User.find({}, '_id score').sort({ score: -1, createdAt: 1 })
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
            new Promise(resolve => resolve(User.deleteOne({ _id }))),
          ])
          .then(() => console.log(`_id ${_id}, score ${score} document 삭제됨`));
        }
      })
      .then(() => res.send('success'))
      .then(() => console.log(`name: ${user.name}, score: ${user.score}, stage: ${user.stage}`))
      .catch(console.error);
  }
});

// 현재 버전
app.get('/v100/leaderboard/classic', (req, res) => {
  User.find({}, '-_id name score stage')
    .sort({ score: -1, createdAt: 1 }).exec()
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