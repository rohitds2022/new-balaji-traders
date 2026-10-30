const SHOP = {
  name: "New Balaji Traders",
  nameHi: "न्यू बालाजी ट्रेडर्स",
  phone: "9075007601",
  phoneDisplay: "+91 90750 07601",
  whatsapp: "917385842821",
  whatsappDisplay: "+91 73858 42821",
  address: "Sr. No. 5/3, Sayali Park No. 2, in front of Ganesh Temple, near Jeevan Jyoti Hospital and Ranka Jewellers, Vijay Sales Road, Rahatani, Pune - 411017",
  addressHi: "सर्वे नं. 5/3, सायली पार्क नं. 2, गणेश मंदिर के सामने, जीवन ज्योति हॉस्पिटल और रांका ज्वेलर्स के पास, विजय सेल्स रोड, रहतानी, पुणे - 411017",
  hours: "Every day, 7:00 AM – 10:00 PM",
  hoursHi: "हर दिन, सुबह 7 बजे से रात 10 बजे",
  isPlaceholder: false
};

const CART_KEY = "nbt-wa-cart";

const state = {
  category: "all",
  query: "",
  cart: loadCart()
};

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || "{}");
    return saved && typeof saved === "object" ? saved : {};
  } catch (error) {
    return {};
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
}

function cartCount() {
  return Object.values(state.cart).reduce((sum, item) => sum + item.qty, 0);
}

function setQty(product, qty) {
  if (qty <= 0) {
    delete state.cart[product.id];
  } else {
    state.cart[product.id] = {
      id: product.id,
      name: product.name,
      nameHi: product.nameHi,
      pack: product.pack,
      price: wholesalePrice(product),
      qty: qty
    };
  }
  saveCart();
  updateOrderButton();
  renderProducts();
}

function changeQty(product, delta) {
  const current = state.cart[product.id] ? state.cart[product.id].qty : 0;
  setQty(product, current + delta);
}

function wholesalePrice(product) {
  return Math.round(product.mrp * (1 - product.discount / 100));
}

function formatINR(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

function categoryOf(id) {
  return CATEGORIES.find((category) => category.id === id);
}

function waLink(message) {
  return "https://wa.me/" + SHOP.whatsapp + "?text=" + encodeURIComponent(message);
}

function cartMessage() {
  const items = Object.values(state.cart);
  if (!items.length) {
    return (
      "Namaste " + SHOP.name + ",\n" +
      "I want to place a wholesale grocery order with free home delivery. Please share today's rates."
    );
  }
  const lines = items.map((item, index) => {
    return (index + 1) + ". " + item.name + " / " + item.nameHi + " (" + item.pack + ") x " + item.qty + " — " + formatINR(item.price) + " each";
  });
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    "Namaste " + SHOP.name + ",\n" +
    "Please confirm this WhatsApp cart (" + cartCount() + " items):\n" +
    lines.join("\n") + "\n" +
    "Sample total: " + formatINR(total) + "\n" +
    "Free home delivery. Please confirm today's rate."
  );
}

function fillContact() {
  document.querySelectorAll("[data-shop-phone]").forEach((node) => {
    node.textContent = SHOP.phoneDisplay;
  });
  document.querySelectorAll("[data-shop-whatsapp]").forEach((node) => {
    node.textContent = SHOP.whatsappDisplay;
  });
  document.querySelectorAll("[data-shop-address]").forEach((node) => {
    node.textContent = SHOP.address;
  });
  document.querySelectorAll("[data-shop-address-hi]").forEach((node) => {
    node.textContent = SHOP.addressHi;
  });
  document.querySelectorAll("[data-shop-hours]").forEach((node) => {
    node.textContent = SHOP.hours;
  });
  document.querySelectorAll("[data-shop-hours-hi]").forEach((node) => {
    node.textContent = SHOP.hoursHi;
  });
  document.querySelectorAll("[data-tel]").forEach((node) => {
    node.href = "tel:+91" + SHOP.phone;
  });
  document.querySelectorAll("[data-place-order]").forEach((node) => {
    node.addEventListener("click", (event) => {
      event.preventDefault();
      window.open(waLink(cartMessage()), "_blank", "noopener");
    });
  });

  const notice = document.querySelector("[data-placeholder-notice]");
  if (notice) {
    notice.hidden = !SHOP.isPlaceholder;
  }
}

function renderFilters() {
  const bar = document.querySelector("[data-filters]");
  bar.innerHTML = CATEGORIES.map((category) => {
    const pressed = category.id === state.category ? "true" : "false";
    return (
      '<button type="button" class="chip" data-category="' + category.id + '" aria-pressed="' + pressed + '">' +
        "<span>" + category.en + "</span>" +
        '<span class="chip-hi" lang="hi">' + category.hi + "</span>" +
      "</button>"
    );
  }).join("");

  bar.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.getAttribute("data-category");
      renderFilters();
      renderProducts();
    });
  });
}

function visibleProducts() {
  const query = state.query.trim().toLowerCase();
  return PRODUCTS.filter((product) => {
    const categoryMatch = state.category === "all" || product.category === state.category;
    if (!categoryMatch) return false;
    if (!query) return true;
    const haystack = (product.name + " " + product.nameHi + " " + product.pack).toLowerCase();
    return haystack.includes(query);
  });
}

function renderProducts() {
  const grid = document.querySelector("[data-grid]");
  const count = document.querySelector("[data-count]");
  const products = visibleProducts();
  count.textContent = products.length + " items";

  if (!products.length) {
    grid.innerHTML =
      '<p class="empty">No match. Try another name, or send your list on WhatsApp.</p>';
    return;
  }

  grid.innerHTML = products.map((product) => {
    const category = categoryOf(product.category);
    const price = wholesalePrice(product);
    const qty = state.cart[product.id] ? state.cart[product.id].qty : 0;
    return (
      '<article class="card">' +
        '<div class="photo">' +
          '<img src="images/' + product.id + '.jpg" alt="' + product.name + '" width="960" height="720" loading="lazy">' +
          '<span class="badge">' + product.discount + "% off</span>" +
        "</div>" +
        "<h3>" + product.name + "</h3>" +
        '<p class="hi" lang="hi">' + product.nameHi + "</p>" +
        '<p class="meta">' + product.pack + " · " + category.en + "</p>" +
        '<div class="prices">' +
          '<div><span class="label">MRP</span><span class="mrp">' + formatINR(product.mrp) + "</span></div>" +
          '<div><span class="label">Price</span><span class="sale">' + formatINR(price) + "</span></div>" +
        "</div>" +
        '<div class="qty" data-id="' + product.id + '">' +
          '<button type="button" data-minus aria-label="Decrease ' + product.name + '">−</button>' +
          "<span>" + qty + "</span>" +
          '<button type="button" data-plus aria-label="Increase ' + product.name + '">+</button>' +
        "</div>" +
      "</article>"
    );
  }).join("");

  grid.querySelectorAll(".qty").forEach((row) => {
    const product = PRODUCTS.find((item) => item.id === row.getAttribute("data-id"));
    row.querySelector("[data-minus]").addEventListener("click", () => changeQty(product, -1));
    row.querySelector("[data-plus]").addEventListener("click", () => changeQty(product, 1));
  });
}

function updateOrderButton() {
  const count = cartCount();
  document.querySelectorAll("[data-cart-count]").forEach((node) => {
    node.textContent = String(count);
    node.hidden = count === 0;
  });
}

function bindSearch() {
  const input = document.querySelector("[data-search]");
  input.addEventListener("input", () => {
    state.query = input.value;
    renderProducts();
  });
}

fillContact();
renderFilters();
bindSearch();
renderProducts();
updateOrderButton();
