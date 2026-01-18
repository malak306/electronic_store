/* =========================
   ElectroMarket Cart System
   Works on ALL pages
========================= */

const CART_KEY = "electromarket_cart";

/* Get cart from localStorage */
function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

/* Save cart to localStorage */
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

/* Update cart badge count */
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = count;
  });
}

/* Add item to cart */
function addToCart(id, name, price, image) {
  let cart = getCart();

  const existing = cart.find(item => item.id == id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: id,
      name: name,
      price: parseFloat(price),
      image: image,
      quantity: 1
    });
  }

  saveCart(cart);

  alert("✅ Added to cart!");
}

/* Remove item */
function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id != id);
  saveCart(cart);
  loadCartPage();
}

/* Change quantity */
function changeQty(id, action) {
  let cart = getCart();
  const item = cart.find(i => i.id == id);

  if (!item) return;

  if (action === "plus") item.quantity += 1;
  if (action === "minus") item.quantity -= 1;

  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id != id);
  }

  saveCart(cart);
  loadCartPage();
}

/* Load cart page items */
function loadCartPage() {
  const cart = getCart();
  const container = document.getElementById("cart-items-list");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-message">
        <i class="fas fa-shopping-cart fa-3x"></i>
        <h3>Your cart is empty</h3>
        <p>Add some products to your cart to see them here</p>
        <a href="category-item-card.html" class="btn btn-primary">
          <i class="fas fa-store"></i> Browse Products
        </a>
      </div>
    `;

    document.getElementById("cart-subtotal").textContent = "$0.00";
    document.getElementById("cart-tax").textContent = "$0.00";
    document.getElementById("cart-shipping").textContent = "$0.00";
    document.getElementById("cart-total").textContent = "$0.00";

    document.getElementById("checkout-btn").disabled = true;
    return;
  }

  let subtotal = 0;

  container.innerHTML = cart.map(item => {
    subtotal += item.price * item.quantity;

    return `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>

        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>

          <div class="cart-item-quantity">
            <button class="quantity-btn" onclick="changeQty('${item.id}', 'minus')">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn" onclick="changeQty('${item.id}', 'plus')">+</button>
          </div>
        </div>

        <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>

        <button class="remove-item" onclick="removeFromCart('${item.id}')">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
  }).join("");

  const shipping = subtotal > 0 ? 5 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  document.getElementById("cart-subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("cart-shipping").textContent = `$${shipping.toFixed(2)}`;
  document.getElementById("cart-tax").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("cart-total").textContent = `$${total.toFixed(2)}`;

  document.getElementById("checkout-btn").disabled = false;
}

/* Checkout */
function checkout() {
  alert("✅ Checkout system not implemented yet.");
}

/* Auto run on every page */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  loadCartPage();
});
