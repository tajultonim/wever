import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase";

const supabase = createClient<Database>(
  process.env.DB_URL || "",
  process.env.DB_SECRET || ""
);

export default supabase;
