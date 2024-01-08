const notesRouter = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  createNote,
  getNotes,
  getNoteById,
  editNoteById,
  deleteNoteById,
} = require("../controllers/notes");

notesRouter.use(isAuthenticated);

notesRouter.get("/api/notes", getNotes);
notesRouter.get("/api/notes/:id", getNoteById);
notesRouter.post("/api/notes", createNote);
notesRouter.put("/api/notes/:id", editNoteById);
notesRouter.delete("/api/notes/:id", deleteNoteById);

module.exports = notesRouter;
