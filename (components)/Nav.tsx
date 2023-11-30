import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import SignOutButton from "@/(components)/client-components/SignOutButton";
import Image from "next/image";

export type Session = {
  user: {
    name: string;
    email: string;
    image: string;
    role: string;
  };
};
const Nav = async () => {
  const session = (await getServerSession(options)) as Session;

  console.log(session);
  return (
    <header className="bg-gray-600 text-gray-100">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div>{session.user ? session?.user.email : ""}</div>
        <Image
          src={session.user ? session?.user.image : ""}
          width={70}
          height={70}
          alt="Picture of the author"
          style={{ borderRadius: "50%" }}
        />
        <div className="flex gap-30">
          {session ? (
            <SignOutButton />
          ) : (
            <>
              <Link href="/api/auth/signin">Login</Link>
              <Link href="/api/auth/newUser">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
