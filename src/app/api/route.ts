import { client } from "@/utils/pgClient";
import { IImage, IUser } from "@/utils/types";
import { NextResponse } from "next/server";

export const GET = async () => {
  client.connect();

  // const usersData = (
  //   await client.query(
  //     "INSERT INTO users VALUES ('1234', 'John Doe', 'John Doe is an artist, view his work here.', 'transparent', '#001314', '#00a2a2', '#001314', 'transparent', '#001314', '#01dbdb', '#fff')"
  //   )
  // ).rows;

    const usersData = (
      await client.query(
        "INSERT INTO images VALUES ('14', 'Image', 'https://via.placeholder.com/150', '1234')"
      )
    ).rows;

  return new NextResponse(JSON.stringify(usersData));
};
