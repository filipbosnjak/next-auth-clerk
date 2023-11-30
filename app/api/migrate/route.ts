import db from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextRequest) {
  const DB = await db();
  const collections = DB.connection?.collections;
  /*  console.log(
    collections["users"].updateMany({}, { $set: { domain: "creds" } }),
  );*/
  const indexes = await collections["users"].indexes();
  console.log(indexes);
  console.log("asd");
  /*  collections["users"].createIndex(
    { email: 1, username: 1, domain: 1 },
    { unique: true },
  );*/

  return Response.json({
    res: "res",
  });
}
