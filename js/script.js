// ============================================
// ELECTROMARKET - COMPLETE JAVASCRIPT
// ============================================

// GLOBAL VARIABLES
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('electro_user')) || null;

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('ElectroMarket - JS Initialized');
    
    // Initialize cart
    updateCartCount();
    
    // Initialize How It Works section
    initHowItWorks();
    
    // Initialize product pages
    initProductPages();
    
    // Initialize cart page if exists
    if (document.getElementById('cart-items-list')) {
        initCartPage();
    }
    
    // Initialize forms
    initForms();
    
    // Initialize filter buttons
    initFilterButtons();
});

// ============================================
// HOW IT WORKS SECTION - FIXED VERSION
// ============================================

function initHowItWorks() {
    console.log('Initializing How It Works section...');
    
    const roleButtons = document.querySelectorAll('.role-btn');
    const roleSections = document.querySelectorAll('.role-section');
    
    if (roleButtons.length === 0) {
        console.log('No role buttons found - How It Works section not on this page');
        return;
    }
    
    console.log(`Found ${roleButtons.length} role buttons`);
    
    // Function to switch between sections
    function switchRole(role) {
        console.log(`Switching to: ${role}`);
        
        // Update active button
        roleButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.role === role) {
                btn.classList.add('active');
            }
        });
        
        // Show/hide sections
        roleSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === `${role}-section`) {
                section.classList.add('active');
            }
        });
    }
    
    // Add click event to buttons
    roleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const role = this.dataset.role;
            console.log(`Button clicked: ${role}`);
            switchRole(role);
        });
    });
    
    console.log('How It Works section initialized successfully');
}

// ============================================
// FILTER BUTTONS
// ============================================

function initFilterButtons() {
    // Gaming filters
    const gamingFilters = document.querySelectorAll('.gaming-filter-btn');
    if (gamingFilters.length > 0) {
        gamingFilters.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Update active button
                gamingFilters.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter products
                const products = document.querySelectorAll('.gaming-card');
                products.forEach(product => {
                    if (filter === 'all' || product.dataset.type === filter) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Accessories filters
    const accessoriesFilters = document.querySelectorAll('.accessories-filter-btn');
    if (accessoriesFilters.length > 0) {
        accessoriesFilters.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Update active button
                accessoriesFilters.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter products
                const products = document.querySelectorAll('.accessories-card');
                products.forEach(product => {
                    if (filter === 'all' || product.dataset.type === filter) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Computer filters
    const computerFilters = document.querySelectorAll('.filter-btn');
    if (computerFilters.length > 0) {
        computerFilters.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Update active button
                computerFilters.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter products
                const products = document.querySelectorAll('.computer-card');
                products.forEach(product => {
                    if (filter === 'all' || product.dataset.type === filter) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });
    }
}

// ============================================
// CART FUNCTIONS
// ============================================

function updateCartCount() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = 0;
    
    cart.forEach(item => {
        totalItems += item.quantity || 1;
    });
    
    // Update all cart count elements
    document.querySelectorAll('.cart-count').forEach(element => {
        element.textContent = totalItems;
        element.style.display = totalItems > 0 ? 'flex' : 'none';
    });
    
    return totalItems;
}

function addToCart(id, name, price, image) {
    console.log('Adding to cart:', { id, name, price });
    
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists
    const existingIndex = cart.findIndex(item => item.id === id);
    
    if (existingIndex !== -1) {
        // Update quantity
        cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
        // Add new item
        cart.push({
            id: id,
            name: name,
            price: parseFloat(price),
            image: image || 'https://via.placeholder.com/100',
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update UI
    updateCartCount();
    
    // Show notification
    showNotification(`${name} added to cart!`, 'success');
    
    // Visual feedback on button
    const button = event.target.closest('.add-to-cart-btn') || event.target;
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Added!';
    button.style.background = '#28a745';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.background = '';
        button.disabled = false;
    }, 1500);
    
    return false; // For onclick handlers
}

// ============================================
// CART PAGE FUNCTIONS
// ============================================

function initCartPage() {
    loadCartItems();
    
    // Initialize checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
}

function loadCartItems() {
    const cartItemsList = document.getElementById('cart-items-list');
    if (!cartItemsList) return;
    
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = `
            <div class="empty-cart-message">
                <i class="fas fa-shopping-cart fa-3x"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to your cart to see them here</p>
                <a href="category-item-card.html" class="btn btn-primary">
                    <i class="fas fa-store"></i> Browse Products
                </a>
            </div>
        `;
        updateCartSummary(0);
        return;
    }
    
    let html = '';
    let subtotal = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * (item.quantity || 1);
        subtotal += itemTotal;
        
        html += `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" 
                         onerror="this.src='https://via.placeholder.com/100'">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} each</p>
                    <div class="cart-item-quantity">
                        <button class="btn btn-small" onclick="updateQuantity(${index}, -1)">-</button>
                        <span>${item.quantity || 1}</span>
                        <button class="btn btn-small" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div class="cart-item-total">
                    $${itemTotal.toFixed(2)}
                </div>
                <button class="btn btn-outline btn-small" onclick="removeItem(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });
    
    cartItemsList.innerHTML = html;
    updateCartSummary(subtotal);
}

function updateQuantity(index, change) {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart[index]) {
        let newQuantity = (cart[index].quantity || 1) + change;
        if (newQuantity < 1) newQuantity = 1;
        
        cart[index].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        
        loadCartItems();
        updateCartCount();
        showNotification(`Quantity updated to ${newQuantity}`);
    }
}

function removeItem(index) {
    if (confirm('Remove this item from cart?')) {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemName = cart[index].name;
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        loadCartItems();
        updateCartCount();
        showNotification(`${itemName} removed from cart`, 'success');
    }
}

function updateCartSummary(subtotal) {
    const shipping = subtotal > 0 ? 9.99 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    // Update DOM elements
    const subtotalEl = document.getElementById('cart-subtotal');
    const shippingEl = document.getElementById('cart-shipping');
    const taxEl = document.getElementById('cart-tax');
    const totalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = `$${shipping.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    if (checkoutBtn) checkoutBtn.disabled = subtotal === 0;
}

function checkout() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'warning');
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => {
        return sum + (item.price * (item.quantity || 1));
    }, 0);
    
    const shipping = subtotal > 0 ? 9.99 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    const confirmCheckout = confirm(`
        🛒 Confirm Checkout
        
        Items: ${cart.length}
        Subtotal: $${subtotal.toFixed(2)}
        Shipping: $${shipping.toFixed(2)}
        Tax: $${tax.toFixed(2)}
        Total: $${total.toFixed(2)}
        
        Click OK to proceed.
    `);
    
    if (confirmCheckout) {
        // Clear cart
        localStorage.removeItem('cart');
        cart = [];
        
        // Update UI
        updateCartCount();
        if (document.getElementById('cart-items-list')) {
            loadCartItems();
        }
        
        showNotification('Order placed successfully! Thank you for your purchase.', 'success');
    }
}

// ============================================
// PRODUCT PAGES
// ============================================

function initProductPages() {
    // Add event listeners to all "Add to Cart" buttons with data attributes
    document.querySelectorAll('.add-to-cart-btn[data-id]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productId = this.dataset.id;
            const productName = this.dataset.name;
            const productPrice = this.dataset.price;
            const productImage = this.dataset.image;
            
            addToCart(productId, productName, productPrice, productImage);
        });
    });
    
    // Also support onclick handlers
    document.querySelectorAll('.add-to-cart-btn[onclick*="addToCart"]').forEach(button => {
        // They already have onclick handlers, no need to add another
    });
}

// ============================================
// FORM VALIDATION
// ============================================

function initForms() {
    // Login form validation
    const loginForm = document.querySelector('form[action*="login"]');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const email = this.querySelector('input[name="email"]').value;
            const password = this.querySelector('input[name="password"]').value;
            
            if (!email || !password) {
                e.preventDefault();
                showNotification('Please fill in all fields', 'error');
                return false;
            }
        });
    }
    
    // Register form validation
    const registerForm = document.querySelector('form[action*="register"]');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            const password = this.querySelector('input[name="password"]').value;
            const confirmPassword = this.querySelector('input[name="confirm_password"]').value;
            
            if (password !== confirmPassword) {
                e.preventDefault();
                showNotification('Passwords do not match', 'error');
                return false;
            }
            
            if (password.length < 6) {
                e.preventDefault();
                showNotification('Password must be at least 6 characters', 'error');
                return false;
            }
        });
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            this.reset();
        });
    }
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 
                          type === 'error' ? 'exclamation-circle' : 
                          'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
    `;
    
    // Set color based on type
    if (type === 'success') {
        notification.style.background = '#10b981';
    } else if (type === 'error') {
        notification.style.background = '#e63946';
    } else if (type === 'warning') {
        notification.style.background = '#f59e0b';
    }
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations for notifications
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// GLOBAL EXPORTS
// ============================================

// Make functions available globally for onclick handlers
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeItem = removeItem;
window.checkout = checkout;
window.initHowItWorks = initHowItWorks;