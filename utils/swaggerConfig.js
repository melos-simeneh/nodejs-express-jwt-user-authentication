const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Authentication API",
      version: "1.0.0",
      description: "A simple RESTful API for user authentication using JWT",
    },
  },
  apis: ["./routes/userRoutes.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

const swaggerMiddleware = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = swaggerMiddleware;
