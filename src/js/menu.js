function menuToggle() {
  const hamburgerMenu = document.querySelector(".hamburger");
  const nav = document.getElementById("nav-toogle");
  const header = document.querySelector(".header");

  function scrollBlock() {
    let elemento = document.documentElement;
    let scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    elemento.style.overflow = "hidden";
    elemento.style.position = "fixed";
    elemento.style.width = "100%";
    elemento.style.height = "100%";
    elemento.style.top = -scrollTop + "px";
    elemento.style.left = -scrollLeft + "px";
  }

  function scrollUnblock() {
    let elemento = document.documentElement;

    elemento.style.overflow = "";
    elemento.style.position = "";
    elemento.style.width = "";
    elemento.style.height = "";
    elemento.style.top = "";
    elemento.style.left = "";
  }

  const menuIsActive = () => {
    hamburgerMenu.classList.toggle("active");
    nav.classList.toggle("active");
    header.classList.toggle("active");
    hamburgerMenu.classList.contains("active")
      ? scrollBlock()
      : scrollUnblock();
  };

  hamburgerMenu.addEventListener("click", menuIsActive);
}

menuToggle();
document.addEventListener("astro:after-swap", menuToggle);
