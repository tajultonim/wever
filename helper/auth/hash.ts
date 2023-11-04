import bcrypt from "bcrypt";

async function createHash(password) {
  return await bcrypt.hash(password, 10);
}

async function compareHash(password, hash) {
  return await bcrypt.compare(password, hash);
}

export { createHash, compareHash };
