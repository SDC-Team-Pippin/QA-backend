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
      client.query(`SELECT feature, value FROM features WHERE product_id = ${req.params.product_id}`)
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
  client.query('select s.style_id, s.name, s.sale_price, s.original_price, s.default_style as default, (select json_agg(skus) as skus from skus where s.style_id = skus.styles_id),  (select json_agg(p) as photos from (select photos.thumbnail_url, photos.url from photos where photos.style_id = s.style_id) as p) from styles as s where product_id = 1;')
  // client.query('select string_agg(sku_id || \',\' || skus, \',\') s from (select id as sku_id, row_to_json(skus) as skus from skus where styles_id = 1) as sku')
    .then((products) => {
      let styles = products.rows;

      for (var i = 0; i < styles.length; i++) {
        let skus = styles[i].skus;
        let skuNew = {};

        for (var j = 0; j < skus.length; j++) {
          skuNew[skus[j].id] = {
            size: skus[j].size,
            quantity: skus[j].quantity
          };
        }
        skus = skuNew;
        styles[i].skus = skuNew;
      }
      res.status(200).json(styles);
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