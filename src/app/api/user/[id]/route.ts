import { client } from "@/utils/pgClient";
import { IImage, IUser } from "@/utils/types";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

type ResponseData = {
  id: number;
  name: string;
  description: string;
  cardcolor: string;
  carddarkercolor: string;
  maincolor: string;
  maindarkercolor: string;
  topcolor: string;
  bottomcolor: string;
  lightcolor: string;
  textcolor: string;
};

export const GET = async (req: NextRequest, context: { params: Params }) => {
  const userId = context.params.id as string;

  if (!userId) {
    return new NextResponse(JSON.stringify(null), { status: 500 });
  }

  client.connect();

  let responseData: IUser | null = null;

  const userData: ResponseData | null = (
    await client.query(`SELECT * FROM users WHERE id = '${userId}'`)
  ).rows[0];

  if (userData) {
    const imagesData: IImage[] | null = (
      await client.query(`SELECT * FROM images WHERE artistId = '${userId}'`)
    ).rows;

    responseData = {
      id: userId,
      name: userData.name,
      description: userData.description,
      colors: {
        mainColor: userData.maincolor,
        mainDarkerColor: userData.maindarkercolor,
        topColor: userData.topcolor,
        cardColor: userData.cardcolor,
        cardDarkerColor: userData.carddarkercolor,
        bottomColor: userData.bottomcolor,
        textColor: userData.textcolor,
        lightColor: userData.lightcolor,
      },
      images: imagesData,
    };
  }

  return new NextResponse(JSON.stringify(responseData));
};

export const PUT = async (req: NextRequest, context: { params: Params }) => {
  const userId = context.params.id as string;

  if (!userId) {
    return new NextResponse(JSON.stringify(null), { status: 500 });
  }
  const data: IUser = await req.json();

  client.connect();

  await client.query(
    `UPDATE users SET name = '${data.name}', description = '${data.description}', maincolor = '${data.colors.mainColor}', maindarkercolor = '${data.colors.mainDarkerColor}', topcolor = '${data.colors.topColor}', cardcolor = '${data.colors.cardColor}', carddarkercolor = '${data.colors.cardDarkerColor}', bottomcolor = '${data.colors.bottomColor}', textcolor = '${data.colors.textColor}', lightcolor = '${data.colors.lightColor}' WHERE id = '${userId}'`
  );

  return new NextResponse(JSON.stringify(data));
};

export const DELETE = async (req: NextRequest, context: { params: Params }) => {
  const userId = context.params.id as string;

  if (!userId) {
    return new NextResponse(JSON.stringify(null), { status: 500 });
  }

  client.connect();

  await client.query(`DELETE FROM users WHERE id = '${userId}'`);

  return new NextResponse(JSON.stringify({ id: userId }));
};
