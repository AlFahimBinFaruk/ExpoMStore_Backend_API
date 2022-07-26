import express, { ErrorRequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { DB, PORT } from "./config";
import { errorHandler } from "./middleware/errorHandler";
import routes from "./routes";
import morgan from "morgan";
import cors from "cors";
const app = express();

//Initialize common middlewares
app.use([
  express.json(),
  express.urlencoded({ extended: true }),
  cors(),
  morgan("dev"),
  routes,
]);

//health route
app.use("/health", (req, res) => {
  res.status(200).json({ msg: "API In Live!!" });
});

//Error handler
app.use(() => {
  throw createHttpError(404, "Route not found");
});

app.use(errorHandler);

//Connect the DB
mongoose
  .connect(DB)
  .then(() => {
    app.listen(PORT, () => {
      console.log("db connected app live on port =>", PORT);
    });
  })
  .catch(() => {
    throw createHttpError(501, "Unable to connect database");
  });
