import { EncryptJWT, JWTPayload, jwtDecrypt, jwtVerify } from "jose";
import { v4 as uuid } from "uuid";
import hkdf from "@panva/hkdf";

interface Context {
  user: { id: string; username: string; name: string };
  roles: string[];
}
interface JwtPayload extends JWTPayload {
  type?: "access-token" | "refresh-token";
  context?: Context;
}

const now = () => Date.now() / 1000;

export async function encode(
  type: "access-token" | "refresh-token",
  context: Context,
  secret?: string
) {
  if (!secret) {
    secret = process.env.AUTH_SECRET as string;
  }
  let payload = {
    type,
    context,
  };
  let encryptionSecret = await getDerivedEncryptionKey(secret);
  let jwt = await new EncryptJWT(payload)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setJti(uuid())
    .setExpirationTime(
      type == "access-token" ? now() + 60 * 60 * 2 : now() + 60 * 60 * 24 * 7
    )
    .encrypt(encryptionSecret);
  return jwt;
}

export async function decode(jwt?: string | undefined, secret?: string) {
  if (!jwt) {
    return null;
  }
  if (!secret) {
    secret = process.env.AUTH_SECRET as string;
  }
  try {
    let encryptionSecret = await getDerivedEncryptionKey(secret);
    let res = await jwtDecrypt(jwt, encryptionSecret, {
      clockTolerance: 15,
    });
    let payload: JwtPayload = res.payload;
    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getDerivedEncryptionKey(secret: string | Buffer) {
  return await hkdf("sha256", secret, "", "WEVER JWT Encryption Key", 32);
}
