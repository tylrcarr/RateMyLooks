module.exports = function (sql) { 

	const Sequelize = require('sequelize');

	const ImageModel = {
		userId: {
			type: Sequelize.CHAR(18),
			allowNull: false,
			references: 'users',
			referencesKey: 'id'
		},
		img: { 
			type: Sequelize.CHAR(16),
			allowNull: false
		},
		imgType: {
			type: Sequelize.ENUM('b', 'f'),
			allowNull: true
		}
	}
	const Image = sql.define("images", ImageModel);
	Image.removeAttribute('id');

	return Image;
}
