const scrollHeader = () => {
  const header = document.getElementById("header");
  this.scrollY >= 50
    ? header.classList.add("scroll-header")
    : header.classList.remove("scroll-header");
};
window.addEventListener("scroll", scrollHeader);

/*=============== PRODUCTOS SWIPER ===============*/
let swiperProducts = new Swiper(".products__container", {
  spaceBetween: 32,
  grabCursor: true,
  centeredSlider: true,
  slidePerView: "auto",
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

// Datos de productos
const products = [
  {
    id: 1,
    name: "Chaqueta Gotland negra",
    price: 124.99,
    image: "./assets/img/product1.png",
  },
  {
    id: 2,
    name: "Shorts deportivos negros",
    price: 34.99,
    image: "./assets/img/product2.png",
  },
  {
    id: 3,
    name: "Chaqueta acolchada Knox",
    price: 97.99,
    image: "./assets/img/product3.png",
  },
  {
    id: 4,
    name: "Pantalones deportivos azules",
    price: 69.99,
    image: "./assets/img/product4.png",
  },
];

let cart = [];

// Función para agregar productos al carrito
function addToCart(productId) {
  const product = products.find((p) => p.id == productId);
  if (product) {
    cart.push(product);
    updateCart();
    alert(`Has agregado "${product.name}" al carrito.`);
  }
}

// Función para actualizar el carrito en la vista con lazy loading en las imágenes
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((product, index) => {
    total += product.price;
    const div = document.createElement("div");
    div.classList.add("cart__item");
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="cart__img" loading="lazy" />
      <div class="cart__details">
        <h4>${product.name}</h4>
        <span>$${product.price.toFixed(2)}</span>
        <button onclick="removeFromCart(${index})" class="cart__remove">Eliminar</button>
      </div>
    `;
    cartItems.appendChild(div);
  });

  cartTotal.innerText = total.toFixed(2);
  cartCount.innerText = cart.length;
}

// Eliminación de productos del carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Vincular botones de agregar al carrito
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.getAttribute("data-id");
    addToCart(productId);
  });
});

// Mostrar y ocultar el carrito
const cartOverlay = document.getElementById("cart-overlay");
const cartButton = document.getElementById("cart-button");
const cartClose = document.getElementById("cart-close");

cartButton.addEventListener("click", () => {
  cartOverlay.style.display = "flex";
});

cartClose.addEventListener("click", () => {
  cartOverlay.style.display = "none";
});

// Finalizar la compra
document.getElementById("checkout-button").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
  } else {
    alert("Compra realizada con éxito.");
    cart = [];
    updateCart();
    cartOverlay.style.display = "none";
  }
});

/*=============== SCROLLEAR LAS SECCIONES ===============*/
const sections = document.querySelectorAll("section[id]");
const scrollActive = () => {
  const scrollY = window.pageYOffset;
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

// Mostrar el botón de subir cuando se hace scroll
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  this.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);

/*=============== MODO OSCURO ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](iconTheme);
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
});
sr.reveal(`.home__data, .products__container, .footer__container, .footer__info`);
sr.reveal(`.home__images`, { delay: 500, origin: "bottom" });
sr.reveal(`.new__card, .brand__img`, { interval: 100 });
sr.reveal(`.collection__explore:nth-child(1)`, { origin: "right" });
sr.reveal(`.collection__explore:nth-child(2)`, { origin: "left" });

/*=============== LAZY LOADING FOR SECTIONS ===============*/
document.addEventListener("DOMContentLoaded", function () {
  const lazySections = document.querySelectorAll(".lazy-section");

  const lazyLoadSection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible-section");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(lazyLoadSection, {
    rootMargin: "0px 0px -10% 0px",
  });

  lazySections.forEach((section) => {
    observer.observe(section);
  });
});
