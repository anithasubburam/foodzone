document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const authSection = document.getElementById('authSection');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const mainContent = document.getElementById('mainContent');

    const foodItems = [
        { name: 'Crispy Calamari', price: 10.99, category: 'appetizers' },
        { name: 'Steamed Dumplings', price: 64.99, category: 'appetizers' },
        { name: 'Caprese Skewers', price: 13.99, category: 'appetizers' },
        { name: 'Grilled Salmon', price: 18.99, category: 'mainCourses' },
        { name: 'Coconut Shrimp with Mango Dipping Sauce', price: 18.99, category: 'mainCourses' },
        { name: 'Crab Cakes with Remoulade Sauce', price: 18.99, category: 'mainCourses' },
        { name: 'Tiramisu', price: 17.99, category: 'desserts' },
        { name: 'Chocolate Lava Cake', price: 7.99, category: 'desserts' },
        { name: 'Classic chewy brownie recipe', price: 15.75, category: 'desserts' },
        { name: 'Fresh Lemonade', price: 3.99, category: 'drinks' },
        { name: 'Mojito', price: 6.99, category: 'drinks' },
        { name: 'Passion fruit martini', price: 4.99, category: 'drinks' },]
        // Add more food items here

    let users = [];
    let currentUser = null;

    loginBtn.addEventListener('click', () => {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    });

    signupBtn.addEventListener('click', () => {
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });

    document.getElementById('loginFormElement').addEventListener('submit', (event) => {
        event.preventDefault();
        const email = event.target.elements[0].value;
        const password = event.target.elements[1].value;
        
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            currentUser = user;
            authSection.classList.add('hidden');
            mainContent.classList.remove('hidden');
        } else {
            alert('Invalid credentials');
        }
    });

    document.getElementById('signupFormElement').addEventListener('submit', (event) => {
        event.preventDefault();
        const name = event.target.elements[0].value;
        const email = event.target.elements[1].value;
        const password = event.target.elements[2].value;
        const confirmPassword = event.target.elements[3].value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        if (users.some(u => u.email === email)) {
            alert('Email already registered');
            return;
        }
        
        const newUser = { name, email, password };
        users.push(newUser);
        currentUser = newUser;
        authSection.classList.add('hidden');
        mainContent.classList.remove('hidden');
    });

    function displayFoodItems() {
        foodItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('food-item');
            itemElement.innerHTML = `
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <div>
                    <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
                    <button onclick="removeFromCart('${item.name}')">Remove from Cart</button>
                </div>
            `;
            document.getElementById(item.category).appendChild(itemElement);
        });
    }

    displayFoodItems();

    // Image slider
    const sliderImages = document.querySelectorAll('.slider-image');
    let currentImageIndex = 0;

    function showNextImage() {
        sliderImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % sliderImages.length;
        sliderImages[currentImageIndex].classList.add('active');
    }

    setInterval(showNextImage, 5000); // Change image every 5 seconds

    // Cart functionality
    let cart = [];

    window.addToCart = function(name, price) {
        cart.push({ name, price });
        updateCart();
    }

    window.removeFromCart = function(name) {
        const index = cart.findIndex(item => item.name === name);
        if (index !== -1) {
            cart.splice(index, 1);
            updateCart();
        }
    }

    function updateCart() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItems.appendChild(li);
            total += item.price;
        });

        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    document.getElementById('clearCartBtn').addEventListener('click', () => {
        cart = [];
        updateCart();
    });
});