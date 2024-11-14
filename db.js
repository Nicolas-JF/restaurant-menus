const { Sequelize } = require('sequelize');
const path = require('path');

// Create a new Sequelize instance and connect to the database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'), // Path to the database file
});

// Export the Sequelize instance for use in models
module.exports = { sequelize };
