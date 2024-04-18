import { hash } from "@/utils/hash";
import { client } from "@/utils/pgClient";
import { IUser } from "@/utils/types";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { username, password } = await req.json();

  client.connect();
  const usersArr: IUser[] = (
    await client.query(`SELECT * FROM users WHERE name = '${username}'`)
  ).rows;

  if (!usersArr.length) {
    console.log("User not found");
    return new Response(JSON.stringify({ error: "User not found" }));
  }

  const user = usersArr[0];

  if (user.password !== hash(password)) {
    console.log("Incorrect password");
    return new Response(JSON.stringify({ error: "Incorrect password" }));
  }

  return new Response(JSON.stringify({ success: true, id: user.id }));
};
