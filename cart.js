/*document.addEventListener('DOMContentLoaded', () => {
  // Cargar el carrito desde el localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const subtotalElement = document.getElementById('subtotal');
  const totalElement = document.getElementById('total');

  // Función para actualizar el carrito en el DOM
  function updateCart() {
      cartItemsContainer.innerHTML = '';
      let subtotal = 0;
      cart.forEach(item => {
          const itemElement = document.createElement('li');
          itemElement.classList.add('cart-item');

          itemElement.innerHTML = `
              <img src="${item.image}" alt="${item.name}">
              <div class="cart-item-details">
                  <span class="cart-item-name">${item.name}</span>
                  <div class="cart-item-quantity">
                      <button onclick="changeQuantity('${item.name}', -1)"> - </button>
                      <span>${item.quantity}</span>
                      <button onclick="changeQuantity('${item.name}', 1)"> + </button>
                  </div>
                  <span>$${item.price.toFixed(2)}</span>
              </div>
          `;

          cartItemsContainer.appendChild(itemElement);
          subtotal += item.price * item.quantity;
      });
      subtotalElement.textContent = subtotal.toFixed(2);
      totalElement.textContent = (subtotal * 1.1).toFixed(2); // Suponiendo 10% de impuestos
      localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Función para cambiar la cantidad de un producto en el carrito
  window.changeQuantity = (name, delta) => {
      const item = cart.find(product => product.name === name);
      if (item) {
          item.quantity += delta;
          if (item.quantity <= 0) {
              cart.splice(cart.indexOf(item), 1);
          }
          updateCart();
      }
  };

  // Función para vaciar el carrito
  window.clearCart = () => {
      cart.length = 0;
      updateCart();
  };

  // Inicializar el carrito en el DOM
  updateCart();
});*/

document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsElement = document.getElementById('cart-items');
  const subtotalElement = document.getElementById('subtotal');
  const totalElement = document.getElementById('total');

  // Función para actualizar el subtotal y el total
  function updateTotals() {
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      subtotalElement.textContent = subtotal.toFixed(2);
      totalElement.textContent = subtotal.toFixed(2);  // Puedes agregar impuestos u otros cálculos aquí
  }

  // Función para renderizar el carrito
  function renderCart() {
      cartItemsElement.innerHTML = '';
      cart.forEach((item, index) => {
          const li = document.createElement('li');
          li.className = 'cart-item';
          li.innerHTML = `
              <img src="${item.image}" alt="${item.name}">
              <div class="cart-item-details">
                  <span class="cart-item-name">${item.name}</span>
                  <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                  <input type="number" class="cart-item-quantity" value="${item.quantity}" min="1" data-index="${index}">
              </div>
              <button class="remove-item" data-index="${index}">Eliminar</button>
          `;
          cartItemsElement.appendChild(li);
      });

      // Añadir eventos para los inputs de cantidad
      document.querySelectorAll('.cart-item-quantity').forEach(input => {
          input.addEventListener('change', (e) => {
              const index = e.target.dataset.index;
              const newQuantity = parseInt(e.target.value, 10);
              if (newQuantity > 0) {
                  cart[index].quantity = newQuantity;
                  localStorage.setItem('cart', JSON.stringify(cart));
                  updateTotals();
              }
          });
      });

      // Añadir eventos para los botones de eliminar
      document.querySelectorAll('.remove-item').forEach(button => {
          button.addEventListener('click', (e) => {
              const index = e.target.dataset.index;
              cart.splice(index, 1);
              localStorage.setItem('cart', JSON.stringify(cart));
              renderCart();
              updateTotals();
          });
      });

      updateTotals();
  }

  // Función para vaciar el carrito
  window.clearCart = () => {
      localStorage.removeItem('cart');
      renderCart();
      updateTotals();
  };

  renderCart();
});

