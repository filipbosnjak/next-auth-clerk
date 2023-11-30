import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
import { TokenSetParameters } from "openid-client";
import User, { UserModel } from "@/app/(models)/User";
import * as crypto from "crypto";
import dbConnect from "@/lib/db";

export const githubProvider = GitHubProvider({
  profile: async (profile: GithubProfile, tokens: TokenSetParameters) => {
    await dbConnect();
    console.log("profile from the server: ", profile);

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
        domain: "github",
      });
      const users = await User.find();
      console.log(users);
    }

    return {
      id: profile.id.toString(),
      name: profile.name,
      email: profile.email,
      image: profile.avatar_url,
    };
  },
  clientId: process.env.GITHUB_CLIENT_ID || "",
  clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
});
