import jwt from "jsonwebtoken";
const privateKey = Deno.env.get("PRIVATE_KEY") as string;
const publicKey = Deno.env.get("PUBLIC_KEY") as string;
console.log(Deno.env.get("PRIVATE_KEY"));
console.log(Deno.env.get("PUBLIC_KEY"));

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return { valid: true, expired: false, decoded };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}
