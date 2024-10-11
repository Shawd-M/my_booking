const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_output.json';
const endpointsFiles = ['./app.js']; // Chemin vers le fichier principal de votre application

swaggerAutogen(outputFile, endpointsFiles);
