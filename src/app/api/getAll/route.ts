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

type ImageResponseData = {
  id: number;
  title: string;
  artistid: number;
  url: string;
};

export const GET = async () => {
  client.connect();

  const usersData: ResponseData[] | null = (
    await client.query(`SELECT * FROM users`)
  ).rows;

  const imagesData: ImageResponseData[] | null = (
    await client.query(`SELECT * FROM images`)
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
    images: imagesData
      .filter((imageData) => {
        return imageData.artistid === userData.id;
      })
      .map((imageData) => ({
        id: imageData.id.toString(),
        url: imageData.url,
        artistId: imageData.artistid.toString(),
        title: imageData.title,
      })),
  }));

  return new NextResponse(JSON.stringify(responseData));
};
