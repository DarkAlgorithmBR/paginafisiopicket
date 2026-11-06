# Página de vendas — FisioPocket

Projeto React + Vite pronto para publicação na Vercel ou no Cloudflare Pages.

## Rodar localmente

```bash
npm install
npm run dev
```

O arquivo `index.html` da raiz também pode ser aberto diretamente com duplo clique, sem servidor. Ele é uma prévia autônoma gerada a partir do último build.

## Gerar a versão de produção

```bash
npm ci
npm run build
```

O site pronto será gerado na pasta `dist/`.

O build também atualiza automaticamente o `index.html` autônomo da raiz. O arquivo `app.html` é a entrada de desenvolvimento usada pelo Vite.

## Publicar na Vercel

1. Envie esta pasta para um repositório Git ou importe-a diretamente na Vercel.
2. A Vercel reconhecerá o arquivo `vercel.json`.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Node.js: 20.

## Publicar no Cloudflare Pages

1. Crie um projeto no Cloudflare Pages e conecte o repositório.
2. Framework preset: `Vite`.
3. Build command: `npm run build`.
4. Build output directory: `dist`.
5. Variável de ambiente recomendada: `NODE_VERSION=20`.

Os arquivos `public/_redirects` e `public/_headers` já configuram o fallback da SPA e o cache dos assets.

## Checkout

O botão principal da oferta de R$ 47 está conectado a:

`https://pay.wiapy.com/6aed3305371815cbec32d341`

Os demais botões da página direcionam o visitante para a seção principal da oferta.

A oferta de entrada apresenta o Pack Básico com mais de 150 mapas mentais, sem as ferramentas complementares, por R$ 17. No card, somente o acesso aos mapas aparece ativo; os demais itens ficam visualmente apagados como não incluídos. Ao clicar no botão, o visitante recebe primeiro a oferta especial do FisioPocket completo por R$ 27:

- checkout do FisioPocket completo por R$ 27: `https://pay.wiapy.com/mD35xqp5UT6u`;
- opção de continuar somente com o Pack Básico por R$ 17: `https://pay.wiapy.com/0-zz7QX2u8v`.

## Antes da publicação definitiva

Edite `src/comercial.js` e preencha o e-mail de suporte, a empresa ou responsável legal e as URLs reais dos termos de uso e da política de privacidade.

