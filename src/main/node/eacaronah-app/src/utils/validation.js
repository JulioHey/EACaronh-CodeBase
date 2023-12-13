
const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
}

const isEmpty = (string) => {
  return string.trim() === "";
}

export { isValidEmail, isEmpty }
