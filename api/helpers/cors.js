const cors = require('cors');
const { GeneralError } = require('./errors');

const allowedOrigins = [
  'http://127.0.0.1:3000',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5000',
  'http://localhost:8080'
];

/**
 * Gestion des cors origine: autorisation d'accès à l'API
 * @type {*|corsMiddleware}
 */
const corsOptions = cors({
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      return callback(null, true);
    }
    const msg = 'The CORS policy for this site does not '
      + 'allow access from the specified Origin.';
    return callback(new GeneralError(msg, 500), false);
  },
  exposedHeaders: ['*'],
});

module.exports = corsOptions;
