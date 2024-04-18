import { client } from "@/utils/pgClient";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, context: { params: Params }) => {
  const imageId = context.params.id as string;

  if (!imageId) {
    return new NextResponse(JSON.stringify(null), { status: 500 });
  }

  client.connect();

  const responseData = await client.query(
    `DELETE FROM images WHERE id = '${imageId}'`
  );

  return new NextResponse(JSON.stringify(responseData));
};
