// script.js - Enhanced Gundam Store Interactions

document.addEventListener("DOMContentLoaded", () => {
    // Cart functionality
    let cart = [];
    let wishlist = [];

    // DOM Elements
    const cartIcon = document.querySelector('.bi-cart-plus').parentElement;
    const wishlistIcon = document.querySelector('.bi-heart').parentElement;
    const searchInput = document.querySelector('.search-bar input');
    const productCards = document.querySelectorAll('.product-card');
    const categoryItems = document.querySelectorAll('.category-item');
    const productTabs = document.querySelectorAll('.product-tabs a');

    // Initialize cart counter
    updateCartCounter();
    updateWishlistCounter();

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterProducts(searchTerm);
    });

    // Add hover effects to all interactive elements
    addHoverEffects();

    // Category filtering
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            const categoryName = item.querySelector('span').textContent;
            filterProductsByCategory(categoryName);
            
            // Visual feedback
            categoryItems.forEach(c => c.classList.remove('active-category'));
            item.classList.add('active-category');
        });
    });

    // Product tabs functionality
    productTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all tabs
            productTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Filter products based on tab
            const tabText = tab.textContent.toLowerCase();
            filterProductsByTab(tabText);
        });
    });

    // Add to cart functionality
    productCards.forEach(card => {
        const addToCartBtn = card.querySelector('.btn-primary');
        const buyNowBtn = card.querySelector('.btn-secondary');
        const productName = card.querySelector('h3').textContent;
        const productPrice = card.querySelector('.price').textContent;
        const productImage = card.querySelector('img').src;

        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                addToCart({
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    id: Date.now() // Simple ID generation
                });
                
                // Visual feedback
                showNotification(`${productName} added to cart!`, 'success');
                animateButton(addToCartBtn);
            });
        }

        if (buyNowBtn) {
            buyNowBtn.addEventListener('click', () => {
                showNotification(`Redirecting to checkout for ${productName}...`, 'info');
                animateButton(buyNowBtn);
            });
        }

        // Add wishlist functionality
        const wishlistBtn = createWishlistButton();
        card.appendChild(wishlistBtn);
        
        wishlistBtn.addEventListener('click', () => {
            toggleWishlist({
                name: productName,
                price: productPrice,
                image: productImage,
                id: productName // Using name as ID for simplicity
            });
        });
    });

    // Category navigation arrows
    const leftArrow = document.querySelector('.nav-arrows button:first-child');
    const rightArrow = document.querySelector('.nav-arrows button:last-child');
    const categoryGrid = document.querySelector('.category-grid');

    if (leftArrow && rightArrow) {
        leftArrow.addEventListener('click', () => {
            categoryGrid.scrollBy({
                left: -200,
                behavior: 'smooth'
            });
        });

        rightArrow.addEventListener('click', () => {
            categoryGrid.scrollBy({
                left: 200,
                behavior: 'smooth'
            });
        });
    }

    // Dark mode toggle (bonus feature)
    createDarkModeToggle();

    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Functions
    function addHoverEffects() {
        const hoverElements = document.querySelectorAll('.product-card, .category-item, .header-icons a, button');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-2px) scale(1.02)';
                element.style.transition = 'all 0.3s ease';
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    function filterProducts(searchTerm) {
        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            const isVisible = productName.includes(searchTerm);
            
            card.style.display = isVisible ? 'block' : 'none';
            card.style.transition = 'opacity 0.3s ease';
            card.style.opacity = isVisible ? '1' : '0';
        });

        // Show message if no products found
        const visibleCards = Array.from(productCards).filter(card => 
            card.style.display !== 'none'
        );

        if (visibleCards.length === 0 && searchTerm) {
            showNotification('No products found matching your search.', 'warning');
        }
    }

    function filterProductsByCategory(category) {
        // This is a simplified version - in a real app, products would have category data
        const categoryKeywords = {
            'Real Grade': ['RG'],
            'Master Grade': ['MG'],
            'High Grade': ['HG'],
            'Perfect Grade': ['PG'],
            'Metal Build': ['Metal'],
            'Super Deformed': ['SD']
        };

        const keywords = categoryKeywords[category] || [];
        
        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent;
            const isVisible = keywords.some(keyword => productName.includes(keyword));
            
            card.style.display = isVisible ? 'block' : 'none';
            card.style.transition = 'opacity 0.3s ease';
            card.style.opacity = isVisible ? '1' : '0';
        });

        showNotification(`Filtered by ${category}`, 'info');
    }

    function filterProductsByTab(tabType) {
        // Show all products for now - in real app, products would have metadata
        productCards.forEach(card => {
            card.style.display = 'block';
            card.style.opacity = '1';
        });
        
        showNotification(`Showing ${tabType} products`, 'info');
    }

    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        updateCartCounter();
        saveCartToLocalStorage();
    }

    function toggleWishlist(product) {
        const existingIndex = wishlist.findIndex(item => item.id === product.id);
        
        if (existingIndex > -1) {
            wishlist.splice(existingIndex, 1);
            showNotification(`${product.name} removed from wishlist`, 'info');
        } else {
            wishlist.push(product);
            showNotification(`${product.name} added to wishlist`, 'success');
        }
        
        updateWishlistCounter();
        saveWishlistToLocalStorage();
    }

    function updateCartCounter() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        // Remove existing counter
        const existingCounter = cartIcon.querySelector('.counter');
        if (existingCounter) {
            existingCounter.remove();
        }
        
        if (totalItems > 0) {
            const counter = document.createElement('span');
            counter.className = 'counter';
            counter.textContent = totalItems;
            counter.style.cssText = `
                position: absolute;
                top: -8px;
                right: -8px;
                background: #e53935;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            `;
            
            cartIcon.style.position = 'relative';
            cartIcon.appendChild(counter);
        }
    }

    function updateWishlistCounter() {
        const totalItems = wishlist.length;
        
        // Remove existing counter
        const existingCounter = wishlistIcon.querySelector('.counter');
        if (existingCounter) {
            existingCounter.remove();
        }
        
        if (totalItems > 0) {
            const counter = document.createElement('span');
            counter.className = 'counter';
            counter.textContent = totalItems;
            counter.style.cssText = `
                position: absolute;
                top: -8px;
                right: -8px;
                background: #e53935;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            `;
            
            wishlistIcon.style.position = 'relative';
            wishlistIcon.appendChild(counter);
        }
    }

    function createWishlistButton() {
        const btn = document.createElement('button');
        btn.innerHTML = '♡';
        btn.className = 'wishlist-btn';
        btn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: white;
            border: 1px solid #ddd;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        `;
        
        btn.addEventListener('mouseenter', () => {
            btn.style.background = '#ff4757';
            btn.style.color = 'white';
            btn.innerHTML = '♥';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.background = 'white';
            btn.style.color = 'black';
            btn.innerHTML = '♡';
        });
        
        return btn;
    }

    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        const colors = {
            success: '#4caf50',
            error: '#f44336',
            warning: '#ff9800',
            info: '#2196f3'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1000;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    function animateButton(button) {
        button.style.transform = 'scale(0.95)';
        button.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);
    }

    function createDarkModeToggle() {
        const toggle = document.createElement('button');
        toggle.innerHTML = '🌙';
        toggle.className = 'dark-mode-toggle';
        toggle.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 20px;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(toggle);
        
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            toggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
            
            // Save preference
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        
        // Load saved preference
        const savedMode = localStorage.getItem('darkMode') === 'true';
        if (savedMode) {
            document.body.classList.add('dark-mode');
            toggle.innerHTML = '☀️';
        }
    }

    function saveCartToLocalStorage() {
        localStorage.setItem('gundamCart', JSON.stringify(cart));
    }

    function saveWishlistToLocalStorage() {
        localStorage.setItem('gundamWishlist', JSON.stringify(wishlist));
    }

    function loadCartFromLocalStorage() {
        const savedCart = localStorage.getItem('gundamCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
    }

    function loadWishlistFromLocalStorage() {
        const savedWishlist = localStorage.getItem('gundamWishlist');
        if (savedWishlist) {
            wishlist = JSON.parse(savedWishlist);
        }
    }

    // Load saved data on page load
    loadCartFromLocalStorage();
    loadWishlistFromLocalStorage();

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .product-card {
            position: relative;
        }
        
        .active-category {
            border-color: var(--primary-color) !important;
            background: #f0f8ff !important;
            transform: scale(1.05) !important;
        }
        
        .dark-mode {
            background-color: #1a1a1a !important;
            color: #ffffff !important;
        }
        
        .dark-mode header {
            background-color: #2d2d2d !important;
            border-bottom-color: #444 !important;
        }
        
        .dark-mode .product-card,
        .dark-mode .category-item {
            background-color: #2d2d2d !important;
            border-color: #444 !important;
            color: #ffffff !important;
        }
        
        .dark-mode .search-bar {
            background: #2d2d2d !important;
            border-color: #444 !important;
        }
        
        .dark-mode .search-bar input {
            background: transparent !important;
            color: #ffffff !important;
        }
        
        .dark-mode .search-bar input::placeholder {
            color: #aaa !important;
        }
    `;
    
    document.head.appendChild(style);

    console.log('🚀 Gundam Store JavaScript loaded successfully!');
    console.log(`📊 Cart: ${cart.length} items`);
    console.log(`💝 Wishlist: ${wishlist.length} items`);
});

// Additional utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(price);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('.search-bar input').focus();
    }
    
    // Escape to clear search
    if (e.key === 'Escape') {
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput.value) {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
        }
    }
});