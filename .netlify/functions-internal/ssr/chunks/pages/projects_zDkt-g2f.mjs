import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, k as renderSlot, g as renderComponent, F as Fragment } from '../astro_ueF1Yx1r.mjs';
import { $ as $$Layout } from './about_CpuqMrM8.mjs';
import { $ as $$Button } from './index_bH_XxRyO.mjs';
/* empty css                             */

const $$Astro$1 = createAstro();
const $$ProjectCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ProjectCard;
  const { title, image, projectLink, sourceCode, projectYear, tags, isOpenSource } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="project-card" data-aos="fade-up" data-aos-duration="1500" data-astro-cid-mspuyifq> <div class="card" data-astro-cid-mspuyifq> <div class="project-year" data-astro-cid-mspuyifq>${projectYear}</div> <div data-astro-cid-mspuyifq> <h2 data-astro-cid-mspuyifq> ${title} ${isOpenSource && renderTemplate`<a${addAttribute(sourceCode, "href")} class="open-source" data-astro-cid-mspuyifq>
Open Source
</a>`} </h2> ${renderSlot($$result, $$slots["subtitle"])} ${renderSlot($$result, $$slots["description"])} <div class="tags" data-astro-cid-mspuyifq> ${tags.map((tag) => renderTemplate`<img${addAttribute(tag, "src")} data-astro-cid-mspuyifq>`)} </div> <div class="buttons-links" data-astro-cid-mspuyifq> ${projectLink && renderTemplate`${renderComponent($$result, "Button", $$Button, { "link": projectLink, "data-astro-cid-mspuyifq": true }, { "default": ($$result2) => renderTemplate`
View Project
<svg style="margin-left: 5px;" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" data-astro-cid-mspuyifq> ${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-mspuyifq": true }, { "default": ($$result3) => renderTemplate` <path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z" data-astro-cid-mspuyifq></path> <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z" data-astro-cid-mspuyifq></path> ` })} </svg> ` })}`} ${sourceCode && renderTemplate`${renderComponent($$result, "Button", $$Button, { "link": sourceCode, "data-astro-cid-mspuyifq": true }, { "default": ($$result2) => renderTemplate`
View Source Code
<svg style="margin-left: 5px;" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" data-astro-cid-mspuyifq> <path d="m7.375 16.781 1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4a1 1 0 0 0 0 1.562l5 4zm9.25-9.562-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4a1 1 0 0 0 0-1.562l-5-4zm-1.649-4.003-4 18-1.953-.434 4-18z" stroke="none" data-astro-cid-mspuyifq></path> </svg> ` })}`} </div> </div> <img${addAttribute(image, "src")} alt="" class="image" data-astro-cid-mspuyifq> </div> </article> `;
}, "/mnt/sda2/Portafolio (copia)/src/components/ProjectCard.astro", void 0);

const $$Astro = createAstro();
const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Projects;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Projects", "data-astro-cid-aid3sr62": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<header data-astro-cid-aid3sr62> <h1 data-astro-cid-aid3sr62> <span class="blue__text" data-astro-cid-aid3sr62>/&nbsp</span>Projects
</h1> <p data-aos="zoom-in" data-aos-duration="800" data-astro-cid-aid3sr62>
Explore my portfolio, where you will find a variety of projects that I
      have carried out.
</p> </header> <section data-astro-cid-aid3sr62> ${renderComponent($$result2, "ProjectCard", $$ProjectCard, { "tags": ["https://lukeliasi.com/images/dev-logos/javascript.svg"], "isOpenSource": true, "image": "/projectsImages/project.png", "title": "NextCent", "projectYear": "2022", "projectLink": "https://quinceplayers.com", "data-astro-cid-aid3sr62": true }, { "description": ($$result3) => renderTemplate`<div data-astro-cid-aid3sr62> <p data-astro-cid-aid3sr62>
When initialized, the script reads database connection URIs from
          environment variables.
</p> <p data-astro-cid-aid3sr62>
Scheduled through a cron job, it dumps the databases, compresses the
          data, and transfers the files to a predetermined AWS S3 bucket.
</p> </div>`, "subtitle": ($$result3) => renderTemplate`<p data-astro-cid-aid3sr62>
This script is designed to automate the process of backing up various
        databases to AWS S3. It supports PostgreSQL, MySQL, and MongoDB.
</p>` })} ${renderComponent($$result2, "ProjectCard", $$ProjectCard, { "tags": ["https://lukeliasi.com/images/dev-logos/javascript.svg"], "isOpenSource": true, "image": "https://lukeliasi.com/images/databaseS3Backups-portfolio.png", "title": "NextCent", "projectYear": "2022", "projectLink": "https://quinceplayers.com", "data-astro-cid-aid3sr62": true }, { "description": ($$result3) => renderTemplate`<div data-astro-cid-aid3sr62> <p data-astro-cid-aid3sr62>
When initialized, the script reads database connection URIs from
          environment variables.
</p> <p data-astro-cid-aid3sr62>
Scheduled through a cron job, it dumps the databases, compresses the
          data, and transfers the files to a predetermined AWS S3 bucket.
</p> </div>`, "subtitle": ($$result3) => renderTemplate`<p data-astro-cid-aid3sr62>
This script is designed to automate the process of backing up various
        databases to AWS S3. It supports PostgreSQL, MySQL, and MongoDB.
</p>` })} </section> ` })} `;
}, "/mnt/sda2/Portafolio (copia)/src/pages/projects.astro", void 0);

const $$file = "/mnt/sda2/Portafolio (copia)/src/pages/projects.astro";
const $$url = "/projects";

export { $$Projects as default, $$file as file, $$url as url };
