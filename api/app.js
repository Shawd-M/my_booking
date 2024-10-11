require('dotenv').config();
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swaggerOptions');
const cookieParser = require('cookie-parser');
const app = express()
const fs = require('fs');
const cors = require('./helpers/cors');
const bodyParser = require('body-parser');
// const swaggerUI = require('swagger-ui-express');
// const swaggerDocs = require('./helpers/swagger');
const passport = require('passport');
const handleErrors = require('./middleware/handleErrors');
const { GeneralError } = require('./helpers/errors');

const http = require('http');

const server = http.createServer();

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
require('./helpers/passport');

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

const port = normalizePort(process.env.PORT || 8080);
const middleware = passport.authenticate('jwt', { session: false }, null);

const controllers = fs.readdirSync(`${__dirname}/controllers`);

controllers.forEach((controller) => {
    const name = controller.split('.')[0];
    if (name.includes('auth')) {
      app.use(`/api/${name}`, require(`./controllers/${controller}`)(express(), GeneralError));
    } else {
      app.use(`/api/${name}`, middleware, require(`./controllers/${controller}`)(express(), GeneralError));
    }
  });

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', require('./helpers/not-found')(express(), GeneralError));

app.use(handleErrors);

app.listen(port, () => {
    console.log(`Server listening on the port: ${port}`);
    console.log('url:', `http://localhost:${port}/`);
    console.log('Swagger:', `http://localhost:${port}/api/doc`);
})

// a faire les option et les bookings pour le swagger + gestion des prix