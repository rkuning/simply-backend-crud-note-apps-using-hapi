require('dotenv').config();
const Hapi = require('@hapi/hapi');
const routes = require('./routes/routes');
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const NODE_ENV = process.env.NODE_ENV;

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    host: NODE_ENV !== 'production' ? HOST : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server already running on ${server.info.uri}`);
};

init();
