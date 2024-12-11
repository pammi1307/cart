// Currency formatter for Indian Rupees
const formatPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
});

// Cart state
let cartState = {
    items: [],
    subtotal: 0,
    total: 0
};

// DOM Elements
const cartItemsContainer = document.querySelector('.cart-items');
const subtotalElement = document.querySelector('.original-total-price');
const totalElement = document.querySelector('.total-price');
const checkoutButton = document.querySelector('.checkout-btn');

// Show loading spinner
function showLoader() {
    cartItemsContainer.innerHTML = `
        <div class="loader">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading cart items...</p>
        </div>
    `;
}

// Create cart item HTML
function createCartItemHTML(item) {
    return `
        <div class="cart-item" data-id="${item.id}">
            <div class="item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="item-details">
                <h3>${item.title}</h3>
                <div class="item-price">${formatPrice.format(item.presentment_price / 100)}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn minus">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                    <button class="quantity-btn plus">+</button>
                </div>
                <div class="item-subtotal">
                    Subtotal: ${formatPrice.format((item.presentment_price * item.quantity) / 100)}
                </div>
                <button class="remove-item"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `;
}

// Update cart totals
function updateCartTotals() {
    cartState.subtotal = cartState.items.reduce((sum, item) => 
        sum + (item.presentment_price * item.quantity), 0);
    cartState.total = cartState.subtotal; // Add shipping or tax calculations here if needed

    subtotalElement.textContent = formatPrice.format(cartState.subtotal / 100);
    totalElement.textContent = formatPrice.format(cartState.total / 100);

    // Save to localStorage
    localStorage.setItem('cartState', JSON.stringify(cartState));
}

// Update item quantity
function updateItemQuantity(itemId, newQuantity) {
    const item = cartState.items.find(item => item.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        const cartItem = document.querySelector(`.cart-item[data-id="${itemId}"]`);
        const subtotalElement = cartItem.querySelector('.item-subtotal');
        subtotalElement.textContent = `Subtotal: ${formatPrice.format((item.presentment_price * newQuantity) / 100)}`;
        updateCartTotals();
    }
}

// Remove item from cart
function removeItem(itemId) {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
        cartState.items = cartState.items.filter(item => item.id !== itemId);
        document.querySelector(`.cart-item[data-id="${itemId}"]`).remove();
        updateCartTotals();
    }
}

// Event listeners for quantity controls and remove buttons
function setupEventListeners() {
    cartItemsContainer.addEventListener('click', (e) => {
        const cartItem = e.target.closest('.cart-item');
        if (!cartItem) return;

        const itemId = parseInt(cartItem.dataset.id);
        const quantityInput = cartItem.querySelector('.quantity-input');

        if (e.target.classList.contains('minus')) {
            if (quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
                updateItemQuantity(itemId, parseInt(quantityInput.value));
            }
        }

        if (e.target.classList.contains('plus')) {
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updateItemQuantity(itemId, parseInt(quantityInput.value));
        }

        if (e.target.classList.contains('fa-trash') || e.target.classList.contains('remove-item')) {
            removeItem(itemId);
        }
    });

    cartItemsContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('quantity-input')) {
            const cartItem = e.target.closest('.cart-item');
            const itemId = parseInt(cartItem.dataset.id);
            const newQuantity = parseInt(e.target.value);
            if (newQuantity < 1) e.target.value = 1;
            updateItemQuantity(itemId, Math.max(1, newQuantity));
        }
    });

    checkoutButton.addEventListener('click', () => {
        console.log('Current cart state:', cartState);
        alert('Proceeding to checkout...');
    });
}

// Initialize cart
async function initializeCart() {
    showLoader();

    try {
        // Load from localStorage first
        const savedCart = localStorage.getItem('cartState');
        if (savedCart) {
            cartState = JSON.parse(savedCart);
        }

        // Fetch fresh data from API
        const response = await fetch('https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889');
        const data = await response.json();

        // Update cart state with API data
        cartState.items = data.items.map(item => ({
            ...item,
            quantity: item.quantity || 1
        }));

        // Render cart items
        cartItemsContainer.innerHTML = `
            <h2>Shopping Cart</h2>
            ${cartState.items.map(item => createCartItemHTML(item)).join('')}
        `;

        updateCartTotals();
        setupEventListeners();

    } catch (error) {
        cartItemsContainer.innerHTML = `
            <div class="error">
                <p>Error loading cart items. Please try again later.</p>
            </div>
        `;
        console.error('Error fetching cart data:', error);
    }
}

// Start the application
document.addEventListener('DOMContentLoaded', initializeCart);
