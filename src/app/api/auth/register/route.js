import prisma from "../../../../../lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { email, password } = await request.json();
    if (!email || !password) {
        return NextResponse.json({ error: "Email dan password wajib diisi" }, { status: 400 });
    }
    const exist = await prisma.user.findUnique({ where: { email } });
    if (exist) {
        return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 409 });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { email, password: hashed },
    });
    return NextResponse.json(user, { status: 201 });
}
