import { client } from "@/utils/pgClient";
import { NextResponse } from "next/server";

export const GET = async () => {
  client.connect();

  // await client.query(`DELETE FROM users WHERE name = 'zhopa bb'`);

  return new NextResponse(JSON.stringify({ success: true }));
};
