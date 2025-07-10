import prisma from "../../../../../lib/prisma";
import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

// GET single post by ID
export async function GET(request, { params }) {
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

    try {
        const post = await prisma.post.findFirst({
            where: {
                id: parseInt(params.id),
                userId: userId
            }
        });

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// UPDATE post
export async function PUT(request, { params }) {
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

    try {
        const { title, content } = await request.json();
        
        if (!title || !content) {
            return NextResponse.json({ error: "Title and content required" }, { status: 400 });
        }

        // Check if post exists and belongs to user
        const existingPost = await prisma.post.findFirst({
            where: {
                id: parseInt(params.id),
                userId: userId
            }
        });

        if (!existingPost) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        const updatedPost = await prisma.post.update({
            where: { id: parseInt(params.id) },
            data: { title, content }
        });

        return NextResponse.json(updatedPost);
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE post
export async function DELETE(request, { params }) {
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

    try {
        // Check if post exists and belongs to user
        const existingPost = await prisma.post.findFirst({
            where: {
                id: parseInt(params.id),
                userId: userId
            }
        });

        if (!existingPost) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        await prisma.post.delete({
            where: { id: parseInt(params.id) }
        });

        return NextResponse.json({ message: "Post deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
} 