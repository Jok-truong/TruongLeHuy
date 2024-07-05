import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { apiRouter } from "./routes/index.js";

dotenv.config();

const PORT = process.env.PORT;

const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qojhpf7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(MONGODB_URI, {
    autoIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .then(() => main())
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

const app = express();

const main = async () => {
  app.use(express.json());

  app.use("/", apiRouter);

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};
