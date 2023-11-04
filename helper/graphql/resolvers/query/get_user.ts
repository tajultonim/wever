import resolvers from "../../resolvers";
import supabase from "@/helper/supabase/init";
import { GraphQLError } from "graphql";

const get_user = async (_, params, ctx) => {
  if (!ctx.id) {
    return new GraphQLError("Not authenticated!", {
      extensions: {
        code: "AUTHENTICATION_ERROR",
      },
    });
  }
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    return new GraphQLError("Something went wronga", {
      extensions: {
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }

  let isPremium =
    new Date(data.premium_till || 0).getTime() > Date.now() ? true : false;
  let isDisabled =
    new Date(data.disabled_till || 0).getTime() > Date.now() ? true : false;

  data["roles"] = [
    data.is_admin ? "admin" : null,
    isPremium ? "premium" : null,
    isDisabled ? null : "user",
  ].filter((e) => e);

  data["followers"] = await resolvers.Query.get_followers(
    null,
    {
      id: params.id,
    },
    { bypass: data.allow_followers, ...ctx }
  );
  data["following"] = await resolvers.Query.get_following(
    null,
    {
      id: params.id,
    },
    { bypass: data.allow_followers, ...ctx }
  );

  data["blocked"] = await resolvers.Query.get_blocked(
    null,
    {
      id: params.id,
    },
    ctx
  );
  data["blocked_by"] = await resolvers.Query.get_blocked_by(
    null,
    {
      id: params.id,
    },
    ctx
  );

  data["notifications"] = await resolvers.Query.get_notifications(
    null,
    {
      id: params.id,
    },
    ctx
  );
  data["verification"] = await resolvers.Query.get_verification(
    null,
    {
      id: params.id,
    },
    ctx
  );
  data["tokens"] = await resolvers.Query.get_tokens(
    null,
    {
      id: params.id,
    },
    ctx
  );

  return data;
};

export default get_user;
