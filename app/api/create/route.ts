import {NextRequest, NextResponse} from "next/server";
import dbConnect from "@/lib/db";
import User, {IUser} from "@/app/(models)/User";
typeof import("mongoose")
export async function GET(
    req: NextRequest,
    res: NextResponse
) {
    run().catch(err => console.log(err));

    async function run() {
        // 4. Connect to MongoDB
        await dbConnect()

        const user = new User({
            username: "sadf",
            email: "asdasd",
            password: "sdfsdfgsd"
        });
        const newuser = await user.save() as IUser;

        console.log(newuser.username); // 'bill@initech.com'
    }
    const data = {
        res: "asdas"
    }

    return Response.json({ data })
}