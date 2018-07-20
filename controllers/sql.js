require('dotenv').config()

const Sequelize = require('sequelize');

const sql = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
	host: 'localhost',
	dialect: 'mysql',

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},

	operatorsAliases: false
});

sql.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});
module.exports = {
	Sequelize: Sequelize,
	sql: sql,
	user: require("../models/user")(sql),
	rating: require("../models/rating")(sql),
	image: require("../models/image")(sql)
};
