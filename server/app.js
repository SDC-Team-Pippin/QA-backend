const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const client = require('../db/index.js');
const { getAll, getOne, getStyles, getRelated } = require('./helpers.js');

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.get('/products', getAll);
app.get('/products/:product_id', getOne);
app.get('/products/:product_id/styles', getStyles);
app.get('/products/:product_id/related', getRelated);


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});