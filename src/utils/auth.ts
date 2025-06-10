

// Función para convertir ArrayBuffer a base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}


// Función para codificar base64 de manera segura
function safeBase64Encode(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Función para decodificar base64 de manera segura
function safeBase64Decode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return atob(str);
}

// Asegurarnos de que JWT_SECRET esté configurado
if (!process.env.JWT_SECRET) {
  console.warn('JWT_SECRET no está configurado en las variables de entorno. Usando un valor por defecto inseguro.');
}

const JWT_SECRET = process.env.JWT_SECRET || 'tu-secreto-super-seguro';

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  exp: number;
}

export async function generateToken(user: { id: string; email: string; role: string }) {
  const now = Math.floor(Date.now() / 1000);
  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    exp: now + (60 * 60 * 24) // 24 horas
  };

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(JWT_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = safeBase64Encode(JSON.stringify(header));
  const encodedPayload = safeBase64Encode(JSON.stringify(payload));

  const signature = await crypto.subtle.sign(
    { name: 'HMAC', hash: 'SHA-256' },
    key,
    encoder.encode(`${encodedHeader}.${encodedPayload}`)
  );

  const signatureArray = new Uint8Array(signature);
  const encodedSignature = safeBase64Encode(String.fromCharCode(...signatureArray));
  
  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

export async function verifyToken(token: string): Promise<{ id: string; email: string; role: string }> {
  try {
    if (!token || typeof token !== 'string') {
      throw new Error('Token no proporcionado o inválido');
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Formato de token inválido');
    }

    const [headerBase64, payloadBase64, signatureBase64] = parts;
    
    // Importar la clave
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(JWT_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    // Crear el mensaje a verificar
    const message = encoder.encode(`${headerBase64}.${payloadBase64}`);
    
    try {
      // Convertir la firma de base64 a Uint8Array
      const binaryString = safeBase64Decode(signatureBase64);
      const signature = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        signature[i] = binaryString.charCodeAt(i);
      }
      
      // Verificar la firma
      const isValid = await crypto.subtle.verify(
        { name: 'HMAC', hash: 'SHA-256' },
        key,
        signature,
        message
      );

      if (!isValid) {
        throw new Error('Firma inválida');
      }

      const payload = JSON.parse(safeBase64Decode(payloadBase64));
      const now = Math.floor(Date.now() / 1000);

      if (payload.exp < now) {
        throw new Error('Token expirado');
      }

      return {
        id: payload.userId,
        email: payload.email,
        role: payload.role || 'user'
      };
    } catch (error) {
      console.error('Error al procesar la firma:', error);
      throw new Error('Token malformado');
    }
  } catch (error) {
    console.error('Error al verificar token:', error);
    throw new Error('Token inválido');
  }
}

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return arrayBufferToBase64(hash);
}

export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const hashedPlain = await hashPassword(plainPassword);
  return hashedPlain === hashedPassword;
} 