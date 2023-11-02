import { NextResponse } from "next/server";

const GET = async () => {
  return NextResponse.json({ data: "API route for WEVER" });
};

export { GET };
