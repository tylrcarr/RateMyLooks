module.exports = function (server, db) {	

	const temp = require('short-unique-id');
	const UID = new temp();

	const sharp = require("sharp");

	const fs = require("fs");

	const Boom = require("Boom");

	const toBuffer = require('data-uri-to-buffer');

	function generateImage (file, isOf) {
		const filename = UID.randomUUID(10) + ".png";
		const dir = __dirname + "/../public/images/" + filename;
		console.log(dir);
		sharp(file).resize(480, 640).toFile(dir).then(info => {
			console.log(info);
			db.image.create({ userId: isOf, img: filename });
		}).catch(err => {console.log(err); throw err;});


	}
	server.route({
		method: "POST",
		path: "/users/photos",
		config: {
			payload: {
				output: "stream",
				parse: true,
				allow: "multipart/form-data",
				maxBytes: 2 * 1000 * 1000
			}
		},
		handler: function (req, h) {
			if (req.auth.credentials) {
				let result = [];
				try {
					generateImage(toBuffer(req.payload.file), req.auth.credentials);
				} catch (err) {
					return Boom.badRequest("Bad request, try again.");
				}
				return result;
			} else { return Boom.unauthorized("Not logged in!!"); }
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
