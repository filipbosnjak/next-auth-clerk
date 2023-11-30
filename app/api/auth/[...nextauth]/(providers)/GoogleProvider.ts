import GoogleProvider from "next-auth/providers/google";
import User, { UserModel } from "@/app/(models)/User";
import crypto from "crypto";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";

export const googleProvider = GoogleProvider({
  async profile(profile) {
    await dbConnect();
    console.log("Profile Google: ", profile.email);
    console.log(await mongoose.connection.readyState);

    const foundUser: UserModel | null = await User.findOne({
      email: profile.email,
    });
    if (foundUser) {
      console.log(foundUser);
    } else {
      await User.create({
        username: profile.email,
        email: profile.email,
        password: crypto.randomUUID(),
        domain: "google",
      });
      const users = await User.find();
      console.log(users);
    }

    let userRole = "Google User";
    // session?
    return {
      ...profile,
      id: profile.sub,
      image: profile.picture,
      role: userRole,
    };
  },
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
});
