module.exports = function (server, db) {	

	const temp = require('short-unique-id');
	const UID = new temp();

	const sharp = require('sharp');

	const fs = require("fs");

	const Boom = require("Boom");

	function generateImage (file, isOf, result) {
		result.push(file.hapi);
		console.log(file._data);
		let ext = file.hapi.headers["content-type"];
		const filename = UID.randomUUID(10) + "." + ext.substr(ext.lastIndexOf('/') + 1);
		const dir = __dirname + "/../public/images/" + filename;
		sharp(file._data).resize(480, 640).toFile(dir).then(info => {
			db.image.create({ userId: isOf, img: filename });
		}).catch(err => {console.log(err)});


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
				if (req.payload.file.length !== undefined){
					for(let i = 0; i < req.payload["file"].length; i++) {
						generateImage(req.payload.file[i], req.auth.credentials, result);
					}
				} else {
					generateImage(req.payload.file, req.auth.credentials, result);
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
