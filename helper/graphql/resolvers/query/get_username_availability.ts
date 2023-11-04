import { usernameReg } from "@/helper/regs";
import supabase from "@/helper/supabase/init";
import { GraphQLError } from "graphql";

const get_username_availability = async (_, params, ctx) => {
  if (!params.username) {
    return new GraphQLError("Username not found", {
      extensions: { code: "VALIDATION_ERROR" },
    });
  }
  if (!usernameReg.test(params.username)) {
    return false;
  }
  let { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("username", params.username)
    .maybeSingle();

  if (data || error) {
    return false;
  }
  if (!data) {
    return true;
  }
};

export default get_username_availability;
