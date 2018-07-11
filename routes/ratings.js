module.exports = function (server, db) {	
	server.route({
		method: "POST",
		path: "/ratings",
		handler: function (req, h) {
			console.log(req.payload);
			// TODO update the rater when the user system is implemented
			return db.rating.create({
				rater: req.payload.rater,
				ratee: req.payload.ratee,
				rating: req.payload.rating
			}).then(ratings => {console.log(ratings); return ratings; }).catch(function (err) { console.log(err); return err;});
		}

	});
	server.route({
		method: "GET",
		path: "/users/{id}/ratings",
		handler: function (req, h) {
			console.log(req.params.id);
			return db.rating.findAll({ where: {ratee: req.params.id}}).then(ratings => {
				return ratings;
			}).catch(function(err) {console.log(err); return err});
		}

	});
	server.route({
		method: "GET",
		path: "/users/{id}/ratings/average",
		handler: function (req, h) {//
			return db.sql.query('SELECT AVG(ratings.rating) FROM ratings WHERE ratings.ratee = ?', 
				{ replacements: [req.params.id], type: db.sql.QueryTypes.SELECT }).then(user => { return user[0][Object.keys(user[0])[0]]; });
		}

	});
	server.route({
		method: "GET",
		path: "/users/{id}/ratings/gender/{gender}",
		handler: function (req, h) {
			const temp = db.sql.query('SELECT AVG(ratings.rating) FROM ratings INNER JOIN users ON ratings.rater = users.id AND users.gender = ? AND ratings.ratee = ?', 
				{ replacements: [req.params.gender, req.params.id], type: db.sql.QueryTypes.SELECT }).then(user => { return user[0][Object.keys(user[0])[0]]; });
			console.log(temp);
			return temp;
		}

	});
	server.route({
		method: "GET",
		path: "/users/{id}/ratings/race/{race}",
		handler: function (req, h) {//AVG(ratings.rating)
			return db.sql.query('SELECT AVG(ratings.rating) FROM ratings INNER JOIN users ON ratings.rater = users.id AND users.race = ? AND ratings.ratee = ?', 
				{ replacements: [req.params.race, req.params.id], type: db.sql.QueryTypes.SELECT }).then(user => { return user[0][Object.keys(user[0])[0]]; }).catch(function(err) {console.log(err); return err});
		}

	});
	server.route({
		method: "GET",
		path: "/users/{id}/ratings/height/{min}/{max}",
		handler: function (req, h) {
			return db.sql.query('SELECT AVG(ratings.rating) FROM ratings INNER JOIN users ON ratings.rater = users.id AND users.height > ? AND users.height < ? AND ratings.ratee = ?', 
				{ replacements: [req.params.min, req.params.max, req.params.id], type: db.sql.QueryTypes.SELECT }).then(user => { return user[0][Object.keys(user[0])[0]]; });
		}

	});


}
