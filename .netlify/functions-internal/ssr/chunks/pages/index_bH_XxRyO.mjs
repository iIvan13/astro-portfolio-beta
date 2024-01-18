import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, k as renderSlot, g as renderComponent } from '../astro_ueF1Yx1r.mjs';
import { $ as $$Layout } from './about_CpuqMrM8.mjs';
/* empty css                             */
/* empty css                          */

const $$Astro$1 = createAstro();
const $$Button = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Button;
  const { link, dataAos } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(link, "href")}${addAttribute(dataAos, "data-aos")} data-aos-duration="2000" data-astro-cid-vnzlvqnm> ${renderSlot($$result, $$slots["default"])} </a> `;
}, "/mnt/sda2/Portafolio (copia)/src/components/Button.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Ivan", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section data-astro-cid-j7pv25f6> <article data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <h1 data-astro-cid-j7pv25f6> <span class="blue__text intro-welcome" data-aos="zoom-in-dowm" data-aos-duration="1000" data-astro-cid-j7pv25f6>Welcome, my name is</span> <span data-astro-cid-j7pv25f6>Ivan.</span> </h1> <h2 class="intro" data-aos="fade-up" data-aos-duration="1500" data-astro-cid-j7pv25f6>I create engaging and dynamic web experiences.</h2> </div> <p data-aos="fade-up" data-aos-duration="2000" data-astro-cid-j7pv25f6>
Front-end developer specializing in <span class="blue__text" translate="no" data-astro-cid-j7pv25f6>React</span> and <span class="blue__text" translate="no" data-astro-cid-j7pv25f6>Astro</span> frameworks, skilled
        in crafting dynamic and efficient user interfaces.
</p> ${renderComponent($$result2, "Button", $$Button, { "link": "/projects", "dataAos": "zoom-in-up", "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate`
See my projects <i class="ri-arrow-right-s-line" data-astro-cid-j7pv25f6></i> ` })} </article>  </section> ` })}`;
}, "/mnt/sda2/Portafolio (copia)/src/pages/index.astro", void 0);

const $$file = "/mnt/sda2/Portafolio (copia)/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Button as $, index as i };
