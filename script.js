let cart = [];
let subtotal = 0;
let taxRate = 0.1; // Ejemplo de tasa de impuesto (10%)

// Cargar el carrito desde localStorage al inicio
window.onload = () => {
    loadCart();
    updateCart();
};

function addToCart(productName, productPrice) {
    let product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    saveCart();
    updateCart();
}

function updateCart() {
    let cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        let li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <div class="cart-item-details">
                <img src="images/${item.name.toLowerCase().replace(/ /g, '_')}.jpg" alt="${item.name}">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-quantity">Cantidad: ${item.quantity}</span>
                <span class="cart-item-price">Precio: $${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
        cartItems.appendChild(li);
    });

    let total = subtotal + (subtotal * taxRate);

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

// Guardar el carrito en localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Cargar el carrito desde localStorage
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}

// Vaciar el carrito
function clearCart() {
    cart = [];
    saveCart();
    updateCart();
}