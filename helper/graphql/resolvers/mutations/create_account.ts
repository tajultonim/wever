import { createHash } from "@/helper/auth/hash";
import { nameReg, emailReg, usernameReg, passwordReg } from "@/helper/regs";
import supabase from "@/helper/supabase/init";
import { GraphQLError } from "graphql";
import resolvers from "../../resolvers";

const create_account = async (_, params, ctx) => {
  if (
    nameReg.test(params.name) &&
    usernameReg.test(params.username) &&
    emailReg.test(params.email) &&
    passwordReg.test(params.password)
  ) {
    let { data, error } = await supabase
      .from("users")
      .select("id,name,email,username")
      .eq("email", params.email)
      .maybeSingle();
    if (data || error) {
      return new GraphQLError("Email taken", {
        extensions: { code: "VALIDATION_ERROR" },
      });
    }
    let isusernameavailable = await resolvers.Query.get_username_availability(
      null,
      params.username,
      ctx
    );
    if (!isusernameavailable) {
      return new GraphQLError("Username taken", {
        extensions: { code: "VALIDATION_ERROR" },
      });
    }
    let password_hash = await createHash(params.password);
    let res = await supabase
      .from("users")
      .insert({
        username: params.username,
        password_hash: password_hash,
        email: params.email,
        name: params.name,
      })
      .select("id")
      .single();
    if (res.error) {
      return new GraphQLError("Something went wrong!", {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
    }

    await resolvers.Mutation.send_verification_request(
      null,
      { email: params.email },
      { id: res.data.id, ...ctx }
    );

    return resolvers.Mutation.login(
      null,
      {
        email: params.email,
        password: params.password,
      },
      { id: res.data.id, ...ctx }
    );
  }
};

export default create_account;
