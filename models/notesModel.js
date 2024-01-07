const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  notes: [
    {
      title: {
        type: String,
        required: true,
      },
      note: {
        type: String,
        required: true,
      },
    },
  ],
});

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;
