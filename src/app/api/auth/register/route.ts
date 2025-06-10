import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateToken } from '@/utils/auth';

export async function POST(request: Request) {
  try {
    console.log('Register API - Iniciando proceso de registro...');
    const body = await request.json();
    console.log('Register API - Datos recibidos:', { email: body.email });

    const { email, password, name } = body;

    if (!email || !password || !name) {
      console.log('Register API - Error: Datos incompletos');
      return NextResponse.json(
        { message: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe
    console.log('Register API - Verificando si el usuario ya existe...');
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log('Register API - Usuario ya existe');
      return NextResponse.json(
        { message: 'El email ya está registrado' },
        { status: 400 }
      );
    }

    // Hash de la contraseña
    console.log('Register API - Hasheando contraseña...');
    const hashedPassword = await hashPassword(password);

    // Crear usuario
    console.log('Register API - Creando nuevo usuario...');
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Generar token
    console.log('Register API - Generando token...');
    const token = await generateToken({ 
      id: user.id, 
      email: user.email,
      role: 'user' // Rol por defecto para usuarios registrados
    });

    // Crear respuesta
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

    // Establecer cookie
    console.log('Register API - Estableciendo cookie...');
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 horas
      path: '/',
    });

    console.log('Register API - Registro exitoso, cookie establecida');
    return response;
  } catch (error) {
    console.error('Register API - Error en registro:', error);
    return NextResponse.json(
      { message: 'Error en el servidor' },
      { status: 500 }
    );
  }
} 