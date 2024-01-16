import AOS from "aos";

function animeAos() {
  AOS.init();
}

animeAos();
document.addEventListener("astro:after-swap", animeAos);
