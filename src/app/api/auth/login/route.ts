import { NextResponse, NextRequest } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';
import { z as zod } from "zod";
import { cookies } from 'next/headers';

// schema validation with zod
const loginSchema = zod.object({
    email: zod.string().email("Invalid email address"),
    password: zod.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log('Received login request for:', body.email);

        // Validate input data
        const parsedBody = loginSchema.safeParse(body);
        if (!parsedBody.success) {
            return NextResponse.json({ error: parsedBody.error.format() }, { status: 400 });
        }

        const { email, password } = parsedBody.data;

        // check if the user already exists
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length === 0) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        const user = existingUser.rows[0];

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        // Generate JWT token
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not defined');
            return NextResponse.json({ error: "Internal server error" }, { status: 500 });
        }

        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email,
                name: user.name 
            },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' } // TODO: change to 7 day
        );

        // Create response with cookie
        const response = NextResponse.json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

        // Set the cookie in the response
        cookies().set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure in production
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 // 1 hour in seconds
            // TODO: Change to 7 days
        });

        return response;
        
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
