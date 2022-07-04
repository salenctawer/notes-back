import NotesModel from "../models/Notes.js";

export const create = async (req, res) => {
  try {
    const doc = new NotesModel({
      title: req.body.title,
      text: req.body.text,
      important: req.body.important,
      deadline: req.body.deadline,
      user: req.userId,
    });
    const notes = await doc.save();

    res.json(notes);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать событие",
    });
  }
};
