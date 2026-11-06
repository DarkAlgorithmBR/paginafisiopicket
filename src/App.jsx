import { Children, cloneElement, useEffect, useRef, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  Calculator,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  FileText,
  Gift,
  Layers3,
  ListChecks,
  SearchCheck,
  ShieldCheck
} from 'lucide-react';
import { content } from './content.js';
import { comercial } from './comercial.js';

const painIcons = [Layers3, BookOpen, AlertTriangle, SearchCheck, ClipboardCheck, FileText];
const mechanismIcons = [Layers3, SearchCheck, BookOpen, ListChecks];
const bonusIcons = [SearchCheck, FileText, ClipboardCheck, Calculator];

const heroMaps = [
  ['/assets/mapas-hero/mapa-03-instabilidade-glenoumeral.webp', 'Instabilidade glenoumeral e luxação'],
  ['/assets/mapas-hero/mapa-04-capsulite-adesiva.webp', 'Capsulite adesiva'],
  ['/assets/mapas-hero/mapa-08-testes-ombro.webp', 'Testes especiais de ombro'],
  ['/assets/mapas-hero/mapa-01-impacto-subacromial.webp', 'Síndrome do impacto subacromial']
];

function CTA({ label = 'QUERO ACESSAR O FISIOPOCKET', href = '#oferta', disabled = false }) {
  if (disabled) {
    return <span className="btn btn--disabled" aria-disabled="true">CHECKOUT EM CONFIGURAÇÃO</span>;
  }
  const external = /^https?:\/\//.test(href);
  return <a className="btn" href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{label}<span aria-hidden="true">→</span></a>;
}

function SectionTitle({ children, lead }) {
  return <header className="section-title"><h2>{children}</h2>{lead && <p>{lead}</p>}</header>;
}

function ProductComposition({ maps = heroMaps, compact = false, seal = false, priority = false, label }) {
  const [left, middle, right, cover] = maps;
  return <div className={`product-composition${compact ? ' product-composition--compact' : ''}`} role="group" aria-label={label}>
    <img className="product-sheet product-sheet--left" src={left[0]} alt={left[1]} loading="lazy" decoding="async" fetchPriority={priority ? 'low' : 'auto'} />
    <img className="product-sheet product-sheet--middle" src={middle[0]} alt={middle[1]} loading="lazy" decoding="async" fetchPriority={priority ? 'low' : 'auto'} />
    <img className="product-sheet product-sheet--right" src={right[0]} alt={right[1]} loading="lazy" decoding="async" fetchPriority={priority ? 'low' : 'auto'} />
    <img className="product-cover" src={cover[0]} alt={cover[1]} loading={priority ? 'eager' : 'lazy'} decoding="async" fetchPriority={priority ? 'high' : 'auto'} />
    {seal && <span className="quantity-seal" aria-label="Mais de 150 mapas mentais"><strong>+150</strong><span>MAPAS<br/>MENTAIS</span></span>}
  </div>;
}

function ScrollRail({ children, label, className = '', auto = false, interval = 2800 }) {
  const ref = useRef(null);
  const pausedRef = useRef(false);
  const visibleRef = useRef(false);
  const resumeTimerRef = useRef(null);
  const normalizeTimerRef = useRef(null);
  const items = Children.toArray(children);
  const renderedItems = auto
    ? [...items, ...items.map((child, index) => cloneElement(child, { key: `loop-${index}`, 'aria-hidden': true }))]
    : items;

  const cycleWidth = () => {
    const rail = ref.current;
    if (!rail || rail.children.length <= items.length) return 0;
    return rail.children[items.length].offsetLeft - rail.children[0].offsetLeft;
  };

  const normalize = () => {
    const rail = ref.current;
    const width = cycleWidth();
    if (rail && width && rail.scrollLeft >= width) rail.scrollLeft -= width;
  };

  const pauseTemporarily = () => {
    pausedRef.current = true;
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => { pausedRef.current = false; }, 4200);
  };

  const move = direction => {
    const rail = ref.current;
    if (!rail) return;
    pauseTemporarily();
    const width = cycleWidth();
    if (direction < 0 && width && rail.scrollLeft <= 2) rail.scrollLeft = width;
    rail.scrollBy({ left: direction * rail.clientWidth * .82, behavior: 'smooth' });
    window.clearTimeout(normalizeTimerRef.current);
    normalizeTimerRef.current = window.setTimeout(normalize, 700);
  };

  useEffect(() => {
    if (!auto || !ref.current) return undefined;
    const rail = ref.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(([entry]) => { visibleRef.current = entry.isIntersecting; }, { threshold: .18 });
    observer.observe(rail);
    const timer = window.setInterval(() => {
      if (reduceMotion.matches || pausedRef.current || !visibleRef.current || document.hidden) return;
      const firstItem = rail.children[0];
      const secondItem = rail.children[1];
      const step = secondItem ? secondItem.offsetLeft - firstItem.offsetLeft : rail.clientWidth * .82;
      rail.scrollBy({ left: step, behavior: 'smooth' });
      window.clearTimeout(normalizeTimerRef.current);
      normalizeTimerRef.current = window.setTimeout(normalize, 700);
    }, interval);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
      window.clearTimeout(resumeTimerRef.current);
      window.clearTimeout(normalizeTimerRef.current);
    };
  }, [auto, interval, items.length]);

  return <div className={`rail-stage ${className}`}>
    <button type="button" className="rail-arrow rail-arrow--left" onClick={() => move(-1)} aria-label={`Ver anteriores em ${label}`}><ChevronLeft /></button>
    <div
      className={`rail${auto ? ' rail--loop' : ''}`}
      ref={ref}
      tabIndex="0"
      aria-label={label}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onFocus={() => { pausedRef.current = true; }}
      onBlur={() => { pausedRef.current = false; }}
      onPointerDown={() => { pausedRef.current = true; }}
      onPointerUp={pauseTemporarily}
      onTouchEnd={pauseTemporarily}
    >{renderedItems}</div>
    <button type="button" className="rail-arrow rail-arrow--right" onClick={() => move(1)} aria-label={`Ver próximos em ${label}`}><ChevronRight /></button>
  </div>;
}

export default function App() {
  const [discountOpen, setDiscountOpen] = useState(false);
  const usageScenes = [
    ['/assets/mapas-neuro-webp/mapa-60-treino-marcha-descarga-peso.webp', 'Treino de marcha e descarga de peso no paciente neurológico'],
    ['/assets/mapas-neuro-webp/mapa-51-ave-isquemico-hemorragico.webp', 'Acidente vascular encefálico isquêmico e hemorrágico'],
    ['/assets/mapas-neuro-webp/mapa-52-recuperacao-pos-ave-flacidez-espasticidade.webp', 'Recuperação pós-AVE, flacidez e espasticidade'],
    ['/assets/mapas-neuro-webp/mapa-53-doenca-parkinson.webp', 'Doença de Parkinson, tríade, fisiopatologia e marcha'],
    ['/assets/mapas-neuro-webp/mapa-54-tce-escala-glasgow.webp', 'Traumatismo cranioencefálico e escala de Glasgow'],
    ['/assets/mapas-neuro-webp/mapa-55-trm-escala-asia.webp', 'Traumatismo raquimedular e escala ASIA'],
    ['/assets/mapas-neuro-webp/mapa-56-esclerose-multipla-fadiga.webp', 'Esclerose múltipla, quadro clínico e fadiga'],
    ['/assets/mapas-neuro-webp/mapa-57-paralisia-cerebral-gmfcs.webp', 'Paralisia cerebral infantil e GMFCS'],
    ['/assets/mapas-neuro-webp/mapa-58-conceito-bobath.webp', 'Conceito Bobath, fundamentos e inibição'],
    ['/assets/mapas-neuro-webp/mapa-59-fnp-kabat.webp', 'Facilitação neuromuscular proprioceptiva, FNP e Kabat']
  ];

  useEffect(() => {
    if (!discountOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setDiscountOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [discountOpen]);

  return <>
    <main>
      <section className="hero"><div className="content content--860 hero-flow">
        <p className="hero-pill"><span aria-hidden="true" />{content.hero.badge}</p>
        <h1>{content.hero.title}</h1>
        <div className="hero-media"><ProductComposition seal priority label="Composição com quatro mapas reais do FisioPocket" /></div>
        <p className="hero-sub">{content.hero.subtitle}</p>
        <CTA label="VER O FISIOPOCKET POR DENTRO" href="#oferta" />
        <ul className="hero-bullets">{content.hero.bullets.map(item => <li key={item}><Check size={20}/><span>{item}</span></li>)}</ul>
        <p className="amplitude-proof">{content.hero.amplitude}</p>
      </div></section>

      <section className="section pain"><div className="content content--880 section-flow">
        <SectionTitle>{content.pain.title}<br/>{content.pain.emphasis}</SectionTitle>
        <div className="ornament" aria-hidden="true"><span /></div>
        <div className="pain-grid">{content.pains.map((item,index)=>{const Icon=painIcons[index];return <div className="pain-chip" key={item}><Icon size={18}/><span>{item}</span></div>})}</div>
      </div></section>

      <section className="section section--tint gallery" id="previas"><div className="content content--1180 section-flow">
        <SectionTitle lead="Deslize pelas páginas reais e confira a organização visual, os diagramas e os pontos de consulta de cada mapa.">Veja o FisioPocket por dentro antes de decidir.</SectionTitle>
        <ScrollRail label="Páginas reais do FisioPocket" className="gallery-rail" auto interval={2600}>
          {content.gallery.map(([src,title])=><figure className="gallery-card" key={title}><img src={src} alt={`Mapa de ${title}`} loading="lazy" decoding="async"/></figure>)}
        </ScrollRail>
      </div></section>

      <section className="section mechanism"><div className="content content--1120 section-flow">
        <SectionTitle>Um mapa para cada assunto da coleção. Uma ferramenta para cada tarefa clínica incluída.</SectionTitle>
        <div className="mechanism-grid">{content.mechanism.map(([title,text],index)=>{const Icon=mechanismIcons[index];return <article key={title}><span className="mechanism-icon"><Icon size={25}/></span><h3>{title}</h3><p>{text}</p></article>})}</div>
        <p className="mechanism-close">Você revisa o assunto e encontra o apoio correspondente sem trocar de método a cada etapa.</p>
        <CTA />
      </div></section>

      <section className="usage-carousel" aria-label="Demonstração das páginas do FisioPocket">
        <div className="content content--860 usage-heading">
          <p>CONSULTA VISUAL</p>
          <h2>Mapas completos para revisar conceitos, testes e condutas acadêmicas.</h2>
          <span>As páginas mantêm a mesma estrutura visual para facilitar a localização das informações durante a revisão.</span>
        </div>
        <ScrollRail label="Seleção de mapas do FisioPocket" className="usage-rail" auto interval={3100}>
          {usageScenes.map(([src,alt])=><figure className="usage-photo" key={src}><img src={src} alt={alt} loading="lazy" decoding="async"/></figure>)}
        </ScrollRail>
      </section>

      <section className="section mid-pitch"><div className="content content--1040 mid-pitch-grid">
        <div className="mid-pitch-media map-frame"><img src="/assets/mapas-webp/mapa-02-lesao-manguito-rotador.webp" alt="Mapa sobre lesão do manguito rotador" loading="lazy" decoding="async"/></div>
        <div className="mid-pitch-copy"><h2>Quantas vezes você já estudou um assunto e precisou procurar tudo de novo quando chegou à prática?</h2><p>O FisioPocket reúne revisão por área e ferramentas para tarefas acadêmicas, permitindo retomar o conteúdo e seguir para avaliação, teste ou registro.</p><CTA label="QUERO LEVAR O FISIOPOCKET COMIGO" /></div>
      </div></section>

      <section className="section audiences"><div className="content content--1040 section-flow">
        <SectionTitle>O FisioPocket faz sentido para você que precisa</SectionTitle>
        <div className="audience-grid">{content.audiences.map(([title,text])=><article key={title}><span><Check size={17}/></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </div></section>

      <section className="section section--tint receive"><div className="content content--1000 section-flow">
        <SectionTitle>Revisão por área e ferramentas clínicas no mesmo acesso.</SectionTitle>
        <div className="receive-media app-screenshot-frame"><img src="/assets/app-fisiopocket.jpeg" alt="Tela real do aplicativo FisioPocket com categorias clínicas e mapas mentais" loading="lazy" decoding="async" /></div>
        <article className="receive-card"><p className="access-badge">✦ MAIS DE 150 MAPAS MENTAIS + {content.bonuses.length} BÔNUS</p><h3>{content.hero.badge}</h3><p>Abra a área que está estudando, localize o assunto e use as ferramentas incluídas quando a atividade pedir avaliação, teste, escala ou registro.</p><ul>{content.benefits.map(item=><li key={item}><Check size={20}/><span>{item}</span></li>)}</ul></article>
      </div></section>

      <section className="section bonuses"><div className="content content--980 section-flow">
        <header className="bonus-intro"><p>CONSULTAR, ORGANIZAR E REGISTRAR</p><h2>QUATRO FERRAMENTAS COMPLEMENTARES</h2><span><Gift size={17}/>{content.bonuses.length} BÔNUS INCLUÍDOS</span></header>
        <div className="bonus-grid">{content.bonuses.map((bonus,index)=>{const BonusIcon=bonusIcons[index];return <article className="bonus-card" key={bonus.title}>
          <div className="bonus-card-top"><p className="bonus-num">{bonus.number}</p><span className="bonus-icon-art" aria-hidden="true"><BonusIcon/></span></div>
          <div className="bonus-card-body"><h3>{bonus.title}</h3><p>{bonus.text}</p><div className="bonus-gain"><Check size={18}/><span>{bonus.gain}</span></div><div className="bonus-price"><strong>INCLUÍDO</strong></div></div>
        </article>})}</div>
      </div></section>

      <section className="section offer" id="oferta"><div className="content content--720 section-flow">
        <SectionTitle>Tudo o que estará no seu acesso ao FisioPocket</SectionTitle>
        <div className="value-stack" aria-label="Itens incluídos na oferta"><p>O QUE VOCÊ RECEBE</p><ul>{content.included.map(item=><li key={item}><span>{item}</span><strong>INCLUÍDO</strong></li>)}</ul></div>
        <article className="plan-card">
          <p className="plan-badge">MAIS DE 150 MAPAS + {content.bonuses.length} BÔNUS</p>
          <p className="plan-kicker">OFERTA COMPLETA</p><h3>FisioPocket</h3>
          <div className="plan-mockup"><ProductComposition maps={heroMaps} compact label="Composição compacta dos mapas reais incluídos" /></div>
          <ul>{content.included.map(item=><li key={item}><Check size={20}/><span>{item}</span></li>)}</ul>
          <div className="price"><small>Investimento</small><strong>{comercial.price}</strong><span>{comercial.installments}</span></div>
          <CTA href={comercial.checkoutUrl} disabled={comercial.checkoutPending}/>
          <div className="payment-trust"><span><ShieldCheck size={18}/>Garantia de 7 dias</span><span><Activity size={18}/>Pix ou cartão</span></div>
        </article>
        <div className="offer-separator"><span>OU COMECE PELO PACK BÁSICO</span></div>
        <article className="plan-card plan-card--entry">
          <p className="plan-badge">MAIS DE 150 MAPAS MENTAIS</p>
          <p className="plan-kicker">OFERTA DE ENTRADA</p><h3>Pack Básico</h3>
          <div className="plan-mockup"><ProductComposition maps={heroMaps} compact label="Composição dos mapas incluídos no Pack Básico" /></div>
          <ul className="basic-inclusions">{content.included.map((item,index)=><li className={index === 0 ? 'is-included' : 'is-unavailable'} key={item}><Check size={20}/><span>{item}{index > 0 && <small>NÃO INCLUÍDO</small>}</span></li>)}</ul>
          <div className="price"><small>Oferta especial</small><strong>R$ 17,00</strong><span>pagamento único</span></div>
          <button className="btn entry-offer-trigger" type="button" onClick={() => setDiscountOpen(true)}>QUERO O PACK BÁSICO POR R$ 17<span aria-hidden="true">→</span></button>
          <div className="payment-trust"><span><ShieldCheck size={18}/>Garantia de 7 dias</span><span><Activity size={18}/>Pix ou cartão</span></div>
        </article>
      </div></section>

      <section className="section purchase-safety"><div className="content content--1000 safety-layout">
        <article className="guarantee-card"><ShieldCheck size={54}/><h2>Garantia incondicional de 7 dias</h2><p>{comercial.guarantee}</p></article>
        <div className="safety-cards">
          <article><BookOpen size={30}/><div><h3>Apoio acadêmico</h3><p>Mapas e ferramentas para estudo. O produto não substitui aulas, prática, supervisão ou protocolos institucionais.</p></div></article>
          <article><Calculator size={30}/><div><h3>Ferramentas informadas</h3><p>Testes especiais, roteiro SOAP, avaliações clínicas, calculadoras e escalas fazem parte da oferta descrita.</p></div></article>
        </div>
      </div></section>

      <section className="section faq"><div className="content content--780 section-flow"><SectionTitle>Perguntas frequentes</SectionTitle><div className="faq-list">{content.faqs.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>

      <section className="closing"><div className="content content--780 closing-inner"><p>DA TEORIA À TAREFA ACADÊMICA</p><h2>{content.hero.title}</h2><span className="closing-lead">Escolha a área, retome o assunto e consulte a ferramenta correspondente quando a atividade acadêmica pedir o próximo passo.</span><CTA/><small>Sete dias para conhecer o material e solicitar reembolso integral se não fizer sentido para você.</small></div></section>
    </main>
    {discountOpen && <div className="discount-modal" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDiscountOpen(false); }}>
      <section className="discount-dialog" role="dialog" aria-modal="true" aria-labelledby="discount-title">
        <button className="discount-close" type="button" onClick={() => setDiscountOpen(false)} aria-label="Fechar oferta especial">×</button>
        <p className="discount-badge">OFERTA ESPECIAL LIBERADA</p>
        <h2 id="discount-title">Leve o FisioPocket completo por apenas R$ 27</h2>
        <p className="discount-copy">Antes de continuar somente com os 150 mapas do Pack Básico, aproveite esta condição para liberar também todas as ferramentas complementares.</p>
        <div className="discount-mockup"><ProductComposition maps={heroMaps} compact label="FisioPocket completo com mais de 150 mapas mentais" /></div>
        <ul>
          <li><Check size={20}/><span>Mais de 150 mapas mentais</span></li>
          <li><Check size={20}/><span>Seis conjuntos temáticos</span></li>
          <li><Check size={20}/><span>Buscador, SOAP, avaliações, calculadoras e escalas</span></li>
        </ul>
        <div className="discount-price"><small>De R$ 47 por</small><strong>R$ 27,00</strong><span>Você economiza R$ 20</span></div>
        <a className="btn" href={comercial.discountCheckoutUrl} target="_blank" rel="noopener noreferrer">SIM, QUERO O COMPLETO POR R$ 27<span aria-hidden="true">→</span></a>
        <a className="discount-decline" href={comercial.entryCheckoutUrl} target="_blank" rel="noopener noreferrer">Não, quero somente o Pack Básico por R$ 17</a>
      </section>
    </div>}
    <footer className="footer"><div className="footer-inner"><p>Suporte: {comercial.supportEmail}</p><p className="footer-legal">Material de apoio acadêmico. Não substitui formação, supervisão profissional, avaliação individual nem protocolos institucionais.</p><p>{comercial.company}</p><nav><a href={comercial.termsUrl}>Termos de uso</a><span>•</span><a href={comercial.privacyUrl}>Política de privacidade</a></nav></div></footer>
  </>;
}

