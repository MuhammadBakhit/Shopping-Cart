// Array of products
const products = [
    { id: 1, name: 'Headphones', description: 'Kids headphones bulk 10 pack multi colored for students', price: 100, image: 'images/image1.jpg' },
    { id: 2, name: 'Headphones', description: 'Kids headphones bulk 10 pack multi colored for students', price: 200, image: 'images/image2.jpg' },
    { id: 3, name: 'Headphones', description: 'Kids headphones bulk 10 pack multi colored for students', price: 300, image: 'images/image3.jpg' },
    { id: 4, name: 'Speakers', description: 'Sony EXTRA BASS Portable Splash-proof Wireless Speaker', price: 350, image: 'images/image8.jpg' },
    { id: 5, name: 'Speakers', description: 'Milanese Loop Watch Band for 42mm/44mm Apple Watch', price: 500, image: 'images/image4.jpg' },
    { id: 6, name: 'Speakers', description: 'Milanese Loop Watch Band for 42mm/44mm Apple Watch', price: 400, image: 'images/image5.jpg' },
    { id: 7, name: 'Speakers', description: 'Milanese Loop Watch Band for 42mm/44mm Apple Watch', price: 500, image: 'images/image6.jpg' },
    { id: 8, name: 'Speakers', description: 'Milanese Loop Watch Band for 42mm/44mm Apple Watch', price: 600, image: 'images/image7.jpg' }
];

// Display products on the home page
const productsContainer = document.getElementById('products');
if (productsContainer) {
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'col-md-3';
        productElement.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="hart">
                    <i class="fa-regular fa-heart"></i>
                </div>
                <div class="card-body data">
                    <p class="card-text">${product.name}</p>
                    <h5 class="card-title">${product.description}</h5>
                    <div class="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <p class="card-text par">$${product.price}</p>
                    <button class="btnn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
            <br>
        `;
        productsContainer.appendChild(productElement);
    });
}

// Function to add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    showNotification(`${product.name} added to cart!`);
    updateCartBadge();
}

// Function to update the cart badge (number of products)
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartBadge = document.getElementById('cartBadge');
    
    if (cartBadge) {
        cartBadge.innerText = cart.length;
    }
}

window.onload = function() {
    updateCartBadge();
};

// Function to show notification when a product is added
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Cart page logic
const cartItemsContainer = document.getElementById('cartItems');
const totalPriceElement = document.getElementById('totalPrice');
if (cartItemsContainer && totalPriceElement) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    cartItemsContainer.innerHTML = ''; // Empty container first to avoid duplicates
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
