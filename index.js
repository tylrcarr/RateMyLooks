'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server=Hapi.server({
		port:8000
});


const db = require("./controllers/sql.js");

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
		}, {
			module: 'good-http',
			args: ['http://prod.logs:3000', {
				wreck: {
					headers: { 'x-api-key': 12345 }
				}
			}]
		}]
	}
};


// Add the route
server.route({
	method:'GET',
	path:'/',
	handler: function(request,h) {

			return'hello world';
	}
});

require("./routes/users.js")(server, db);

require("./routes/ratings.js")(server, db);


// Start the server
async function start() {

	try {
		await server.register({
				plugin: require('good'),
				options,
		});
		await server.start();
	}
	catch (err) {
			console.log(err);
			process.exit(1);
	}
	console.log('Server running at:', server.info.uri);
};

start();
