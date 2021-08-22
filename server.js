const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('listening on 8080');
});

app.use('/', express.static(__dirname + '/'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});