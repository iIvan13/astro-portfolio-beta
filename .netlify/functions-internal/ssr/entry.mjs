import * as adapter from '@astrojs/netlify/ssr-function.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_AP7NX-og.mjs';

const _page0  = () => import('./chunks/generic_srXJTd9N.mjs');
const _page1  = () => import('./chunks/index_xd7QG0m8.mjs');
const _page2  = () => import('./chunks/contacts_rGGV7Vj8.mjs');
const _page3  = () => import('./chunks/projects_A_w8w7TN.mjs');
const _page4  = () => import('./chunks/about_MACuvSJv.mjs');
const _page5  = () => import('./chunks/sendEmail_WzwxpwVM.mjs');const pageMap = new Map([["node_modules/.pnpm/astro@4.0.4_typescript@5.2.2/node_modules/astro/dist/assets/endpoint/generic.js", _page0],["src/pages/index.astro", _page1],["src/pages/contacts.astro", _page2],["src/pages/projects.astro", _page3],["src/pages/about.astro", _page4],["src/pages/api/sendEmail.json.ts", _page5]]);
const _manifest = Object.assign(manifest, {
	pageMap,
	renderers,
});
const _args = undefined;

const _exports = adapter.createExports(_manifest, _args);
const _default = _exports['default'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { _default as default, pageMap };
