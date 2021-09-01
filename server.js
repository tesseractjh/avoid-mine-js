const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

app.use('/', express.static(__dirname + '/'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});