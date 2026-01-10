/**
 * ═══════════════════════════════════════════════════════════════
 * INAYA - Main JavaScript File
 * ═══════════════════════════════════════════════════════════════
 * 
 * This file contains all the core functionality for the website
 * 
 * ═══════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Format price with currency symbol
 * @param {number} price - The price to format
 * @returns {string} Formatted price with currency
 */
function formatPrice(price) {
    return `${CONFIG.currency}${price.toLocaleString()}`;
}

/**
 * Get product by ID
 * @param {string} productId - The product ID
 * @returns {object|null} Product object or null
 */
function getProductById(productId) {
    return PRODUCTS.find(product => product.id === productId) || null;
}

/**
 * Get featured products
 * @param {number} limit - Maximum number of products to return
 * @returns {array} Array of featured products
 */
function getFeaturedProducts(limit = 4) {
    return PRODUCTS
        .filter(product => product.featured && product.inStock)
        .slice(0, limit);
}

/**
 * Get products by category
 * @param {string} categoryId - The category ID
 * @returns {array} Array of products in that category
 */
function getProductsByCategory(categoryId) {
    if (categoryId === 'all') {
        return PRODUCTS.filter(product => product.inStock);
    }
    return PRODUCTS.filter(product => 
        product.category === categoryId && product.inStock
    );
}

/**
 * Get URL parameters
 * @param {string} param - Parameter name
 * @returns {string|null} Parameter value or null
 */
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {any} data - Data to save
 */
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Get data from localStorage
 * @param {string} key - Storage key
 * @returns {any} Stored data or null
 */
function getFromStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}


// ═══════════════════════════════════════════════════════════════
// PRODUCT CARD COMPONENT
// ═══════════════════════════════════════════════════════════════

/**
 * Create a product card HTML
 * @param {object} product - Product object
 * @returns {string} HTML string for the product card
 */
function createProductCard(product) {
    // Calculate discount percentage if applicable
    let discountBadge = '';
    if (product.originalPrice > 0 && product.originalPrice > product.price) {
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        discountBadge = `<span class="badge badge-sale">-${discount}%</span>`;
    }
    
    // New arrival badge
    let newBadge = product.isNew ? '<span class="badge badge-new">New</span>' : '';
    
    // Original price display
    let originalPriceHtml = '';
    if (product.originalPrice > 0 && product.originalPrice > product.price) {
        originalPriceHtml = `<span class="original-price">${formatPrice(product.originalPrice)}</span>`;
    }
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image-wrapper">
                <img 
                    src="${product.image}" 
                    alt="${product.name}"
                    class="product-image"
                    loading="lazy"
                    onerror="this.src='https://via.placeholder.com/400x400?text=Image+Not+Found'"
                >
                <div class="product-badges">
                    ${newBadge}
                    ${discountBadge}
                </div>
                <div class="product-overlay">
                    <a href="product-detail.html?id=${product.id}" class="btn btn-overlay">
                        <span>View Details</span>
                        <i class="icon-arrow-right">→</i>
                    </a>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">
                    <a href="product-detail.html?id=${product.id}">${product.name}</a>
                </h3>
                <p class="product-name-bn">${product.nameBn}</p>
                <div class="product-price">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${originalPriceHtml}
                </div>
                <p class="product-set-info">${product.setQuantity} pieces set</p>
                <a href="order.html?id=${product.id}" class="btn btn-primary btn-order">
                    <span>অর্ডার করুন</span>
                </a>
            </div>
        </div>
    `;
}


// ═══════════════════════════════════════════════════════════════
// RENDER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Render featured products on homepage
 */
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    
    const featuredProducts = getFeaturedProducts(4);
    
    if (featuredProducts.length === 0) {
        container.innerHTML = '<p class="no-products">No featured products available.</p>';
        return;
    }
    
    container.innerHTML = featuredProducts
        .map(product => createProductCard(product))
        .join('');
    
    // Add animation class after render
    setTimeout(() => {
        container.querySelectorAll('.product-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 100);
        });
    }, 100);
}

/**
 * Render all products on products page
 */
function renderAllProducts(categoryId = 'all') {
    const container = document.getElementById('products-grid');
    if (!container) return;
    
    const products = getProductsByCategory(categoryId);
    
    if (products.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <p>এই ক্যাটাগরিতে কোন পণ্য নেই</p>
                <p>No products in this category</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = products
        .map(product => createProductCard(product))
        .join('');
    
    // Add animation
    setTimeout(() => {
        container.querySelectorAll('.product-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 80);
        });
    }, 100);
}

/**
 * Render category filters
 */
function renderCategoryFilters() {
    const container = document.getElementById('category-filters');
    if (!container) return;
    
    container.innerHTML = CATEGORIES.map(category => `
        <button 
            class="filter-btn ${category.id === 'all' ? 'active' : ''}"
            data-category="${category.id}"
        >
            <span class="filter-icon">${category.icon}</span>
            <span class="filter-name">${category.nameBn}</span>
        </button>
    `).join('');
    
    // Add click handlers
    container.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Render filtered products
            renderAllProducts(btn.dataset.category);
        });
    });
}

/**
 * Render product detail page
 */
function renderProductDetail() {
    const container = document.getElementById('product-detail');
    if (!container) return;
    
    const productId = getUrlParam('id');
    if (!productId) {
        window.location.href = 'products.html';
        return;
    }
    
    const product = getProductById(productId);
    if (!product) {
        container.innerHTML = `
            <div class="error-message">
                <h2>পণ্য খুঁজে পাওয়া যায়নি</h2>
                <p>Product not found</p>
                <a href="products.html" class="btn btn-primary">Browse Products</a>
            </div>
        `;
        return;
    }
    
    // Generate size options
    const sizeOptions = product.sizes.map(size => `
        <label class="size-option">
            <input type="radio" name="size" value="${size}" ${size === product.sizes[0] ? 'checked' : ''}>
            <span class="size-label">${size}</span>
        </label>
    `).join('');
    
    // Generate gallery
    const galleryThumbs = product.gallery.map((img, index) => `
        <button class="gallery-thumb ${index === 0 ? 'active' : ''}" data-index="${index}">
            <img src="${img}" alt="View ${index + 1}">
        </button>
    `).join('');
    
    // Calculate discount
    let discountHtml = '';
    if (product.originalPrice > 0 && product.originalPrice > product.price) {
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        discountHtml = `
            <span class="original-price">${formatPrice(product.originalPrice)}</span>
            <span class="discount-badge">-${discount}%</span>
        `;
    }
    
    container.innerHTML = `
        <div class="product-detail-grid">
            <!-- Product Gallery -->
            <div class="product-gallery">
                <div class="main-image-wrapper">
                    <img 
                        src="${product.gallery[0]}" 
                        alt="${product.name}" 
                        id="main-product-image"
                        class="main-image"
                    >
                    ${product.isNew ? '<span class="badge badge-new badge-large">New Arrival</span>' : ''}
                </div>
                <div class="gallery-thumbs">
                    ${galleryThumbs}
                </div>
            </div>
            
            <!-- Product Info -->
            <div class="product-detail-info">
                <nav class="breadcrumb">
                    <a href="index.html">Home</a>
                    <span>/</span>
                    <a href="products.html">Products</a>
                    <span>/</span>
                    <span>${product.name}</span>
                </nav>
                
                <h1 class="product-title">${product.name}</h1>
                <p class="product-title-bn">${product.nameBn}</p>
                
                <div class="product-price-detail">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${discountHtml}
                </div>
                
                <p class="product-set-info-detail">
                    <i>✨</i> ${product.setQuantity} pieces in one set
                </p>
                
                <div class="product-description">
                    <p>${product.description}</p>
                    <p class="description-bn">${product.descriptionBn}</p>
                </div>
                
                <!-- Size Selection -->
                <div class="product-options">
                    <h4>Select Size (সাইজ নির্বাচন করুন)</h4>
                    <div class="size-options" id="size-options">
                        ${sizeOptions}
                    </div>
                </div>
                
                <!-- Quantity -->
                <div class="quantity-selector">
                    <h4>Quantity (পরিমাণ)</h4>
                    <div class="quantity-controls">
                        <button class="qty-btn" id="qty-decrease">−</button>
                        <input type="number" id="quantity" value="1" min="1" max="10" readonly>
                        <button class="qty-btn" id="qty-increase">+</button>
                    </div>
                </div>
                
                <!-- Order Button -->
                <a href="order.html?id=${product.id}" class="btn btn-primary btn-large btn-order-now" id="order-now-btn">
                    <span>এখনই অর্ডার করুন</span>
                    <span>Order Now</span>
                </a>
                
                <!-- Trust Badges -->
                <div class="trust-badges">
                    <div class="trust-badge">
                        <span class="trust-icon">🚚</span>
                        <span>সারাদেশে ডেলিভারি</span>
                    </div>
                    <div class="trust-badge">
                        <span class="trust-icon">💯</span>
                        <span>১০০% হ্যান্ডমেড</span>
                    </div>
                    <div class="trust-badge">
                        <span class="trust-icon">💝</span>
                        <span>সুন্দর প্যাকেজিং</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Initialize gallery functionality
    initGallery(product);
    
    // Initialize quantity controls
    initQuantityControls();
    
    // Update order button with selected options
    updateOrderButton(product);
}

/**
 * Initialize gallery thumbnail clicks
 */
function initGallery(product) {
    const thumbs = document.querySelectorAll('.gallery-thumb');
    const mainImage = document.getElementById('main-product-image');
    
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const index = parseInt(thumb.dataset.index);
            mainImage.src = product.gallery[index];
            
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });
}

/**
 * Initialize quantity controls
 */
function initQuantityControls() {
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('qty-decrease');
    const increaseBtn = document.getElementById('qty-increase');
    
    if (!quantityInput) return;
    
    decreaseBtn.addEventListener('click', () => {
        const current = parseInt(quantityInput.value);
        if (current > 1) {
            quantityInput.value = current - 1;
        }
    });
    
    increaseBtn.addEventListener('click', () => {
        const current = parseInt(quantityInput.value);
        if (current < 10) {
            quantityInput.value = current + 1;
        }
    });
}

/**
 * Update order button with selected options
 */
function updateOrderButton(product) {
    const orderBtn = document.getElementById('order-now-btn');
    const sizeOptions = document.getElementById('size-options');
    const quantityInput = document.getElementById('quantity');
    
    if (!orderBtn) return;
    
    function updateUrl() {
        const selectedSize = document.querySelector('input[name="size"]:checked')?.value || product.sizes[0];
        const quantity = quantityInput?.value || 1;
        orderBtn.href = `order.html?id=${product.id}&size=${selectedSize}&qty=${quantity}`;
    }
    
    // Update on size change
    sizeOptions?.addEventListener('change', updateUrl);
    
    // Update on quantity change
    document.getElementById('qty-decrease')?.addEventListener('click', updateUrl);
    document.getElementById('qty-increase')?.addEventListener('click', updateUrl);
    
    // Initial update
    updateUrl();
}


// ═══════════════════════════════════════════════════════════════
// MOBILE MENU
// ═══════════════════════════════════════════════════════════════

function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuClose = document.getElementById('menu-close');
    const overlay = document.getElementById('menu-overlay');
    
    if (!menuToggle || !mobileMenu) return;
    
    function openMenu() {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    menuToggle.addEventListener('click', openMenu);
    menuClose?.addEventListener('click', closeMenu);
    overlay?.addEventListener('click', closeMenu);
    
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}


// ═══════════════════════════════════════════════════════════════
// SMOOTH SCROLL
// ═══════════════════════════════════════════════════════════════

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}


// ═══════════════════════════════════════════════════════════════
// SCROLL ANIMATIONS
// ═══════════════════════════════════════════════════════════════

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}


// ═══════════════════════════════════════════════════════════════
// HEADER SCROLL EFFECT
// ═══════════════════════════════════════════════════════════════

function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}


// ═══════════════════════════════════════════════════════════════
// INITIALIZE EVERYTHING
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    // Common initializations
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
    
    // Page-specific initializations
    const currentPage = document.body.dataset.page;
    
    switch (currentPage) {
        case 'home':
            renderFeaturedProducts();
            break;
        case 'products':
            renderCategoryFilters();
            renderAllProducts();
            break;
        case 'product-detail':
            renderProductDetail();
            break;
    }
    
    console.log('✨ INAYA website initialized successfully!');
});