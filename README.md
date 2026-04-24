# 🪐 Landing Page - Sistema Orbit

Bem-vindo ao repositório oficial da Landing Page do **Sistema Orbit**. Esta é uma aplicação web moderna, focada em performance, animações fluidas (estilo *Awwwards*) e uma experiência de usuário (UX) premium.

## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as tecnologias mais modernas do ecossistema web:

- **[Next.js](https://nextjs.org/)**: Framework React para desenvolvimento web e roteamento (App Router).
- **[React](https://reactjs.org/)**: Biblioteca de construção de interface de usuário.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática para maior segurança e previsibilidade do código.
- **[Framer Motion](https://www.framer.com/motion/)**: Biblioteca para animações fluidas, complexas e micro-interações.
- **[Lenis](https://lenis.studiofreight.com/)**: Rolagem suave (Smooth Scroll) para uma navegação imersiva e cinematográfica.
- **CSS Modules / Globals**: Estilização altamente customizada garantindo design responsivo e exclusivo.

## ✨ Principais Funcionalidades

- **Design Cinemático**: Efeitos de *parallax*, desfoque (blur) avançado e fundo espacial com estrelas em movimento.
- **Custom Cursor**: Um cursor magnético customizado que interage e reage aos elementos de clique da tela.
- **Smooth Scroll**: Rolagem super suave otimizada que se integra perfeitamente aos efeitos de animação ao descer a página.
- **Multilíngue (i18n)**: Suporte dinâmico para alteração do idioma (Português, Inglês e Espanhol).
- **Totalmente Responsivo**: O layout adapta-se de forma elegante a todos os tamanhos de telas e dispositivos mobile.
- **Otimização de SEO**: Configurações sólidas de metadata visando indexação correta nos motores de busca e compartilhamento em redes sociais.

## 🛠️ Como Executar o Projeto Localmente

Siga os passos abaixo para rodar a aplicação no seu ambiente de desenvolvimento:

### Pré-requisitos
- [Node.js](https://nodejs.org/en/) (versão 18.17 ou superior recomendada)
- NPM, Yarn ou pnpm.

### Passos

1. **Clone o repositório:**
```bash
git clone https://github.com/EniJunioor/Lp-Orbit.git
```

2. **Navegue até a pasta do projeto:**
```bash
cd orbit-lp
```

3. **Instale as dependências:**
```bash
npm install
```

4. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

5. **Acesse no navegador:**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado ao vivo.

## 📁 Estrutura do Projeto

- `/src/app`: Páginas, Layout principal e arquivos base de roteamento (Next.js App Router).
- `/src/components`: Componentes da UI altamente reutilizáveis (`Navbar`, `HeroScene`, `ProductShowcase`, `CustomCursor`, `SmoothScroll`, etc).
- `/src/lib`: Bibliotecas, utilitários lógicos e configurações (ex: `i18n.ts`).
- `/public`: Ativos estáticos, como imagens (SVG, PNG) e arquivos públicos.

## 📝 Scripts Disponíveis

- `npm run dev`: Inicia a aplicação em modo de desenvolvimento (Hot-reload).
- `npm run build`: Compila a versão otimizada para produção.
- `npm start`: Inicia a aplicação usando o build de produção (requer `npm run build` prévio).
- `npm run lint`: Executa a análise estática do código em busca de erros de formatação com o ESLint.
