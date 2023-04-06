const db = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getNotesByUserId = (userID) => {
  const SQL = `SELECT * FROM notes_app.notes WHERE userID = '${userID}'`;
  return new Promise((resolve, reject) => {
    db.query(SQL, (err, result) => {
      err && reject(new Error(err));
      resolve(result);
    });
  });
};

const getNoteById = (noteID) => {
  const SQL = `SELECT * FROM notes_app.notes WHERE noteID = '${noteID}'`;
  return new Promise((resolve, reject) => {
    db.query(SQL, (err, result) => {
      err && reject(new Error(err));
      resolve(result);
    });
  });
};

const createNote = (note) => {
  const { userID, title, text } = note;
  const newNote = {
    noteID: uuidv4(),
    userID,
    title,
    text,
    createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
  };
  const SQL = `INSERT INTO notes SET ?`;
  return new Promise((resolve, reject) => {
    db.query(SQL, newNote, (err, result) => {
      err && reject(new Error(err));
      resolve(newNote);
    });
  });
};

const updateNote = async (noteID, title, text) => {
  const SQL = `UPDATE notes_app.notes SET ? WHERE noteID = '${noteID}'`;
  const newNote = {
    title,
    text,
    createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
  };
  return new Promise((resolve, reject) => {
    db.query(SQL, newNote, (err, result) => {
      err && reject(new Error(err));
      resolve(newNote);
    });
  });
};

module.exports = { getNotesByUserId, getNoteById, createNote, updateNote };
