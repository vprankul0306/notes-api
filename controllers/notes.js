const Note = require("../models/notesModel");
const User = require("../models/userModel");

const getNotes = async (req, res) => {
  try {
    const userId = req.id;
    const notes = await Note.findOne({ userId });

    return res.status(200).json({ notes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getNoteById = async (req, res) => {
  try {
    const userId = req.id;
    const { id } = req.params;
    const notes = await Note.findOne({ userId });
    const note = notes.notes.find((note) => note._id == id);
    return res.status(200).json({ note });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const createNote = async (req, res) => {
  try {
    const { title, note } = req.body;

    if (!title || !note) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const userId = req.id;
    const user = await User.findOne({ _id: userId });
    if (userId && user) {
      const noteExists = await Note.findOne({ userId });
      if (noteExists) {
        noteExists.notes.push({
          title,
          note,
        });
        await noteExists.save();
        return res.status(200).json({ message: "Note created successfully" });
      } else {
        const newNote = new Note({
          userId: userId,
          notes: {
            title,
            note,
          },
        });

        await newNote.save();

        return res.status(200).json({ message: "Note created successfully" });
      }
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, note } = req.body;

    if (!title || !note) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const userId = req.id;
    const user = await User.findOne({ _id: userId });
    if (userId && user) {
      const noteExists = await Note.findOne({ userId });
      if (noteExists) {
        const currNote = noteExists.notes.find((note) => note._id == id);
        if (currNote) {
          currNote.title = title;
          currNote.note = note;
          await noteExists.save();
          return res.status(200).json({ message: "Note updated successfully" });
        } else {
          return res.status(400).json({ message: "Note not found" });
        }
      } else {
        return res.status(400).json({ message: "Note not found" });
      }
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteNoteById = async (req, res) => {
  const { id } = req.params;
  const userId = req.id;
  const user = await User.findOne({ _id: userId });

  if (userId && user) {
    const noteExists = await Note.findOne({ userId });
    if (noteExists) {
      const currNote = noteExists.notes.find((note) => note._id == id);
      if (currNote) {
        currNote.deleteOne();
        await noteExists.save();
        return res.status(200).json({ message: "Note deleted successfully" });
      } else {
        return res.status(400).json({ message: "Note not found" });
      }
    }
  }
};

module.exports = {
  getNotes,
  createNote,
  getNoteById,
  editNoteById,
  deleteNoteById,
};
