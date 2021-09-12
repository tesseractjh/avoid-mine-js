const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: 'variables.env' });
const app = express();
const PORT = process.env.PORT || 5000;
const User = require('./User');
const Log = require('./Log');

app.use(cors());
app.use(express.json());
app.use('/', express.static(__dirname + '/'));

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, err => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected to database successfully');
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
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

app.post('/leaderboard', (req, res) => {
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
      .catch(console.error);
  }

});

app.get('/leaderboard/:page', (req, res) => {
  const { page } = req.params;
  const [ start, end ] = [ (page - 1) * 10 + 1, page * 10 ];
  User.find({ ranking: { $gte: start, $lte: end } }, '-_id ranking name score rank stage')
    .sort({ ranking: 1 }).exec()
    .then(users => res.json(users))
    .catch(console.error);
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});