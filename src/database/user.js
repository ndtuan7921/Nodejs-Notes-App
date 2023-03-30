const db = require("../config/database");
const { v4: uuidv4 } = require("uuid");

// user actions
export const createUser = async (user) => {
  const { email, username, password } = user;
  const userID = uuidv4();
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  db.query(
    `INSERT INTO users (userID, email, username, password) VALUES ('${userID}','${email}','${username}','${hashedPassword}')`,
    (error, result) => {
      if (error) return error;
      return;
    }
  );
};

export const getUsers = () => {
  db.query("select * from notes_app.users", (error, result) => {
    if (error) return error;
    return result;
  });
};

export const getUserByEmail = (email) => {
  db.query(
    `SELECT * FROM note_app.users WHERE email = '${email}'`,
    (error, result) => {
      if (error) return error;
      return result;
    }
  );
};

export const getUserByID = (id) => {
  db.query(
    `SELECT * FROM note_app.users WHERE userID = '${id}'`,
    (error, result) => {
      if (error) return error;
      return result;
    }
  );
};

export const validatePassword = async (email, password) => {
  const user = getUserByEmail(email);

  const validPassword = await bcrypt.compare(password, user.password);

  if (validPassword) return true;
  return false;
};

export const deleteUserById = (id) => {
  db.query(
    `delete * from notes_app.users where userID = '${id}'`,
    (error, result) => {
      if (error) return error;
      return;
    }
  );
};
export const updateUserById = async (id, value) => {
  const { username, email, password } = value;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  db.query(
    `UPDATE notes_app.users SET username='${username}', email='${email}', password='${hashedPassword}' WHERE userID = '${id}'`,
    (error, result) => {
      if (error) return error;
      return;
    }
  );
};
