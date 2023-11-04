import { compareHash } from "@/helper/auth/hash";
import { encode } from "@/helper/jwt/crypto";
import supabase from "@/helper/supabase/init";
import { GraphQLError } from "graphql";

const login = async (_, params, ctx) => {
  let email = params.email;
  let password = params.password;
  let { data, error } = await supabase
    .from("users")
    .select(
      "password_hash,id,username,name,is_admin,premium_till,disabled_till,verified_at,email_verified_at"
    )
    .eq("email", email)
    .single();
  if (error || !data) {
    return new GraphQLError("No user record found!", {
      extensions: { code: "USER_NOT_FOUND" },
    });
  }

  let passed = ctx.bypass || (await compareHash(password, data?.password_hash));
  if (!passed) {
    return new GraphQLError("Incorrect password", {
      extensions: { code: "INCORRECT_PASSWORD" },
    });
  }
  let isPremium =
    new Date(data.premium_till || 0).getTime() > Date.now() ? true : false;
  let isDisabled =
    new Date(data.disabled_till || 0).getTime() > Date.now() ? true : false;

  let context = {
    user: {
      id: data.id,
      username: data.username,
      name: data.name,
    },
    roles: [
      data.is_admin ? "admin" : null,
      isPremium ? "premium" : null,
      isDisabled ? null : "user",
      data.email_verified_at ? "email_verified" : null,
      data.verified_at ? "verified" : null,
    ].filter((e) => e) as string[],
  };

  let refresh_token = await encode("refresh-token", context);
  let access_token = await encode("access-token", context);

  let res = await supabase.from("tokens").insert({
    user_agent: ctx.user_agent,
    user_id: data?.id,
    valid_until: new Date(
      Date.now() + 12 * 30 * 24 * 60 * 60 * 1000
    ).toISOString(),
    token: refresh_token,
  });
  if (res.error) {
    return new GraphQLError("Something went wrong!", {
      extensions: { code: "SERVER_ERROR" },
    });
  }
  return { access_token, refresh_token };
};

export default login;
