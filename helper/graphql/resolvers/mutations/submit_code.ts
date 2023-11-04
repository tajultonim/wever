import supabase from "@/helper/supabase/init";
import { GraphQLError } from "graphql";
import resolvers from "../../resolvers";

const submit_code = async (_, params, ctx) => {
  let code = params.code;
  let id = ctx.id;
  let { data, error }: any = await supabase
    .from("verification")
    .select("code, valid_until, user_id( email )")
    .eq("user_id", id)
    .maybeSingle();
  if (!data || error) {
    new GraphQLError("No verification record found!", {
      extensions: { code: "VALIDATION_ERROR" },
    });
  }

  if (data?.code != code) {
    return new GraphQLError("Invalid code", {
      extensions: { code: "INVALID_CODE" },
    });
  }

  if (new Date(data?.valid_until || 0).getTime() < Date.now()) {
    return new GraphQLError("Code expired", {
      extensions: { code: "EXPIRED_CODE" },
    });
  }

  await supabase
    .from("users")
    .update({ email_verified_at: new Date().toISOString() })
    .eq("id", id);
  await supabase.from("verification").delete().eq("user_id", id);

  return resolvers.Mutation.login(
    null,
    { email: data?.user_id.email },
    { bypass: true, ...ctx }
  );
};

export default submit_code;
