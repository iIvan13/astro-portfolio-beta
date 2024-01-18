export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';

const page = () => import('./pages/index_bH_XxRyO.mjs').then(n => n.i);

export { page };
