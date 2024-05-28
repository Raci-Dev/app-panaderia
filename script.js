
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let subtotal = 0;
const taxRate = 0.1;

window.onload = () => {
    updateCart();
};

function handleAddToCart(productName, productPrice) {
    const button = event.target;
    button.classList.add('loading');
    button.innerHTML = '<div class="spinner"></div>';

    setTimeout(() => {
        addToCart(productName, productPrice);
        button.classList.remove('loading');
        button.innerHTML = 'Añadir al carrito';
        showAlertModal();
    }, 1000); // Simula una solicitud de 1 segundo
}

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
    let totalQuantity = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        totalQuantity += item.quantity;
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
    document.getElementById('cart-count').textContent = totalQuantity;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function clearCart() {
    cart = [];
    saveCart();
    updateCart();
}

// Modal del carrito
const modal = document.getElementById("cart-modal");
const btn = document.getElementById("cart-icon");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Modal de alerta
function showAlertModal() {
    const alertModal = document.getElementById('alert-modal');
    const alertOverlay = document.getElementById('alert-overlay');
    alertModal.style.display = 'block';
    alertOverlay.style.display = 'block';
}

function closeAlertModal() {
    const alertModal = document.getElementById('alert-modal');
    const alertOverlay = document.getElementById('alert-overlay');
    alertModal.style.display = 'none';
    alertOverlay.style.display = 'none';
}