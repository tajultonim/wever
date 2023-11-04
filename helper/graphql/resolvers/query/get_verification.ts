import supabase from "@/helper/supabase/init";
import { GraphQLError } from "graphql";

const get_verification = async (_, params, ctx) => {
  if (!ctx.roles.includes("admin")) {
    return new GraphQLError("You don't have sufficient permission", {
      extensions: {
        code: "PERMISSION_ERROR",
      },
    });
  }
  const { data, error } = await supabase
    .from("verification")
    .select("*")
    .eq("user_id", params.id)
    .maybeSingle();

  if (error) {
    return new GraphQLError("Something went wrong", {
      extensions: {
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
  return data;
};

export default get_verification;
