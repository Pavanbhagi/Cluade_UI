let products = [
  { id: 1, name: "Samsung Phone", price: 14999 },
  { id: 2, name: "HP Laptop", price: 55999 },
  { id: 3, name: "boAt Earbuds", price: 1799 }
];

let cart = [];

function loadProducts() {
  let grid = document.getElementById("productGrid");
  products.forEach((p) => {
    grid.innerHTML += `
      <div class="product-card">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}
loadProducts();

function toggleCart() {
  document.getElementById("cartPanel").classList.toggle("active");
}

function addToCart(id) {
  let product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  let cartItems = document.getElementById("cartItems");
  let totalPrice = document.getElementById("totalPrice");
  let cartCount = document.getElementById("cartCount");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price;
    cartItems.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
  });

  totalPrice.innerText = total;
  cartCount.innerText = cart.length;
}
