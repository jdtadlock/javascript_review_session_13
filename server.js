const express = require('express');
const axios = require('axios');
const exphbs = require('express-handlebars');
const { api_key } = require('./config');
const { Author, Book, sequelize } = require('./models');
const PORT = 5000;

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  Book.findAll({
    include: [Author]
  }).then(books => {
    res.render('index', { book_data: books });
  });
});

app.post('/api/book', (req, res) => {
  const book = req.body.book; // form data

  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}`)
    .then((response) => {
      const info = response.data.items[0].volumeInfo;

      // Create a new book in the table

      Book.create({
        title: info.title,
        description: info.description
      }).then(new_book => {
        res.redirect('/');
      });
    }).catch(err => console.log(err));
});

app.post('/api/author', (req, res) => {
  const author = req.body.author; // form data
  const book_id = req.query.book_id;

  Author.create({
    name: author
  }).then(new_author => {
    Book.findByPk(book_id)
      .then(book => {
        book.addAuthors(new_author)
          .then(() => res.redirect('/'));
      });
  });
});


// Create Table if not already created
sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log('Listening %s port %s', 'on', PORT));
  });
























// axios.get(`https://api.giphy.com/v1/gifs/search?q=${req.query.search}&api_key=${api_key}`)
  //   .then(({ data: { data: images } }) => {
  //     const images = response.data.data;

  //     res.send(images);
  //   });


// const data = {
//   identifier: 'JD'
// };


// const { identifier } = data;

// console.log(identifier);