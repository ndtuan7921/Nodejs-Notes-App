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

// module.exports = validatePassword = async (email, password) => {
//   const user = getUserByEmail(email);

//   const validPassword = await bcrypt.compare(password, user.password);

//   if (validPassword) return true;
//   return false;
// };

// module.exports = deleteUserById = (id) => {
//   db.query(
//     `delete * from notes_app.users where userID = '${id}'`,
//     (error, result) => {
//       if (error) return error;
//       return;
//     }
//   );
// };
// module.exports = updateUserById = async (id, value) => {
//   const { username, email, password } = value;
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);
//   db.query(
//     `UPDATE notes_app.users SET username='${username}', email='${email}', password='${hashedPassword}' WHERE userID = '${id}'`,
//     (error, result) => {
//       if (error) return error;
//       return;
//     }
//   );
// };
