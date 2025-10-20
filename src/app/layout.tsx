import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ProvedorAutenticacao } from '../contextos/ContextoAutenticacao';
import { ProvedorNotificacao } from '../contextos/ContextoNotificacao';
import { ProvedorTema } from '../contextos/ContextoTema';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sistema Aure - Gestão Empresarial',
  description: 'Plataforma completa de gestão empresarial com contratos, pagamentos e notas fiscais',
  keywords: ['gestão empresarial', 'contratos', 'pagamentos', 'notas fiscais', 'fintech'],
  authors: [{ name: 'Sistema Aure' }],
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ProvedorTema>
          <ProvedorNotificacao>
            <ProvedorAutenticacao>
              {children}
            </ProvedorAutenticacao>
          </ProvedorNotificacao>
        </ProvedorTema>
      </body>
    </html>
  );
}