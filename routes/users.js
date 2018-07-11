module.exports = function (server, db) {	
	const temp = require('short-unique-id');
	const UID = new temp();
	server.route({
		method: "GET",
		path: "/users",
		handler: function (req, h) {
			return db.user.findAll().then(users => { return users; });
		}
	});

	server.route({
		method: "POST",
		path: "/users",
		handler: function (req, h) {
			const uid = UID.randomUUID(18);
			console.log(uid);
			return db.user.create({
				id: uid,
				email: req.payload.email,
				race: req.payload.race,
				height: req.payload.height,
				gender: req.payload.gender,
				birthday: req.payload.birthday,
				preference: req.payload.preference
			}).then(users => {console.log(users); return users; }).catch(function (err) { console.log(err); return err;});
		}
	});

	server.route({
		method: "GET",
		path: "/users/{user}",
		handler: function (req, h) {
			return db.user.findOne({ where: {id: req.params.user}}).then(users => { return users; });
		}

	});
}
