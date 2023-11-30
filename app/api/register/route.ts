import dbConnect from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import User, { UserModel } from "@/app/(models)/User";
import { NextRequest } from "next/server";
import { RegisterInput } from "@/app/register/components/RegisterAuthForm";
import bcrypt from "bcrypt";

export type RegisterResponse = {
  message: string;
};
export async function POST(
  req: NextRequest,
  res: NextApiResponse<RegisterResponse>,
) {
  const userInput = (await req.json()) as RegisterInput;
  await dbConnect();
  console.log("userInput: ", userInput);
  const foundUser: UserModel | null = await User.findOne({
    email: userInput.email,
  });
  if (foundUser) {
    console.log(foundUser);
    return Response.json({
      message: "User already exists",
    });
  } else {
    await User.create({
      username: userInput.email,
      email: userInput.email,
      password: await bcrypt.hash(userInput.password, 10),
      domain: "creds",
    });
    return Response.json({
      message: "User created",
    });
  }
}
