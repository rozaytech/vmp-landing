/* =========================================================
   VMP SaaS — Main JavaScript (StoreGo Redesign)
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {

  // ---------- Header scroll ----------
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // ---------- Mobile nav ----------
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
    // Fechar menu ao clicar num link
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
      });
    });
  }

  // ---------- Scroll to top ----------
  const scrollTop = document.getElementById('scrollTop');
  if (scrollTop) {
    window.addEventListener('scroll', () => {
      scrollTop.classList.toggle('visible', window.scrollY > 500);
    });
    scrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Smooth scroll ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const pos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });

  // ---------- Blog Modal ----------
  const blogModal = document.getElementById('blogModal');
  const blogModalTitle = document.getElementById('blogModalTitle');
  const blogModalBody = document.getElementById('blogModalBody');
  const blogModalClose = document.getElementById('blogModalClose');
  const blogModalBackdrop = blogModal ? blogModal.querySelector('.blog-modal-backdrop') : null;

  const blogPosts = {
    1: {
      title: 'O Que É Um ERP E Porque O Teu Negócio Precisa De Um',
      body: `<p>ERP é um sistema que junta todas as áreas do teu negócio num só sítio. Vendas, stock, contabilidade e clientes deixam de estar espalhados por folhas Excel ou cadernos. Tudo fica centralizado e acessível em segundos.</p>
      <p>Em Moçambique, muitos negócios perdem dinheiro porque não sabem o que tem em stock ou quanto realmente lucram. Um ERP mostra-te os números em tempo real, sem calculadora. Sabes exactamente o que entra, o que sai e o que sobra.</p>
      <p>O VMP SaaS foi feito a pensar no mercado moçambicano. Funciona offline, tem IVA 16% integrado e gera SAF-T para a AT. Não precisas de internet para vender nem para consultar relatórios.</p>
      <p>Começa com o trial de 7 dias e vê a diferença no teu caixa. Quem gere com números, cresce com segurança.</p>`
    },
    2: {
      title: '5 Dicas Para Controlar O Stock Da Tua Loja',
      body: `<p>Stock mal gerado é dinheiro parado ou vendas perdidas. A primeira dica é simples: conta tudo o que entra e tudo o que sai. Sem excepções. Se não registras, não controlas.</p>
      <p>Usa o sistema de alertas automáticos. Define um stock mínimo para cada produto e recebe aviso antes de acabar. Assim, nunca deixas um cliente na mão e evitas encomendas de urgência a preços mais altos.</p>
      <p>Faz contagens físicas pelo menos uma vez por mês. O que o sistema diz nem sempre bate com a prateleira. Quanto mais cedo descobres a diferença, menos perdes. Roubo, deterioração ou erro humano são reais.</p>
      <p>Separa o stock do armazém geral do stock do ponto de venda. O VMP SaaS faz isso automaticamente. Sabes sempre onde está cada unidade e quanto podes vender sem comprometer a reserva.</p>`
    },
    3: {
      title: 'Como Emitir Facturas Com IVA 16% Em Moçambique',
      body: `<p>Desde 2023, a Autoridade Tributária exige que as facturas tenham hash e número sequencial único. Não basta escrever num papel e entregar ao cliente. O documento precisa de validade legal.</p>
      <p>O IVA em Moçambique é de 16% e deve aparecer claramente na factura. O VMP SaaS calcula automaticamente o valor do imposto e inclui no total. Zero erros de matemática e zero problemas com a AT.</p>
      <p>Para empresas com volume alto, o SAF-T XML é obrigatório trimestralmente. O VMP exporta o ficheiro pronto a submeter no portal da AT. Poupas horas de trabalho e dormes descansado.</p>
      <p>Se o cliente pedir nota de crédito ou devolução, o sistema gera o documento com a mesma segurança. Tudo registrado, tudo dentro da lei. A tua contabilidade fica impecável.</p>`
    },
    4: {
      title: 'Como Aumentar As Vendas No Ponto De Venda',
      body: `<p>O caixa é o sítio onde o cliente já decidiu comprar. Aproveita esse momento com upsell simples: "Quer levar mais um por metade do preço?" Funciona melhor do que parece. O cliente sente que ganha e tu aumentas o ticket médio.</p>
      <p>Cria promoções sazonais no VMP SaaS em menos de um minuto. Descontos por quantidade, vouchers e preços especiais para clientes frequentes. O sistema aplica sozinho. Não precisas de fazer contas de cabeça.</p>
      <p>Conhece os teus clientes. Guarda o NUIT, o telefone e o histórico de compras. Quando voltares a ver o nome no ecrã, trata-o como quem já te deu confiança. Clientes fiéis compram mais e trazem amigos.</p>
      <p>Velocidade no POS é dinheiro. Quanto mais rápido passares os produtos, mais clientes atendes por hora. O VMP tem atalhos de teclado e leitor de código de barras. Não há filas e não há clientes impacientes.</p>`
    }
  };

  function openBlogModal(id) {
    const post = blogPosts[id];
    if (!post || !blogModal || !blogModalTitle || !blogModalBody) return;
    blogModalTitle.textContent = post.title;
    blogModalBody.innerHTML = post.body;
    blogModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeBlogModal() {
    if (!blogModal) return;
    blogModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (blogModalClose) blogModalClose.addEventListener('click', closeBlogModal);
  if (blogModalBackdrop) blogModalBackdrop.addEventListener('click', closeBlogModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeBlogModal(); });

  document.querySelectorAll('.blog-card, .blog-link').forEach(el => {
    el.addEventListener('click', function(e) {
      const link = this.classList.contains('blog-link') ? this : this.querySelector('.blog-link');
      const id = link ? link.dataset.blogId : null;
      if (id) {
        e.preventDefault();
        openBlogModal(id);
      }
    });
  });

  // ---------- Register Service Worker ----------
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('SW registered:', reg.scope))
      .catch(err => console.log('SW registration failed:', err));
  }

});