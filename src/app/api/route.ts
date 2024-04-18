import { client } from "@/utils/pgClient";
import { NextResponse } from "next/server";

export const GET = async () => {
  client.end();

  return new NextResponse(JSON.stringify({ success: true }));
};
