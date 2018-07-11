module.exports = function (sql) { 

	const Sequelize = require('sequelize');

	const RatingModel = {
		rater: {
			type: Sequelize.CHAR(18),
			allowNull: false,
			references: 'users',
			referencesKey: 'id'
		},
		ratee: {
			type: Sequelize.CHAR(18),
			allowNull: false,
			references: 'users',
			referencesKey: 'id'
		},
		rating: {
			type: Sequelize.FLOAT(2, 1),
			allowNull: false,
			validation: {
				min: 1,
				max: 10
			}
		}


	}

	const Rating = sql.define("ratings", RatingModel, {
	    indexes: [
	        {
	            unique: true,
	            fields: ['rater', 'ratee']
	        }
	    ]
	});
	Rating.removeAttribute('id');
	return Rating;

}
