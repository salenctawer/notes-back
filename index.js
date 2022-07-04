import express from "express";
import mongoose from "mongoose";
import { registerValidation } from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";
import { getMe, login, register } from "./controllers/UserController.js";

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.ma431.mongodb.net/notes?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB OK"))
  .catch(() => console.log("DB error", err));

const app = express();

app.use(express.json());

app.post("/auth/login", login);

app.post("/auth/register", registerValidation, register);

app.get("/auth/me", checkAuth, getMe);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("OK");
});
