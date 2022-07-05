import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import {
  loginValidation,
  registerValidation,
  notesCreateValidation,
} from "./validations/validations.js";
import checkAuth from "./utils/checkAuth.js";
import { getMe, login, register } from "./controllers/UserController.js";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "./controllers/NotesController.js";
import handleValidErrors from "./utils/handleValidErrors.js";

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.ma431.mongodb.net/notes?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB OK"))
  .catch(() => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.post("/auth/login", loginValidation, handleValidErrors, login);
app.post("/auth/register", registerValidation, handleValidErrors, register);
app.get("/auth/me", checkAuth, getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/notes", getAll);
app.get("/notes/:id", getOne);
app.delete("/notes/:id", checkAuth, remove);
app.patch(
  "/notes/:id",
  checkAuth,
  notesCreateValidation,
  handleValidErrors,
  update
);
app.post("/notes", checkAuth, notesCreateValidation, handleValidErrors, create);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("OK");
});
