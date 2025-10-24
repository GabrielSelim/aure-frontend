import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Rotas públicas que não precisam de autenticação
  const rotasPublicas = [
    '/entrar',
    '/registro',
    '/aceitar-convite',
    '/esqueci-senha',
    '/resetar-senha'
  ];
  
  // Se é uma rota pública, permitir acesso
  if (rotasPublicas.some(rota => pathname.startsWith(rota))) {
    return NextResponse.next();
  }
  
  // Para rotas protegidas, verificar token apenas no cookie/header se disponível
  // Não fazemos verificação complexa aqui para evitar problemas
  const token = request.cookies.get('authToken')?.value || 
                request.headers.get('authorization');
  
  // Se não tem token e está tentando acessar rota protegida, redirecionar
  if (!token && pathname !== '/entrar') {
    const loginUrl = new URL('/entrar', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};