import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import pool from '@/lib/db'
import { z as zod } from "zod";

// Schema validation with zod
const signupSchema = zod.object({
    name: zod.string().min(3, "Name must be at least 3 characters"),
    email: zod.string().email("Invalid email address"),
    password: zod.string().min(6, "Password must be at least 6 characters"),
    // confirmPassword: zod.string().min(6, "Password must be at least 6 characters"),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validate input data
        const parsedBody = signupSchema.safeParse(body);
        if (!parsedBody.success) {
            // return NextResponse.json({ error: parsedBody.error.message }, { status: 400 });
            return NextResponse.json({ error: parsedBody.error.format }, { status: 400 });
        }

        const { name, email, password } = parsedBody.data;

        // check if the user already exists
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.row.length > 0) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user in the database
        const newUser = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, hashedPassword]);
        if (newUser.rows.length > 0) {
            return NextResponse.json({ message: "User created successfully" }, { status: 200 });
        }

        return NextResponse.json(
            {message: "User created successfully", user: newUser.rows[0]},
            {status: 200}
        )
        
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "server error" }, { status: 500 });
    }
}