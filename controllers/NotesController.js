import NotesModel from "../models/Notes.js";

export const getAll = async (req, res) => {
  try {
    const notes = await NotesModel.find().populate("user").exec();
    res.json(notes);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать событие",
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const notesId = req.params.id;
    NotesModel.findById(notesId, (err, doc) => {
      if (err) {
        console.log(err);
      }
      if (!doc) {
        return res.status(404).json({
          message: "Заметка не найдена",
        });
      }
      res.json(doc);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Заметка не найдена",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const notesId = req.params.id;
    NotesModel.findOneAndDelete(
      {
        _id: notesId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: "Не удалось удалить заметку",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "Заметка не найдена",
          });
        }
        res.json({
          success: true,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось удалить заметку",
    });
  }
};

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

export const getNotesUser = async (req, res) => {
  try {
    const userId = req.params.id;
    NotesModel.find({ user: userId }, (err, doc) => {
      if (err) {
        console.log(err);
      }
      if (!doc) {
        return res.status(404).json({
          message: "Заметка не найдена",
        });
      }
      res.json(doc);
    }).populate("user");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Заметка не найдена",
    });
  }
};

export const update = async (req, res) => {
  try {
    const notesId = req.params.id;
    await NotesModel.updateOne(
      {
        _id: notesId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        important: req.body.important,
        deadline: req.body.deadline,
        user: req.userId,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить заметку",
    });
  }
};
