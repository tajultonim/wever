import supabase from "@/helper/supabase/init";
import { GraphQLError } from "graphql";

const get_followers = async (_, params, ctx) => {
  if (!(ctx.bypass || ctx.roles.includes("admin") || ctx.id == params.id)) {
    const res = await supabase
      .from("users")
      .select("allow_followers")
      .eq("id", params.id)
      .maybeSingle();
    if (!res.data?.allow_followers || res.error) {
      return new GraphQLError(
        "You do not have permission to perform this action",
        {
          extensions: {
            code: "PERMISSION_ERROR",
          },
        }
      );
    }
  }
  const { data, error } = await supabase
    .from("follow")
    .select("from_user_id(*)")
    .eq("to_user_id", params.id);
  if (error) {
    return new GraphQLError("Something went wrong", {
      extensions: {
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
  return data?.map((user) => user.from_user_id);
};

export default get_followers;
