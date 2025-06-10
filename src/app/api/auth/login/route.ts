import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePasswords, generateToken } from '@/utils/auth';

export async function POST(request: Request) {
  try {
    console.log('Login API - Starting login process...');
    const body = await request.json();
    console.log('Login API - Received data:', { email: body.email });

    const { email, password } = body;

    if (!email || !password) {
      console.log('Login API - Error: Missing email or password');
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    console.log('Login API - Searching for user in database...');
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log('Login API - User not found');
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('Login API - User found, verifying password...');
    // Verify password
    const isValidPassword = await comparePasswords(password, user.password);
    if (!isValidPassword) {
      console.log('Login API - Invalid password');
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('Login API - Password valid, updating last login...');
    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Generate token
    console.log('Login API - Generating token...');
    const token = await generateToken({ id: user.id, email: user.email, role: 'user' });

    // Create response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLogin: user.lastLogin,
      },
    });

    // Set cookie
    console.log('Login API - Setting cookie...');
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    console.log('Login API - Login successful, cookie set');
    return response;
  } catch (error) {
    console.error('Login API - Error in login:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
} 