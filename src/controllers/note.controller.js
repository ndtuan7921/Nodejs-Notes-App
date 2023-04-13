const db = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const { getNoteById, updateNote, deleteNote } = require("../database/note");
class NoteController {
  async edit_get(req, res) {
    const noteID = req.params.id;
    try {
      const note = await getNoteById(noteID);
      if (note.length > 0) {
        res.render("../views/dashboard/edit.hbs", note[0]);
      } else res.send("This note is not available");
    } catch (error) {
      res.send(error);
    }
  }
  async edit_put(req, res) {
    const { title, text } = req.body;
    const noteID = req.params.id;
    try {
      await updateNote(noteID, title, text);
      res.redirect("/dashboard");
    } catch (error) {
      res.render("../views/dashboard/edit.hbs", {
        message: "An error occurred while updating the note",
      });
    }
  }

  async delete(req, res) {
    // console.log(req.params);
    const noteID = req.params.id;
    try {
      await deleteNote(noteID);
      res.redirect("/dashboard");
    } catch (error) {
      res.render("../views/dashboard/edit.hbs", {
        message: "An error occurred while deleting the note",
      });
    }
  }
}

module.exports = new NoteController();
