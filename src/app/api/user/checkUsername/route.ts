import { client } from "@/utils/pgClient";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("name");

  client.connect();

  const nicknames: { name: string }[] | null = (
    await client.query(`SELECT name FROM users`)
  ).rows;

  if (
    username &&
    nicknames.map((el) => el.name.toLowerCase()).includes(username)
  ) {
    return new NextResponse(JSON.stringify({ exists: true }), { status: 200 });
  }

  return new NextResponse(JSON.stringify({ exists: false }), { status: 200 });
};
