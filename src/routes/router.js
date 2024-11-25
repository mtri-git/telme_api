const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');

const defaultRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  }
]

function registerRoutes(fastify) {
  defaultRoutes.forEach((route) => {
    fastify.register(route.route, { prefix: route.path });
  });
}


module.exports = registerRoutes;