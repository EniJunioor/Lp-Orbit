import type { Metadata } from 'next';
import './globals.css';
import './responsive.css';

import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'Sistema Orbit — Cockpit de Gestão',
  description: 'Metas, planos de ação e KPIs em uma única plataforma. Centralize a operação, execute rituais de gestão e decida com dados em tempo real.',
  openGraph: {
    title: 'Sistema Orbit — Cockpit de Gestão',
    description: 'Centralize a operação e decida com dados em tempo real.',
    url: 'https://sistemaorbit.com.br',
    siteName: 'Sistema Orbit',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1200&h=630&fit=crop', // Imagem espacial premium como placeholder
        width: 1200,
        height: 630,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
