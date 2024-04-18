import { client } from "@/utils/pgClient";
import { IImage } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data: IImage = await req.json();

  client.connect();

  const responseData = await client.query(
    `INSERT INTO images (title, url, artistId) VALUES ('${data.title}', '${data.url}', '${data.artistId}')`
  );

  return new NextResponse(JSON.stringify(responseData));
};
