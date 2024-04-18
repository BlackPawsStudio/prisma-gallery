import { NextResponse } from "next/server";

export const GET = async () => {
  // const data = await client.query(`INSERT INTO users (name, description, maincolor, maindarkercolor, topcolor, cardcolor, carddarkercolor, bottomcolor, textcolor, lightcolor) VALUES ('username', '', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000') RETURNING *`);

  return new NextResponse(JSON.stringify({ success: true }));
};
