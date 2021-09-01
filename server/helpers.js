const client = require('../db/index.js');

const getAll = (req, res) => {
  let page = req.query.page;
  let count = req.query.count;
  client.query(`SELECT * FROM products where id <= ${count}`, (err, result) => {
    if (err) {
      throw err;
    }
    //change product_id to id
    let test = result.rows;
    res.status(200).json(test);
  });
};

const getOne = (req, res) => {
  client.query(`SELECT * FROM products WHERE id = ${req.params.product_id}`)
    .then((product) => {
      client.query(`SELECT feature, value FROM features WHERE product_id = ${req.params.product_id}`)
        .then((features) => {
          product.rows[0].features = features.rows;
          res.status(200).json(product.rows[0]);
        })
        .catch((err) => { throw err; });
    })
    .catch((err) => { throw err; });
};

const getStyles = (req, res) => {
  let id = Number(req.params.product_id);

  //styles with sku data
  client.query(`select s.style_id, s.name, s.sale_price, s.original_price, s.default_style as default, (select json_agg(skus) as skus from skus where s.style_id = skus.styles_id), (select json_agg(p) as photos from (select photos.thumbnail_url, photos.url from photos where photos.style_id = s.style_id) as p) from styles as s where product_id = ${id};`)
    .then((products) => {
      let styles = products.rows;

      for (var i = 0; i < styles.length; i++) {
        let skus = styles[i].skus;
        let skuNew = {};

        if (skus) {
          for (var j = 0; j < skus.length; j++) {
            skuNew[skus[j].id] = {
              size: skus[j].size,
              quantity: skus[j].quantity
            };
          }
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

module.exports = {
  getAll,
  getOne,
  getStyles,
  getRelated
};