require("dotenv").config();
module.exports = {
  PORT: process.env.APP_PORT,
  DB_CONFIG: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
};
