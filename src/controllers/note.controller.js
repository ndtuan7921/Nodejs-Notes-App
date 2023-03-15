const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
class NoteController {
  // POST /note/store
  store(req, res) {
    const idnote = uuidv4();
    const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
    db.query(
      `INSERT INTO note (idnote, title, content, createdAt) VALUES ('${idnote}','${req.body.title}', '${req.body.content}','${createdAt}')`,
      (err, result) => {
        if (err) throw err;
        res.redirect("/dashboard");
      }
    );
  }

  // GET /:id/edit
  edit(req, res) {
    const idnote = req.params.id;
    db.query(
      `SELECT * FROM NOTES_APP.NOTE WHERE idnote = '${idnote}'`,
      (err, result) => {
        if (err) throw err;
        res.render("../views/dashboard/edit.hbs", result[0]);
      }
    );
  }

  // UPDATE
  update(req, res) {
    const idnote = req.params.id;
    const newTitle = req.body.title;
    const newContent = req.body.content;
    const updatedAt = new Date().toISOString().slice(0, 19).replace("T", " ");
    db.query(
      `UPDATE NOTES_APP.NOTE SET
      title='${newTitle}',
      content='${newContent}',
      createdAt='${updatedAt}' WHERE idnote='${idnote}';`,
      (err, result) => {
        if (err) throw err;
        res.redirect("/dashboard");
      }
    );
  }
}

module.exports = new NoteController();
