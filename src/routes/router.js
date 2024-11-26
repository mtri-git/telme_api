const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const roomRoutes = require('./room.route');

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/rooms',
    route: roomRoutes,
  },
]

function registerRoutes(fastify) {
  defaultRoutes.forEach((route) => {
    fastify.register(route.route, { prefix: route.path });
  });
}


module.exports = registerRoutes;