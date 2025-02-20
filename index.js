const express = require("express");
const userRoutes = require("./routes/userRoutes");
const morgan = require("morgan");
const swaggerMiddleware = require("./utils/swaggerConfig");

const app = express();

app.use(express.json());
app.use(morgan("combined"));

swaggerMiddleware(app);

app.use("/api", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(
    `Swagger documentation available at http://localhost:${PORT}/docs`
  );
});
