const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const cartCount = document.querySelector(".bag-count");
const bagButton = document.querySelector(".bag-button");
const toast = document.querySelector(".toast");
const colorName = document.querySelector(".selected-color");
const productArt = document.querySelector(".product-art");
let itemsInBag = 0;
let toastTimer;

const colors = {
  moss: { name: "Moss", fabric: "#66735c" },
  clay: { name: "Clay", fabric: "#a56f55" },
  ink: { name: "Ink", fabric: "#424a4d" }
};

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  primaryNav.classList.toggle("is-open", !isExpanded);
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    primaryNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }
});

document.querySelectorAll(".swatch").forEach((swatch) => {
  swatch.addEventListener("click", () => {
    const color = colors[swatch.dataset.color];
    document.querySelectorAll(".swatch").forEach((option) => {
      const selected = option === swatch;
      option.classList.toggle("is-selected", selected);
      option.setAttribute("aria-pressed", String(selected));
    });
    colorName.textContent = color.name;
    productArt.style.setProperty("--pack-color", color.fabric);
    productArt.querySelector("#pack-title").textContent = `The Everyday Pack in ${color.name.toLowerCase()}`;
    productArt.querySelector("#pack-desc").textContent = `An illustrated ${color.name.toLowerCase()} 20-liter backpack with a roll top, front pocket, and side water bottle.`;
  });
});

document.querySelectorAll(".thumbnail").forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    document.querySelectorAll(".thumbnail").forEach((option) => {
      const selected = option === thumbnail;
      option.classList.toggle("is-selected", selected);
      option.setAttribute("aria-pressed", String(selected));
    });
    productArt.classList.remove("view-side", "view-detail");
    if (thumbnail.dataset.view !== "front") productArt.classList.add(`view-${thumbnail.dataset.view}`);
    document.querySelector(".frame-index").innerHTML = `0${index + 1} <span>/</span> 03`;
  });
});

document.querySelectorAll(".wishlist-button").forEach((button) => {
  button.addEventListener("click", () => {
    const isSaved = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", String(!isSaved));
    button.setAttribute("aria-label", isSaved ? "Add to wishlist" : "Remove from wishlist");
    showToast(isSaved ? "Removed from your wishlist." : "Saved to your wishlist.");
  });
});

document.querySelectorAll(".add-to-bag").forEach((button) => {
  button.addEventListener("click", () => {
    itemsInBag += 1;
    cartCount.textContent = String(itemsInBag);
    bagButton.setAttribute("aria-label", `Shopping bag, ${itemsInBag} ${itemsInBag === 1 ? "item" : "items"}`);
    showToast(`The Everyday Pack is in your bag. (${itemsInBag} ${itemsInBag === 1 ? "item" : "items"})`);
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}
