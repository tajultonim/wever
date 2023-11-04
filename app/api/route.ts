import { NextResponse } from "next/server";
import { createHash } from "@/helper/auth/hash";

const GET = async () => {
  return NextResponse.json({ data: "API route for WEVER" });
};

export { GET };
