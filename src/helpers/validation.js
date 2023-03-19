const validateEmail = (email) => {
  if (!email) return "Email is required";
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(String(email).toLowerCase()))
    return "Please enter a valid email";

  return "";
};

const validatePassword = (password) => {
  if (!password) return "Password is required";

  const passw = /^[A-Za-z]\w{7,14}$/;
  if (!passw.test(password))
    return "Password should be more than 7 character and has at least one uppercase letter";

  return "";
};

const validateConfirm = (password, confirm) => {
  if (!confirm) return "Confirm is required";

  if (password && password != confirm) return "Confirm must match!";

  return "";
};

module.exports = { validateEmail, validatePassword, validateConfirm };
