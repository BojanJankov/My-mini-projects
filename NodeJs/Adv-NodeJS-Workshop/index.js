import "dotenv/config";
import express from "express";
import { globalRouter } from "./src/const/global.const.js";
import mongoose from "mongoose";

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority&appName=Cluster0`;

const app = express();

app.use(express.json());

app.use("/api", globalRouter);

app.listen(process.env.PORT, process.env.HOST, async () => {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");
  console.log("Server is up and working");
});
