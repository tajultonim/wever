import { decode } from "../jwt/crypto";
import { NextRequest } from "next/server";

const contextHandeler = async (request: NextRequest) => {
  let jwt = request.cookies.get("access-token")?.value || "";
  let payload = await decode(jwt);
  return {
    id: payload
      ? payload.type == "access-token"
        ? payload.context?.user.id
        : null
      : null,
    roles: payload
      ? payload.type == "access-token"
        ? payload.context?.roles
        : []
      : [],
    user_agent: request.headers.get("user-agent"),
  };
};

export default contextHandeler;
