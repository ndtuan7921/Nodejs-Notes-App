const db = require("../config/db");
class NoteController {
  // GET /note/:slug
  show(req, res) {
    res.send("NOTE DETAIL");
  }
}

module.exports = new NoteController();
