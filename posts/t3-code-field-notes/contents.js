const contents = document.querySelector(".chapters details");
const wide = window.matchMedia("(min-width: 54.01rem)");
const links = [...contents.querySelectorAll("nav a")];
const headings = links.map(link => document.querySelector(link.hash));

function setContentsLayout() {
  contents.open = wide.matches;
}

function updateActiveHeading() {
  let current = null;
  for (const heading of headings) {
    if (heading.getBoundingClientRect().top > 110) break;
    current = heading.id;
  }
  for (const link of links) {
    if (link.hash === "#" + current) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
}

contents.querySelector("nav").addEventListener("click", event => {
  if (!wide.matches && event.target.closest("a")) contents.open = false;
});
wide.addEventListener("change", setContentsLayout);
window.addEventListener("scroll", updateActiveHeading, { passive: true });
setContentsLayout();
updateActiveHeading();
