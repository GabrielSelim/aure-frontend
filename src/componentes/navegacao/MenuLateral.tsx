'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';
import { 
  Home,
  Users,
  FileText,
  CreditCard,
  Receipt,
  Settings,
  UserPlus
} from 'lucide-react';

const itensMenu = [
  {
    titulo: 'Painel',
    href: '/painel',
    icone: Home
  },
  {
    titulo: 'Usuários',
    href: '/usuarios',
    icone: Users
  },
  {
    titulo: 'Convites',
    href: '/convites',
    icone: UserPlus
  },
  {
    titulo: 'Contratos',
    href: '/contratos',
    icone: FileText
  },
  {
    titulo: 'Pagamentos',
    href: '/pagamentos',
    icone: CreditCard
  },
  {
    titulo: 'Notas Fiscais',
    href: '/notas-fiscais',
    icone: Receipt
  },
  {
    titulo: 'Configurações',
    href: '/configuracoes',
    icone: Settings
  }
];

export function MenuLateral() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {itensMenu.map((item) => {
            const Icone = item.icone;
            const ativo = pathname === item.href;
            
            return (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    ativo 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <Icone className="h-5 w-5" />
                  <span>{item.titulo}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}