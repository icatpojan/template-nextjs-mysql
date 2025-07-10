import prisma from "../../../../lib/prisma";
import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(request) {
    const auth = request.headers.get("authorization");
    if (!auth || !auth.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    let userId;
    try {
        const token = auth.split(" ")[1];
        const payload = verify(token, "SECRET_KEY");
        userId = payload.id;
    } catch {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const posts = await prisma.post.findMany({
        where: { userId: userId },
        orderBy: { id: "desc" },
    });
    return NextResponse.json(posts);
}

export async function POST(request) {
    const auth = request.headers.get("authorization");
    if (!auth || !auth.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    let userId;
    try {
        const token = auth.split(" ")[1];
        const payload = verify(token, "SECRET_KEY");
        userId = payload.id;
    } catch {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const { title, content } = await request.json();
    if (!title || !content) {
        return NextResponse.json({ error: "Title and content required" }, { status: 400 });
    }
    const post = await prisma.post.create({ data: { title, content, userId } });
    return NextResponse.json(post);
}
