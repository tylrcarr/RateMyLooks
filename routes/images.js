module.exports = function (server, db) {	

	const temp = require('short-unique-id');
	const UID = new temp();

	const fs = require("fs");

	const Boom = require("Boom");

	server.route({
		method: "POST",
		path: "/users/{id}/photos",
		config: {
			payload: {
				output: "stream",
				parse: true,
				allow: "multipart/form-data",
				maxBytes: 2 * 1000 * 1000
			}
		},
		handler: function (req, h) {
			if (req.params.id === req.auth.credentials) {
				let result = [];
				const num = (typeof req.payload["file"].length === undefined ? 1 : req.payload["file"].length);
				for(let i = 0; i < req.payload["file"].length; i++) {
					result.push(req.payload["file"][i].hapi);
					let ext = req.payload["file"][i].hapi.headers["content-type"];
					const filename = UID.randomUUID(10) + "." + ext.substr(ext.lastIndexOf('/') + 1);
					req.payload["file"][i].pipe(fs.createWriteStream(__dirname + "/../public/images/" + filename))
					db.image.create({
						userId: req.auth.credentials,
						img: filename
					});
				}
				return result;
			} else { return Boom.unauthorized("Not your account!"); }
		}
	});

	server.route({
		method: "GET",
		path: "/users/{id}/photos",
		handler: function (req, h) {
			return db.image.findAll({where: {userId: req.params.id}, attributes: ["img"]}).then(res => {
				let ret = [];
				for (let i = 0; i < res.length; i++) {
					ret.push(res[i].img);
				}
				return ret;
			})
		}
	});

	server.route({
		method: "GET",
		path: "/images/{param*}",
		handler: {
			directory: {
				path: "./public/images"
			}
		}
	});

}
