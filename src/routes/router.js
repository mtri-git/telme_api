const userRoutes = require('./user.route');

const defaultRoutes = [
  {
    path: '/users',
    route: userRoutes,
  }
]

function registerRoutes(fastify) {
  defaultRoutes.forEach((route) => {
    fastify.register(route.route, { prefix: route.path });
  });
}


module.exports = registerRoutes;