import {githubProvider} from "@/app/api/auth/[...nextauth]/(providers)/GithubProvider";
import {googleProvider} from "@/app/api/auth/[...nextauth]/(providers)/GoogleProvider";
import {credentialsProvider} from "@/app/api/auth/[...nextauth]/(providers)/CredentialsProvider";
// @ts-ignore
import {AuthOptions} from "next-auth/src/core/types";


export const options: AuthOptions = {
    providers:[
    credentialsProvider,
    googleProvider,
    githubProvider
    ],
    pages: {
        signIn: "/login",
        error: "/notfound",
    },
    callbacks: {
        // @ts-ignore
        async jwt({ token, user }) {
            if (user) token.role = user.role;
            return token;
        },
        // @ts-ignore
        async session({ session, token }) {
            if (session?.user) session.user.role = token.role;
            return session;
        },
    },

};
