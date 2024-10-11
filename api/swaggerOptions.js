const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TIC-CLO API',
      version: '1.0.0',
      description: 'Description de votre API',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Remplacez par le format de votre token (par ex. JWT)
        },
      },
    },
    security: [{
      bearerAuth: [] // Ajoutez cette ligne pour activer le support du Bearer Token
    }],
    servers: [
      {
        url: 'http://localhost:8080/api', // L'URL de votre serveur
      },
    ],
  },
  apis: ['./components/swagger/*.yaml'], // Les fichiers où se trouvent vos commentaires Swagger
};

module.exports = swaggerOptions;
