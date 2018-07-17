module.exports = function (sql) { 

	const Sequelize = require('sequelize');

	const UserModel = {
		id: {
			type: Sequelize.CHAR(18),
			unique: true,
			primaryKey: true,
			allowNull: false
		},
		pass: { 
			type: Sequelize.CHAR(60).BINARY,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING(18),
			unique: true,
			allowNull: false
		},
		race: {
			type: Sequelize.ENUM('white', 'black', 'asian', 'hispanic', 'pacific')
		},
		height: {
			type: "TINYINT",
			allowNull: false,
			validate: {
				min: 16
			}
		},
		gender: {
			type: Sequelize.ENUM('m', 'f'),
			allowNull: false
		},
		birthday: {
			type: Sequelize.DATE
		},
		preference: {
			type: Sequelize.ENUM('m', 'f'),
			allowNull: false
		}


	}

	return sql.define("users", UserModel);

}
