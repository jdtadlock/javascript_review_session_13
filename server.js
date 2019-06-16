const express = require('express');
const axios = require('axios');
const { api_key } = require('./config');
const PORT = 5000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/gif', (req, res) => {
  axios.get(`https://api.giphy.com/v1/gifs/search?q=${req.query.search}&api_key=${api_key}`)
    .then(response => {
      const images = response.data.data;

      res.send(images);
    });
});


app.listen(PORT, () => console.log('Listening %s port %s', 'on', PORT));























// const data = {
//   identifier: 'JD'
// };


// const { identifier } = data;

// console.log(identifier);