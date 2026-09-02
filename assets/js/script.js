/* =========================================================
   VMP SaaS — Main JavaScript (Redesign v2.4.1)
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {

  // ---------- Header scroll ----------
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // ---------- Mobile nav ----------
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      mainNav.classList.toggle('open');
    });
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
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

  // ---------- Stats counter ----------
  const statNums = document.querySelectorAll('.stat-num');
  if (statNums.length && 'IntersectionObserver' in window) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const suffix = el.textContent.replace(/[0-9]/g, '');
          let current = 0;
          const increment = target / 60;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = Math.floor(current) + suffix;
          }, 25);
          statObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => statObserver.observe(el));
  }

  // ---------- Intersection observer for fade-in ----------
  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.feature-card, .pricing-card, .gallery-item, .contact-card, .blog-card, .module-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      fadeObserver.observe(el);
    });
  }

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

  document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('click', function(e) {
      const link = this.querySelector('.blog-link');
      const id = link ? link.dataset.blogId : null;
      if (id) {
        e.preventDefault();
        openBlogModal(id);
      }
    });
  });

  document.querySelectorAll('.blog-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.stopPropagation();
      const id = this.dataset.blogId;
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

  // ---------- Hero Canvas (adiado para não bloquear LCP) ----------
  function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let time = 0;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Linhas de tendência (reduzido de 3 para 2 para menor complexidade)
    const trendLines = [
      { color: '59,130,246', speed: 0.008, amplitude: 60, offset: 0, yBase: 0.35 },
      { color: '139,92,246', speed: 0.006, amplitude: 45, offset: 2, yBase: 0.55 }
    ];

    // Barras de progresso (reduzido de 6 para 4)
    const progressBars = [
      { x: 0.08, y: 0.22, width: 0.12, height: 6, color: '59,130,246', progress: 0, target: 0.85, speed: 0.008 },
      { x: 0.08, y: 0.26, width: 0.12, height: 6, color: '139,92,246', progress: 0, target: 0.65, speed: 0.006 },
      { x: 0.75, y: 0.18, width: 0.10, height: 5, color: '59,130,246', progress: 0, target: 0.72, speed: 0.007 },
      { x: 0.75, y: 0.21, width: 0.10, height: 5, color: '16,185,129', progress: 0, target: 0.88, speed: 0.009 }
    ];

    // Números flutuantes (reduzido de 5 para 3)
    const floatingNumbers = [
      { text: '12,450 MZN', x: 0.15, y: 0.12, color: '59,130,246', size: 14, opacity: 0, targetOpacity: 0.35, speed: 0.003 },
      { text: '+23%', x: 0.82, y: 0.10, color: '16,185,129', size: 12, opacity: 0, targetOpacity: 0.30, speed: 0.004 },
      { text: '847', x: 0.20, y: 0.82, color: '139,92,246', size: 13, opacity: 0, targetOpacity: 0.25, speed: 0.002 }
    ];

    // Pontos de dados (reduzido de 30 para 15)
    const dataPoints = [];
    for (let i = 0; i < 15; i++) {
      dataPoints.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 2 + 1,
        color: Math.random() > 0.6 ? '59,130,246' : (Math.random() > 0.5 ? '139,92,246' : '16,185,129'),
        alpha: Math.random() * 0.15 + 0.05,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    // Grid lines (mantido)
    const gridLines = [];
    for (let i = 1; i < 6; i++) {
      gridLines.push({ y: i / 6, alpha: 0.04 });
    }
    for (let i = 1; i < 8; i++) {
      gridLines.push({ x: i / 8, alpha: 0.03, isVertical: true });
    }

    function drawTrendLine(line) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${line.color}, 0.25)`;
      ctx.lineWidth = 2;
      for (let x = 0; x <= width; x += 3) {
        const nx = x / width;
        const y = height * line.yBase + Math.sin(nx * 8 + time * line.speed * 100 + line.offset) * line.amplitude * (height / 800);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = `rgba(${line.color}, 0.03)`;
      for (let x = 0; x <= width; x += 3) {
        const nx = x / width;
        const y = height * line.yBase + Math.sin(nx * 8 + time * line.speed * 100 + line.offset) * line.amplitude * (height / 800);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();
    }

    function drawProgressBar(bar) {
      const bx = bar.x * width;
      const by = bar.y * height;
      const bw = bar.width * width;
      const bh = bar.height;

      ctx.fillStyle = 'rgba(30,41,59,0.3)';
      ctx.beginPath();
      ctx.roundRect(bx, by, bw, bh, bh / 2);
      ctx.fill();

      bar.progress += (bar.target - bar.progress) * bar.speed;
      ctx.fillStyle = `rgba(${bar.color}, 0.4)`;
      ctx.beginPath();
      ctx.roundRect(bx, by, bw * bar.progress, bh, bh / 2);
      ctx.fill();
    }

    function drawFloatingNumber(num) {
      num.opacity += (num.targetOpacity - num.opacity) * num.speed;
      const floatY = Math.sin(time * 0.5 + num.x * 10) * 8;
      ctx.font = `600 ${num.size}px 'Space Grotesk', sans-serif`;
      ctx.fillStyle = `rgba(${num.color}, ${num.opacity})`;
      ctx.fillText(num.text, num.x * width, num.y * height + floatY);
    }

    function drawDataPoint(point) {
      const pulse = Math.sin(time * point.pulseSpeed + point.pulseOffset) * 0.5 + 0.5;
      const alpha = point.alpha * (0.5 + pulse * 0.5);
      ctx.beginPath();
      ctx.arc(point.x * width, point.y * height, point.r * (0.8 + pulse * 0.4), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${point.color}, ${alpha})`;
      ctx.fill();
    }

    function drawGrid() {
      gridLines.forEach(line => {
        ctx.strokeStyle = `rgba(148,163,184,${line.alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (line.isVertical) {
          ctx.moveTo(line.x * width, 0);
          ctx.lineTo(line.x * width, height);
        } else {
          ctx.moveTo(0, line.y * height);
          ctx.lineTo(width, line.y * height);
        }
        ctx.stroke();
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      drawGrid();
      trendLines.forEach(drawTrendLine);
      progressBars.forEach(drawProgressBar);
      dataPoints.forEach(drawDataPoint);
      floatingNumbers.forEach(drawFloatingNumber);

      requestAnimationFrame(animate);
    }
    animate();
  }

  // Adiar o canvas para após o carregamento completo
  if ('requestIdleCallback' in window) {
    requestIdleCallback(initHeroCanvas);
  } else {
    window.addEventListener('load', () => {
      setTimeout(initHeroCanvas, 150);
    });
  }
});