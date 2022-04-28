import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";

import indexRoutes from "./routes/indexRoutes";
import postsRoutes from "./routes/usersRoutes";
import eventRoutes from "./routes/eventRoutes";
import denunciaRoutes from "./routes/denunciaRoutes";

const MONGO_URI = "mongodb://localhost/tsapi";
mongoose
  .connect(MONGO_URI || process.env.MONGODB_URL)
  .then((db) => console.log("DB is connected"));

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());
app.use(cors());

app.use(indexRoutes);
app.use("/api/users", postsRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/denuncias", denunciaRoutes);

app.listen(app.get("port"), () =>
  console.log("Server listening on port ", app.get("port"))
);
