import {NextRequest, NextResponse} from "next/server";
import Post from "@/app/(models)/Post";
import dbConnect from "@/lib/db";

export async function GET(
    req: NextRequest,
    res: NextResponse
) {
    await dbConnect()
    await Post.create({
        title: "aasdfsd",
        text: "asasdffgsd",
        author: "asfs",
    })
    const posts = await Post.find()
    console.log(posts)
    const data = {
        res: "asdas"
    }

    return Response.json({ data })
}