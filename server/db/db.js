// const Sequelize = require("sequelize");
// const config = require("./config");

// const db = new Sequelize({
//   database: config.database.name,
//   username: config.database.username,
//   password: config.database.password,
//   host: config.database.host,
//   port: config.database.port,
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });

// module.exports = db;

const Sequelize = require('sequelize');
const pkg = require('../../package.json');

// We'll need to reset the database many times while we're testing, and
// it'd be a major bummer if we lost all of the data that we made while
// playing aound with the app in the browser. We'll check to see if the node
// node environment is 'test', in which case we'll use the test database.
// Otherwise, the app connects with the normal database.
const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}_test` : pkg.name;
// console.log(chalk.yellow(`Opening database connection to ${dbName}`));

const db = new Sequelize(`postgres://localhost:5432/${dbName}`, {
  logging: false,
});

module.exports = db;