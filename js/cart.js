function updateCartPage() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    let totalPrice = 0;

    cartItemsContainer.innerHTML = ''; // Empty container first
    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.className = 'col-md-2';
        cartItem.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body data">
                    <p class="card-text">${product.name}</p>
                    <h5 class="card-title">${product.description}</h5>
                    <p class="card-text par">$${product.price}</p>
                    <button class="btnn" onclick="removeFromCart(${product.id})">Remove</button>
                </div>
            </div>
            <br>
        `;
        cartItemsContainer.appendChild(cartItem);
        totalPrice += product.price;
    });

    totalPriceElement.innerText = totalPrice;
}
updateCartPage()

// Remove from cart functionality without reloading the page
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(product => product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartPage(); // Update cart page without reloading
}