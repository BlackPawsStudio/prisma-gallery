import { client } from "@/utils/pgClient";
import { IUser } from "@/utils/types";
import { NextResponse } from "next/server";

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
