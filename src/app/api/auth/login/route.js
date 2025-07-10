import prisma from "../../../../../lib/prisma";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { email, password } = await request.json();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const token = sign({ id: user.id }, "SECRET_KEY", { expiresIn: "1h" });
    return NextResponse.json({ token });
}
