const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const middlewares = require("./middlewares/errorHandler");
const authMiddleware = require("./middlewares/authMiddleware");

const PORT = process.env.PORT;

const bodyParser = require("body-parser");

const app = express();

app.use(helmet());

app.use(bodyParser.json());

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use(cookieParser());

require("./connection/mongoose");

app.use(authMiddleware);

const userRouter = require("./routes/userRoutes");
const productsRouter = require("./routes/productRoutes");
const userProductRouter = require("./routes/userProductRoute");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/user/products", userProductRouter);

app.use(middlewares.routeNotFound);

app.use(middlewares.errorHandler);

app.listen(PORT, () => {
  console.log("Server is listening at ", PORT);
});

