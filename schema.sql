DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS features CASCADE;
DROP TABLE IF EXISTS related CASCADE;
DROP TABLE IF EXISTS styles CASCADE;
DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS skus CASCADE;

-- drop temps
DROP TABLE IF EXISTS products_temp;
DROP TABLE IF EXISTS features_temp;
DROP TABLE IF EXISTS related_temp;
DROP TABLE IF EXISTS styles_temp;
DROP TABLE IF EXISTS photos_temp;
DROP TABLE IF EXISTS skus_temp;



CREATE TABLE products (
  id INT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  slogan VARCHAR(1000) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  category VARCHAR(255) NOT NULL,
  defauLt_price VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE related (
  id INT GENERATED ALWAYS AS IDENTITY,
  product_id INT,
  related_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (related_id) REFERENCES products(id)
);

CREATE TABLE features (
  feature_id INT GENERATED ALWAYS AS IDENTITY,
  product_id INT,
  feature VARCHAR(255),
  value VARCHAR(255),
  PRIMARY KEY(feature_id),
  FOREIGN KEY(product_id) REFERENCES products(id)
);

CREATE TABLE styles (
  style_id INT GENERATED ALWAYS AS IDENTITY,
  product_id INT,
  name VARCHAR(255) NOT NULL,
  sale_price VARCHAR(255) Default Null,
  original_price INT NOT NULL,
  default_style BOOLEAN,
  PRIMARY KEY(style_id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE photos (
  id INT GENERATED ALWAYS AS IDENTITY,
  style_id INT,
  thumbnail_url VARCHAR,
  url VARCHAR,
  PRIMARY KEY(id),
  FOREIGN KEY (style_id) REFERENCES styles(style_id)
);

CREATE TABLE skus (
  id INT GENERATED ALWAYS AS IDENTITY,
  styles_id INT,
  size VARCHAR(50),
  quantity INT,
  PRIMARY KEY(id),
  FOREIGN KEY (styles_id) REFERENCES styles(style_id)
);

-- temp tables
CREATE TABLE products_temp (
  product_id INT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  slogan VARCHAR(1000) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  category VARCHAR(255) NOT NULL,
  defauLt_price VARCHAR(255) NOT NULL
);

CREATE TABLE related_temp (
  id INT GENERATED ALWAYS AS IDENTITY,
  product_id INT,
  related_id INT
);

CREATE TABLE features_temp (
  feature_id INT GENERATED ALWAYS AS IDENTITY,
  product_id INT,
  feature VARCHAR(255),
  value VARCHAR(255)
);

CREATE TABLE styles_temp (
  style_id INT GENERATED ALWAYS AS IDENTITY,
  product_id INT,
  name VARCHAR(255) NOT NULL,
  sale_price INT,
  original_price INT NOT NULL,
  default_price BOOLEAN
);

CREATE TABLE photos_temp (
  id INT GENERATED ALWAYS AS IDENTITY,
  style_id INT,
  thumbnail_url VARCHAR,
  url VARCHAR
);

CREATE TABLE skus_temp (
  id INT GENERATED ALWAYS AS IDENTITY,
  styles_id INT,
  quantity INT,
  size INT
);
