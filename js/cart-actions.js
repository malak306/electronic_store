/* ===========================
   Cart System (ElectroMarket)
   Works with: localStorage
=========================== */

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = totalQty;
  });
}

/* ✅ Add item */
function addToCart(id, name, price, image) {
  id = String(id);

  const cart = getCart();
  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id,
      name,
      price: Number(price),
      image,
      qty: 1,
    });
  }

  saveCart(cart);
  updateCartCount();

  alert("✅ Added to cart!");
}

/* ✅ Remove item */
function removeFromCart(id) {
  id = String(id);

  let cart = getCart();
  cart = cart.filter((item) => item.id !== id);
  saveCart(cart);

  renderCartPage();
  updateCartCount();
}

/* ✅ Change quantity */
function changeQty(id, delta) {
  id = String(id);

  const cart = getCart();
  const item = cart.find((p) => p.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }

  saveCart(cart);
  renderCartPage();
  updateCartCount();
}

/* ✅ Render cart in cart.html */
function renderCartPage() {
  const cart = getCart();

  const list = document.getElementById("cart-items-list");
  if (!list) return;

  const checkoutBtn = document.getElementById("checkout-btn");

  if (cart.length === 0) {
    list.innerHTML = `
      <div class="empty-cart-message">
        <i class="fas fa-shopping-cart fa-3x"></i>
        <h3>Your cart is empty</h3>
        <p>Add some products to your cart to see them here</p>
        <a href="category-item-card.html" class="btn btn-primary">
          <i class="fas fa-store"></i> Browse Products
        </a>
      </div>
    `;

    if (checkoutBtn) checkoutBtn.disabled = true;

    // totals
    setTotals(0);
    return;
  }

  let subtotal = 0;

  list.innerHTML = cart
    .map((item) => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;

      return `
        <div class="cart-item">
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>

          <div class="cart-item-details">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>

            <div class="cart-item-quantity">
              <button class="quantity-btn" onclick="changeQty('${item.id}', -1)">−</button>
              <span class="quantity-value">${item.qty}</span>
              <button class="quantity-btn" onclick="changeQty('${item.id}', 1)">+</button>
            </div>
          </div>

          <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>

          <button class="remove-item" onclick="removeFromCart('${item.id}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
    })
    .join("");

  if (checkoutBtn) checkoutBtn.disabled = false;

  setTotals(subtotal);
}

/* ✅ Totals */
function setTotals(subtotal) {
  const shipping = subtotal > 0 ? 5 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const subtotalEl = document.getElementById("cart-subtotal");
  const shippingEl = document.getElementById("cart-shipping");
  const taxEl = document.getElementById("cart-tax");
  const totalEl = document.getElementById("cart-total");

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (shippingEl) shippingEl.textContent = `$${shipping.toFixed(2)}`;
  if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

/* ✅ checkout */
function checkout() {
  const cart = getCart();
  if (cart.length === 0) return alert("Cart is empty!");

  alert("✅ Checkout done (Demo). Cart will be cleared.");
  localStorage.removeItem("cart");

  renderCartPage();
  updateCartCount();
}

/* ✅ init on every page */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCartPage();
});
