const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config()

const basename = path.basename(__filename);
const config = require('../config/config');

const db = {};
const databases = Object.keys(config);

databases.forEach((database) => {
  const dbPath = config[database];
  db[database] = new Sequelize(dbPath.url, dbPath);

  db[database].dialect.supports.schemas = true;
  fs
    .readdirSync(`${__dirname}`)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
      const model = require(path.join(`${__dirname}`, file))(db[database], Sequelize.DataTypes);
      db[model.name] = model;
    });
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
