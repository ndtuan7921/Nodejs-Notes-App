const db = require("../config/database");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

// user actions
const createUser = async (email, password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    userID: uuidv4(),
    email: email,
    username: email.substring(0, email.indexOf("@")),
    password: hashedPassword,
  };
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO users SET ?`, newUser, (err, result) => {
      err && reject(new Error(err));
      resolve(newUser);
    });
  });
};

const getUserByEmail = async (email) => {
  const SQL = `SELECT * FROM notes_app.users WHERE email = '${email}'`;
  return new Promise((resolve, reject) => {
    db.query(SQL, (err, result) => {
      err && reject(new Error(err));
      resolve(result);
    });
  });
};

const getUserByID = async (id) => {
  const SQL = `SELECT * FROM notes_app.users WHERE userID = '${id}'`;
  return new Promise((resolve, reject) => {
    db.query(SQL, (err, result) => {
      err && reject(new Error(err));
      resolve(result);
    });
  });
};
module.exports = { createUser, getUserByEmail, getUserByID };
