const passwordReg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const usernameReg =
  /^(?![_.])(?!.*[._]{2})(?!.*[._]$)(?=.*[A-Za-z])[A-Za-z0-9._]{6,15}$/;

const nameReg = /^(?!.*\s{2})[A-Za-z\s]{3,35}$/;

export { emailReg, passwordReg, usernameReg, nameReg };
