const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const client = require('./db/index.js');
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hi');
});

const getAll = (req, res) => {
  client.query('SELECT * FROM products where id < 6', (err, result) => {
    if (err) {
      throw err;
    }
    //change product_id to id
    let test = result.rows;
    console.log(test);
    res.status(200).json(test);
  });
};
//how to deal with pages and count

const getOne = (req, res) => {
  // console.log(req.params.product_id);
  // client.query(`select * from products left join features on id = product_id where id = ${req.params.product_id}`)
  client.query(`SELECT * FROM products WHERE id = ${req.params.product_id}`)
    .then((product) => {
      client.query(`SELECT * FROM features WHERE product_id = ${req.params.product_id}`)
        .then((features) => {
          // console.log(result.rows);
          // console.log(test.rows);
          product.rows[0].features = features.rows;
          // console.log(result.rows[0]);
          res.status(200).json(product.rows[0]);
        })
        .catch((err) => { throw err; });
    })
    .catch((err) => { throw err; });
};

//NEED TO FINISH
const getStyles = (req, res) => {
  let test = Number(req.params.product_id);

  //styles with sku data
  client.query(` select style_id, name, sale_price, original_price, default_style, size, quantity from styles inner join skus on skus.styles_id = styles.style_id where product_id = ${test}`)
  // client.query(`select style_id, name, sale_price, original_price, default_style from styles where product_id = ${test}`)
    .then((products) => {
      let styles = products.rows;
      console.log(styles);
      // client.query(`select thumbnail_url, url from styles where product_id = ${test}`)
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

const getRelated = (req, res) => {
  client.query(`select related_id from related where product_id = ${req.params.product_id}`)
    .then((related) => {
      let output = [];
      for (let i = 0; i < related.rows.length; i++) {
        output.push(related.rows[i].related_id);
      }
      res.status(200).send(output);
    })
    .catch((err) => { throw err; });
};

//routes
app.get('/products', getAll);
app.get('/products/:product_id', getOne);
app.get('/products/:product_id/styles', getStyles);
app.get('/products/:product_id/related', getRelated);


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});