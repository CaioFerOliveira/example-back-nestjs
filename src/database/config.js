const { db } = require('../../config/config');
const config = {
  development: {
    dialect: db.dialect,
    url: db.url,
  },
};

module.exports = config;
