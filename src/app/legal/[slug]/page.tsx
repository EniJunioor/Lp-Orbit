import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { i18n } from '@/lib/i18n';

// Em uma aplicação real, você renderizaria de um CMS ou markdown.
export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const t = i18n['pt'];
  
  const titles: Record<string, string> = {
    'termos': 'Termos de Serviço',
    'privacidade': 'Política de Privacidade',
    'lgpd': 'Diretrizes LGPD'
  };

  const title = titles[resolvedParams.slug] || 'Documento Legal';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar simplificado ignorando o state de scroll por enquanto para o template */}
      <div style={{ height: 88, borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(5, 5, 12, 0.8)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', height: '100%', display: 'flex', alignItems: 'center', padding: '0 24px' }}>
          <a href="/" style={{ color: '#fff', fontSize: 20, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", textDecoration: 'none' }}>
            Orbit
          </a>
        </div>
      </div>

      <main style={{ flex: 1, maxWidth: 800, margin: '0 auto', padding: '80px 24px', width: '100%' }}>
        <h1 style={{ fontSize: 40, fontWeight: 700, marginBottom: 24, letterSpacing: '-0.02em' }}>{title}</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 40 }}>Última atualização: 25 de Abril de 2026</p>
        
        <div style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, fontSize: 16 }}>
          <p style={{ marginBottom: 24 }}>
            Este é um documento legal gerado dinamicamente para o Sistema Orbit. 
            Em um ambiente de produção, este conteúdo seria substituído pelos termos redigidos pela sua equipe jurídica.
          </p>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginTop: 48, marginBottom: 16, color: '#fff' }}>1. Aceitação dos Termos</h2>
          <p style={{ marginBottom: 24 }}>
            Ao acessar e usar o Sistema Orbit, você concorda em cumprir estes termos e todas as leis aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site.
          </p>
          
          <h2 style={{ fontSize: 24, fontWeight: 600, marginTop: 48, marginBottom: 16, color: '#fff' }}>2. Proteção de Dados (LGPD)</h2>
          <p style={{ marginBottom: 24 }}>
            Levamos a privacidade muito a sério. Todas as métricas e planos de ação armazenados no cockpit do Orbit são criptografados end-to-end e aderem estritamente às diretrizes da Lei Geral de Proteção de Dados (LGPD) do Brasil.
          </p>
        </div>
      </main>

      <Footer t={t.footer} />
    </div>
  );
}
