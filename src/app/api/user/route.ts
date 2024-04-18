import { client } from "@/utils/pgClient";
import { IUser } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";
import { SHA256 } from "crypto-ts";
import { hash } from "@/utils/hash";

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
  count: string;
};

export const GET = async () => {
  client.connect();

  const usersData: ResponseData[] | null = (
    await client.query(
      `SELECT * FROM (SELECT count(artistId), artistId FROM images GROUP BY artistId) as imagesCount JOIN users u ON u.id = imagesCount.artistId`
    )
  ).rows;

  const responseData: IUser[] | null = usersData?.map((userData) => ({
    id: userData.id.toString(),
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
    count: userData.count,
  }));

  return new NextResponse(JSON.stringify(responseData));
};

export const POST = async (req: NextRequest) => {
  const { username, password, colors } = await req.json();

  const data = {
    id: hash(username + password),
    name: username,
    description: "",
    maincolor: colors.mainColor,
    maindarkercolor: colors.mainDarkerColor,
    topcolor: colors.topColor,
    cardcolor: colors.cardColor,
    carddarkercolor: colors.cardDarkerColor,
    bottomcolor: colors.bottomColor,
    textcolor: colors.textColor,
    lightcolor: colors.lightColor,
    password: hash(password),
  };

  client.connect();

  await client.query(
    `INSERT INTO users (id, name, description, maincolor, maindarkercolor, topcolor, cardcolor, carddarkercolor, bottomcolor, textcolor, lightcolor, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
    [
      data.id,
      data.name,
      data.description,
      data.maincolor,
      data.maindarkercolor,
      data.topcolor,
      data.cardcolor,
      data.carddarkercolor,
      data.bottomcolor,
      data.textcolor,
      data.lightcolor,
      data.password,
    ]
  );

  return new NextResponse(JSON.stringify(data));
};
