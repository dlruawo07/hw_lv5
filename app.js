const express = require("express");
require("express-async-errors");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");

const indexRouter = require("./routes/index");

const { sequelize } = require("./models/index");

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.json());
app.use(cookieParser());

app.use("/api", indexRouter);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
