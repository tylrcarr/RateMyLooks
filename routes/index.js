module.exports = function (server, db) {	
	const bcrypt = require("bcrypt");

	const Boom = require("boom");
	const Path = require('path');

	server.route({
		method:'GET',
		path:'/settings',
		config: {
			auth: false,
			plugins: { 
				'hapi-auth-cookie': { 
					redirectTo: false 
				} 
			}
		},
		handler: function(request,h) {
			return h.redirect("/");
		}
	});

	server.route({
		method:'GET',
		path:'/home',
		config: {
			auth: false,
			plugins: { 
				'hapi-auth-cookie': { 
					redirectTo: false 
				} 
			}
		},
		handler: function(request,h) {
			return h.redirect("/");
		}
	});

	server.route({
		method:'GET',
		path:'/login',
		config: {
			auth: false,
			plugins: { 
				'hapi-auth-cookie': { 
					redirectTo: false 
				} 
			}
		},
		handler: function(request,h) {
			return h.redirect("/");
		}
	});

	/*
	server.route({
		method:'GET',
		path:'/',
		config: {
			auth: false,
			plugins: { 
				'hapi-auth-cookie': { 
					redirectTo: false 
				} 
			}
		},
		handler: function(request,h) {
			return h.file("index.html");
		}
	});
	*/

	server.route({
		method: "POST",
		path: "/login",
		config: {
			auth: { mode: 'try' }, 
			plugins: { 
				'hapi-auth-cookie': { 
					redirectTo: false 
				} 
			}
		},
		handler: async function (req, h, next) {
			return db.user.findOne({attributes: ['email', 'pass', 'id'], where: {email: req.payload.email}}).then(user => {
				return bcrypt.compare(req.payload.pass, user.pass).then(async function (res) { 
					if (res) {
						let sid = "";
						const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
						console.log(user.id);

						for (var i = 0; i < 7; i++) {
							sid += possible.charAt(Math.floor(Math.random() * possible.length));
						}
						const account = user.id
						await req.server.app.cache.set(sid, { account }, 0);
						req.cookieAuth.set({ sid });
						return h.redirect("/");
					} else {
						return Boom.unauthorized("Bad email or password!");
					}
				}).catch(err => { 
					return Boom.unauthorized("Bad email or password!");
				});
			}).catch(err => {
				return Boom.badImplementation();
			});
		}
	});

	server.route({
		method: "GET",
		path: "/logout",
		handler: async function (req, h, next) {
			req.server.app.cache.drop(req.state['RateMyLooks'].sid);
			req.cookieAuth.clear();
			return h.redirect('/');
		}
	});

	server.route({
		method: "GET",
		path: "/checkAuth",
		config: {
			auth: false
		},
		handler: async function (req, h, next) {
			if (req.state['RateMyLooks'] === undefined) {
				return 0;
			}
			const cached = await req.server.app.cache.get(req.state['RateMyLooks'].sid);
			const out = {
				valid: !!cached
			};
			return (out.valid ? 1 : 0);
		}
	});
}
