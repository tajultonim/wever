import { EncryptJWT, JWTPayload, jwtDecrypt, jwtVerify } from "jose";
import { v4 as uuid } from "uuid";
import hkdf from "@panva/hkdf";

interface JwtPayload extends JWTPayload {
  type: "access-token" | "refresh-token";
  context: {
    user: { id: string; username: string; name: string };
    roles: string[];
  };
}

const now = () => Date.now() / 1000;

export async function encode(payload: JwtPayload, secret?: string) {
  if (!secret) {
    secret = process.env.AUTH_SECRET as string;
  }
  let encryptionSecret = await getDerivedEncryptionKey(secret);
  let jwt = await new EncryptJWT(payload)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setJti(uuid())
    .setExpirationTime(
      payload.type == "access-token"
        ? now() + 60 * 60 * 2
        : now() + 60 * 60 * 24 * 7
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
    let { payload } = await jwtDecrypt(jwt, encryptionSecret, {
      clockTolerance: 15,
    });
    return payload;
  } catch {
    return null;
  }
}

async function getDerivedEncryptionKey(secret: string | Buffer) {
  return await hkdf("sha256", secret, "", "WEVER JWT Encryption Key", 32);
}
