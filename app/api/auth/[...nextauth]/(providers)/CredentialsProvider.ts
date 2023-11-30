import { UserModel } from "@/app/(models)/User";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/app/(models)/User";
import dbConnect from "@/lib/db";

export const credentialsProvider = CredentialsProvider({
  type: "credentials",
  id: "credentials",
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "text", placeholder: "jsmith" },
    password: { label: "Password", type: "password" },
  },
  //@ts-ignore
  async authorize(credentials, request) {
    await dbConnect();
    try {
      const foundUser: UserModel | null = await User.findOne({
        email: credentials?.email,
      });
      if (foundUser == null) {
        return { error: "No user found" };
      }
      if (foundUser) {
        console.log("User Exists");
        const match = await bcrypt.compare(
          credentials?.password || "",
          foundUser.password,
        );
        console.log(match);
        return {
          email: foundUser.email,
          name: foundUser.username,
          id: foundUser._id,
        };
      }
    } catch (error) {
      console.log("error: ", error);
    }
    return { error: "No user found" };
  },
});
