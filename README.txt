VMP SaaS — Landing Page Redesign v2.4.1
========================================

ESTRUTURA DE FICHEIROS
----------------------
/
├── index.html                  ← Landing page principal (NOVO DESIGN)
├── dashboard.html              ← Painel remoto (atualizado)
├── termos.html                 ← Termos de uso (atualizado)
├── privacidade.html            ← Política de privacidade (atualizado)
├── manifest.json               ← PWA manifest
├── dashboard-manifest.json     ← PWA manifest do dashboard
├── robots.txt                  ← SEO robots
├── sw.js                       ← Service Worker
├── assets/
│   ├── css/style.css           ← Estilos principais (NOVO)
│   ├── js/script.js            ← JavaScript principal (NOVO)
│   ├── js/i18n.js              ← Traduções (placeholder)
│   └── images/
│       ├── logo.png            ← Logo VMP
│       ├── icon-192.png        ← Ícone PWA
│       ├── icon-512.png        ← Ícone PWA
│       └── gallery/            ← PASTA PARA SCREENSHOTS

IMAGENS DA GALERIA — INSTRUÇÕES
--------------------------------
Para a secção "Galeria" funcionar correctamente, captura screenshots
das principais telas do software VMP SaaS e guarda-as nesta pasta:

    assets/images/gallery/

Nomes dos ficheiros (obrigatório):

1. pos-screen.jpg       ← Tela principal do Ponto de Venda (POS)
2. stock-screen.jpg     ← Tela de Gestão de Stock / Armazéns
3. accounting-screen.jpg← Tela de Contabilidade / Balancete
4. dashboard-screen.jpg ← Tela do Dashboard Remoto (web)
5. customers-screen.jpg ← Tela de Gestão de Clientes
6. reports-screen.jpg   ← Tela de Relatórios / Analytics

Formato recomendado: JPG ou PNG
Resolução recomendada: 1920x1080 ou 1280x720
Tamanho máximo: ~500KB cada (para performance)

Se não tiveres todas as screenshots de momento, a landing page mostra
uma mensagem informativa a indicar onde colocar as imagens.

DICAS PARA CAPTURAR
-------------------
- Usa o Snipping Tool (Windows) ou ShareX para capturar
- Captura em modo janela maximizada para consistência
- Evita dados sensíveis de clientes reais nas screenshots
- Se possível, usa dados de demonstração (demo data)

NOVIDADES DESTE REDESIGN
--------------------------
✓ Fontes: Space Grotesk (títulos) + Inter (corpo)
✓ Fundo animado: Canvas com partículas/nebula (interactivo com rato)
✓ Hero: Título em 3 linhas de impacto + mockup CSS do software
✓ Secção Galeria: Grid masonry para screenshots
✓ Secção Criador: "Conhece o criador do VMP SaaS" com link para adamgy.vmpsaas.com
✓ YouTube: Link @vmpsaas no contacto e footer
✓ Textos: Curtos, diretos, em PT-MZ
✓ Cores: Dark navy fiel ao software (#0B1120, #0F172A, #1E293B)
✓ Alta conversão: CTAs claros, WhatsApp flutuante, estatísticas animadas

DEPLOY
------
Faz upload de todos os ficheiros para a raiz do teu domínio (vmpsaas.com).
Certifica-te de que a pasta assets/images/gallery/ existe, mesmo que vazia.

Suporte: contacto@vmpsaas.com | +258 84 616 6104
