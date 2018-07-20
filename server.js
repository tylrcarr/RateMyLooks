'use strict';

const Hapi = require('hapi');
const _ = require('lodash');
const pkg = require('./package.json');
const Path = require('path');

const server = new Hapi.Server({
	host: 'localhost', 
	port: 3000

});

const db = require("./controllers/sql.js");

// useful Hapi plugins
// to generate API documentation, use the hapi-swagger plugin
const plugins = [
  require('h2o2'),
  require('inert'),
  require('vision')
];

const options = {
	ops: {
		interval: 1000
	},
	reporters: {
		myConsoleReporter: [{
			module: 'good-squeeze',
			name: 'Squeeze',
			args: [{ log: '*', response: '*' }]
		}, {
			module: 'good-console'
		}, 'stdout'],
		myFileReporter: [{
			module: 'good-squeeze',
			name: 'Squeeze',
			args: [{ ops: '*' }]
		}, {
			module: 'good-squeeze',
			name: 'SafeJson'
		}, {
			module: 'good-file',
			args: ['./test/fixtures/awesome_log']
		}],
		myHTTPReporter: [{
			module: 'good-squeeze',
			name: 'Squeeze',
			args: [{ error: '*' }]
		}]
	}
};

async function start() {
	try {
		await server.register({
			plugin: require('good'),
			options,
		});
		const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
		server.app.cache = cache;
		await server.register(require('hapi-auth-basic'));
		await server.register(require('inert'));
		await server.register(plugins);
		await server.register(require('hapi-auth-cookie'));
		await server.auth.strategy('session', 'cookie', {
			password: process.env.COOKIE_SECRET,
			cookie: 'RateMyLooks', 
			isSecure: false,
			ttl: 24 * 60 * 60 * 1000,
			validateFunc: async (req, session) => {
				
				const cached = await cache.get(session.sid);
				const out = {
					valid: !!cached
				};

				if (out.valid) {
					out.credentials = cached.account;
				}

				return out;

			}
		});
		server.auth.default("session");
		require("./routes/index.js")(server, db);
		require("./routes/users.js")(server, db);
		require("./routes/ratings.js")(server, db);
		require("./routes/images.js")(server, db);
		server.route({
			method:'GET',
			path:'/{param*}',
			config: {
				auth: false,
				plugins: { 
					'hapi-auth-cookie': { 
						redirectTo: false 
					} 
				}
			},
			handler: {
				directory: {
					path: 'public'
				}
			}
		});
		await server.start();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
	console.log('Server running at:', server.info.uri);
};
start();

module.exports = server;
