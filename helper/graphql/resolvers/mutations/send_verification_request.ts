import supabase from "@/helper/supabase/init";
import { GraphQLError } from "graphql";
import send_mail_verification from "@/helper/mail/send_mail_verification";

const send_verification_request = async (_, params, ctx) => {
  params = params ? params.input : params;
  if (!params) {
    if (ctx.id) {
      params = {
        id: ctx.id,
      };
    } else {
      return new GraphQLError("No identifier found", {
        extensions: { code: "VALIDATION_ERROR" },
      });
    }
  }

  let user;

  if (params.email) {
    let { data, error } = await supabase
      .from("users")
      .select("id,name,email")
      .eq("email", params.email)
      .maybeSingle();
    if (!data || error) {
      return new GraphQLError("No user found!", {
        extensions: { code: "VALIDATION_ERROR" },
      });
    }
    user = data;
  } else if (params.id || ctx.id) {
    let { data, error } = await supabase
      .from("users")
      .select("id,name,email")
      .eq("id", params.id || ctx.id)
      .maybeSingle();
    if (!data || error) {
      return new GraphQLError("No user found!", {
        extensions: { code: "VALIDATION_ERROR" },
      });
    }
    user = data;
  }

  let code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

  let data = await supabase
    .from("verification")
    .upsert(
      {
        code,
        user_id: user.id,
        valid_until: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
      },
      { ignoreDuplicates: false, onConflict: "user_id" }
    )
    .eq("user_id", user.id);

  if (data.error) {
    return new GraphQLError("Something went wrong!", {
      extensions: { code: "INTERNAL_SERVER_ERROR" },
    });
  }

  try {
    await send_mail_verification(user.name, code, user.email);
    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};

export default send_verification_request;
