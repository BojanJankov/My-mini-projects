import express from "express";
import { globalRouter } from "./src/const/router.const.js";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.use(express.json());

app.use("/api", globalRouter);

app.listen(PORT, HOST, () => {
  console.log(`Server is up and working od ${PORT}`);
});
