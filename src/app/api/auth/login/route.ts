import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePasswords, generateToken } from '@/utils/auth';

export async function POST(request: Request) {
  try {
    console.log('Login API - Iniciando proceso de login...');
    const body = await request.json();
    console.log('Login API - Datos recibidos:', { email: body.email });

    const { email, password } = body;

    if (!email || !password) {
      console.log('Login API - Error: Email o contraseña faltantes');
      return NextResponse.json(
        { message: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Buscar usuario
    console.log('Login API - Buscando usuario en la base de datos...');
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log('Login API - Usuario no encontrado');
      return NextResponse.json(
        { message: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    console.log('Login API - Usuario encontrado, verificando contraseña...');
    // Verificar contraseña
    const isValidPassword = await comparePasswords(password, user.password);
    if (!isValidPassword) {
      console.log('Login API - Contraseña inválida');
      return NextResponse.json(
        { message: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    console.log('Login API - Contraseña válida, actualizando último login...');
    // Actualizar último login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Generar token
    console.log('Login API - Generando token...');
    const token = await generateToken({ id: user.id, email: user.email, role: 'user' });

    // Crear respuesta
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

    // Establecer cookie
    console.log('Login API - Estableciendo cookie...');
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 horas
      path: '/',
    });

    console.log('Login API - Login exitoso, cookie establecida');
    return response;
  } catch (error) {
    console.error('Login API - Error en login:', error);
    return NextResponse.json(
      { message: 'Error en el servidor' },
      { status: 500 }
    );
  }
} 