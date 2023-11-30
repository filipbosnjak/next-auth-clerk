import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";

export type PageProps = {};

const Page = async (props: PageProps) => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Member");
  }

  // @ts-ignore
  return <>hello {session.user.name}</>;
};

export default Page;
