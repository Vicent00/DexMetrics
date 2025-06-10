import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateToken } from '@/utils/auth';

export async function POST(request: Request) {
  try {
    console.log('Register API - Starting registration process...');
    const body = await request.json();
    console.log('Register API - Received data:', { email: body.email });

    const { email, password, name } = body;

    if (!email || !password || !name) {
      console.log('Register API - Error: Incomplete data');
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log('Register API - Checking if user already exists...');
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log('Register API - User already exists');
      return NextResponse.json(
        { message: 'Email is already registered' },
        { status: 400 }
      );
    }

    // Hash password
    console.log('Register API - Hashing password...');
    const hashedPassword = await hashPassword(password);

    // Create user
    console.log('Register API - Creating new user...');
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Generate token
    console.log('Register API - Generating token...');
    const token = await generateToken({ 
      id: user.id, 
      email: user.email,
      role: 'user' // Default role for registered users
    });

    // Create response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

    // Set cookie
    console.log('Register API - Setting cookie...');
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    console.log('Register API - Registration successful, cookie set');
    return response;
  } catch (error) {
    console.error('Register API - Error in registration:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
} 