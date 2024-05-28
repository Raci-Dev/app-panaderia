document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCountElement = document.getElementById('cart-count');

  // Actualizar el contador del carrito
  function updateCartCount() {
      const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
      cartCountElement.textContent = itemCount;
  }

  // Función para manejar la adición al carrito
  window.handleAddToCart = (name, price, image) => {
      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
          existingItem.quantity += 1;
      } else {
          cart.push({ name, price, image, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
  };

  // Función para redirigir a la página del carrito
  window.redirectToCart = () => {
      window.location.href = 'cart.html';
  };

  // Inicializar el contador del carrito
  updateCartCount();
});
