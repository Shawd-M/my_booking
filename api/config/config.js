require("dotenv").config();
module.exports = {
  development: {
    url: process.env.DB,
    dialect: "mysql",
    define: {
      timestamps: true,
    },
  },
};
