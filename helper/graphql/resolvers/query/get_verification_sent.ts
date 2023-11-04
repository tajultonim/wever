import supabase from "@/helper/supabase/init";
import { GraphQLError } from "graphql";

const get_verification_sent = async (_, params, ctx) => {
  params = params.input;
  let data;
  if (params.id) {
    data = await supabase
      .from("verification")
      .select("id,valid_until")
      .eq("user_id", params.id)
      .maybeSingle();
  } else if (params.email) {
    data = await supabase
      .from("verification")
      .select("id,valid_until")
      .eq("user_id.email", params.email)
      .maybeSingle();
  } else {
    new GraphQLError("No identifier provided", {
      extensions: { code: "VALIDATION_ERROR" },
    });
  }

  if (data.error) {
    return new GraphQLError("Something went wrong", {
      extensions: { code: "INTERNAL_SERVER_ERROR" },
    });
  }
  if (data.data) {
    return true;
  }
  return false;
};

export default get_verification_sent;
