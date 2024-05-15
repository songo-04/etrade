import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { MONGO_URI, PORT } from "./config.mjs";
import route_user from "./route/user.mjs";
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/auth", route_user);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
