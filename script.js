// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const sales = JSON.parse(localStorage.getItem('sales')) || [];

    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const modal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close');

    function updateCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const totalPriceContainer = document.getElementById('total-price');
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
            cartItemsContainer.appendChild(li);
            totalPrice += item.price * item.quantity;
        });

        totalPriceContainer.textContent = totalPrice.toFixed(2);
        cartCount.textContent = cart.length;
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.parentElement;
            const productId = product.getAttribute('data-id');
            const productName = product.getAttribute('data-name');
            const productPrice = parseFloat(product.getAttribute('data-price'));

            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${productName} agregado al carrito`);
            updateCart();
        });
    });

    cartIcon.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    document.getElementById('checkout').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('El carrito está vacío.');
            return;
        }

        const sale = {
            date: new Date().toISOString(),
            items: [...cart],
            total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        };

        sales.push(sale);
        localStorage.setItem('sales', JSON.stringify(sales));
        localStorage.removeItem('cart');
        alert('Compra finalizada. Gracias por su compra!');
        cart.length = 0;
        updateCart();
        modal.style.display = 'none';
    });

    updateCart();
});
