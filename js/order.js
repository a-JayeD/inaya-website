/**
 * ═══════════════════════════════════════════════════════════════
 * INAYA - Order Form Handler
 * ═══════════════════════════════════════════════════════════════
 * 
 * Handles the order form and WhatsApp message generation
 * 
 * ═══════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════
// INITIALIZE ORDER PAGE
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    // Only run on order page
    if (document.body.dataset.page !== 'order') return;
    
    // Get product from URL
    const productId = getUrlParam('id');
    const selectedSize = getUrlParam('size');
    const selectedQty = getUrlParam('qty') || 1;
    
    if (productId) {
        const product = getProductById(productId);
        if (product) {
            displayOrderProduct(product, selectedSize, selectedQty);
            setupOrderForm(product);
        } else {
            showError('পণ্য খুঁজে পাওয়া যায়নি');
        }
    } else {
        showProductSelector();
    }
    
    // Initialize form handlers
    initFormHandlers();
    initDeliveryAreas();
});


// ═══════════════════════════════════════════════════════════════
// DISPLAY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Display selected product in order summary
 */
function displayOrderProduct(product, selectedSize, selectedQty) {
    const container = document.getElementById('order-product-summary');
    if (!container) return;
    
    const size = selectedSize || product.sizes[0];
    const quantity = parseInt(selectedQty) || 1;
    
    container.innerHTML = `
        <div class="order-product-card">
            <img src="${product.image}" alt="${product.name}" class="order-product-image">
            <div class="order-product-info">
                <h3>${product.name}</h3>
                <p class="product-name-bn">${product.nameBn}</p>
                <div class="order-product-details">
                    <span class="detail">
                        <strong>সাইজ:</strong> ${size}
                    </span>
                    <span class="detail">
                        <strong>পরিমাণ:</strong> ${quantity} set
                    </span>
                    <span class="detail">
                        <strong>মূল্য:</strong> ${formatPrice(product.price)} × ${quantity}
                    </span>
                </div>
                <p class="order-product-total">
                    <strong>সাবটোটাল:</strong> ${formatPrice(product.price * quantity)}
                </p>
            </div>
        </div>
    `;
    
    // Store order data for later
    window.orderData = {
        product: product,
        size: size,
        quantity: quantity,
        subtotal: product.price * quantity
    };
    
    // Generate size options for form
    generateSizeOptions(product.sizes, size);
    
    // Set initial quantity
    document.getElementById('quantity').value = quantity;
    
    // Update totals
    updateOrderTotals();
}

/**
 * Show product selector if no product in URL
 */
function showProductSelector() {
    const container = document.getElementById('order-product-summary');
    if (!container) return;
    
    const inStockProducts = PRODUCTS.filter(p => p.inStock);
    
    container.innerHTML = `
        <div class="product-selector">
            <h3>পণ্য নির্বাচন করুন / Select a Product</h3>
            <select id="product-select" class="form-select" required>
                <option value="">-- একটি পণ্য বেছে নিন --</option>
                ${inStockProducts.map(p => `
                    <option value="${p.id}">${p.nameBn} - ${formatPrice(p.price)}</option>
                `).join('')}
            </select>
        </div>
    `;
    
    // Handle product selection
    document.getElementById('product-select').addEventListener('change', (e) => {
        if (e.target.value) {
            const product = getProductById(e.target.value);
            if (product) {
                displayOrderProduct(product, null, 1);
            }
        }
    });
}

/**
 * Generate size options in form
 */
function generateSizeOptions(sizes, selectedSize) {
    const container = document.getElementById('size-select-container');
    if (!container) return;
    
    container.innerHTML = `
        <label class="form-label">সাইজ নির্বাচন করুন *</label>
        <div class="size-options-form">
            ${sizes.map(size => `
                <label class="size-option-form">
                    <input 
                        type="radio" 
                        name="order-size" 
                        value="${size}" 
                        ${size === selectedSize ? 'checked' : ''}
                        required
                    >
                    <span class="size-label-form">${size}</span>
                </label>
            `).join('')}
        </div>
    `;
    
    // Update order data on size change
    container.querySelectorAll('input[name="order-size"]').forEach(input => {
        input.addEventListener('change', (e) => {
            if (window.orderData) {
                window.orderData.size = e.target.value;
            }
        });
    });
}

/**
 * Initialize delivery area dropdown
 */
function initDeliveryAreas() {
    const select = document.getElementById('area');
    if (!select) return;
    
    select.innerHTML = `
        <option value="">-- জেলা/এলাকা নির্বাচন করুন --</option>
        ${CONFIG.deliveryAreas.map(area => `
            <option value="${area}">${area}</option>
        `).join('')}
    `;
    
    // Update delivery charge on area change
    select.addEventListener('change', updateOrderTotals);
}


// ═══════════════════════════════════════════════════════════════
// FORM HANDLERS
// ═══════════════════════════════════════════════════════════════

/**
 * Initialize form event handlers
 */
function initFormHandlers() {
    // Quantity controls
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('qty-decrease-order');
    const increaseBtn = document.getElementById('qty-increase-order');
    
    decreaseBtn?.addEventListener('click', () => {
        const current = parseInt(quantityInput.value) || 1;
        if (current > 1) {
            quantityInput.value = current - 1;
            updateQuantity(current - 1);
        }
    });
    
    increaseBtn?.addEventListener('click', () => {
        const current = parseInt(quantityInput.value) || 1;
        if (current < 10) {
            quantityInput.value = current + 1;
            updateQuantity(current + 1);
        }
    });
    
    // Phone number validation
    const phoneInput = document.getElementById('phone');
    phoneInput?.addEventListener('input', (e) => {
        // Only allow numbers
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        
        // Add visual feedback
        if (e.target.value.length >= 11) {
            e.target.classList.add('valid');
            e.target.classList.remove('invalid');
        } else {
            e.target.classList.remove('valid');
            if (e.target.value.length > 0) {
                e.target.classList.add('invalid');
            }
        }
    });
    
    // Form submission
    const form = document.getElementById('order-form');
    form?.addEventListener('submit', handleFormSubmit);
}

/**
 * Update quantity in order data
 */
function updateQuantity(newQty) {
    if (window.orderData) {
        window.orderData.quantity = newQty;
        window.orderData.subtotal = window.orderData.product.price * newQty;
        
        // Update display
        const totalDisplay = document.querySelector('.order-product-total');
        if (totalDisplay) {
            totalDisplay.innerHTML = `<strong>সাবটোটাল:</strong> ${formatPrice(window.orderData.subtotal)}`;
        }
        
        updateOrderTotals();
    }
}

/**
 * Update order totals based on area selection
 */
function updateOrderTotals() {
    const areaSelect = document.getElementById('area');
    const totalsContainer = document.getElementById('order-totals');
    
    if (!window.orderData || !totalsContainer) return;
    
    const area = areaSelect?.value || '';
    const isDhaka = area.toLowerCase().includes('dhaka') || area.includes('ঢাকা');
    
    let deliveryCharge = 0;
    if (area) {
        deliveryCharge = isDhaka ? CONFIG.deliveryCharge.insideDhaka : CONFIG.deliveryCharge.outsideDhaka;
    }
    
    const total = window.orderData.subtotal + deliveryCharge;
    
    totalsContainer.innerHTML = `
        <div class="totals-row">
            <span>সাবটোটাল:</span>
            <span>${formatPrice(window.orderData.subtotal)}</span>
        </div>
        <div class="totals-row">
            <span>ডেলিভারি চার্জ:</span>
            <span>${area ? formatPrice(deliveryCharge) : 'এলাকা নির্বাচন করুন'}</span>
        </div>
        <div class="totals-row total-final">
            <span>সর্বমোট:</span>
            <span>${area ? formatPrice(total) : '---'}</span>
        </div>
    `;
    
    // Store for WhatsApp message
    window.orderData.deliveryCharge = deliveryCharge;
    window.orderData.total = total;
}


// ═══════════════════════════════════════════════════════════════
// FORM SUBMISSION & WHATSAPP
// ═══════════════════════════════════════════════════════════════

/**
 * Handle form submission
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Get form data
    const formData = {
        name: document.getElementById('customer-name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        address: document.getElementById('address').value.trim(),
        area: document.getElementById('area').value,
        notes: document.getElementById('notes').value.trim()
    };
    
    // Generate WhatsApp message
    const message = generateWhatsAppMessage(formData);
    
    // Open WhatsApp
    openWhatsApp(message);
}

/**
 * Validate form fields
 */
function validateForm() {
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const area = document.getElementById('area').value;
    const size = document.querySelector('input[name="order-size"]:checked');
    
    let isValid = true;
    let errorMessage = '';
    
    if (!window.orderData || !window.orderData.product) {
        errorMessage = 'অনুগ্রহ করে একটি পণ্য নির্বাচন করুন';
        isValid = false;
    } else if (!size) {
        errorMessage = 'অনুগ্রহ করে সাইজ নির্বাচন করুন';
        isValid = false;
    } else if (!name || name.length < 3) {
        errorMessage = 'অনুগ্রহ করে আপনার পুরো নাম লিখুন';
        isValid = false;
    } else if (!phone || phone.length < 11) {
        errorMessage = 'অনুগ্রহ করে সঠিক ফোন নম্বর দিন (১১ ডিজিট)';
        isValid = false;
    } else if (!address || address.length < 10) {
        errorMessage = 'অনুগ্রহ করে সম্পূর্ণ ঠিকানা দিন';
        isValid = false;
    } else if (!area) {
        errorMessage = 'অনুগ্রহ করে জেলা/এলাকা নির্বাচন করুন';
        isValid = false;
    }
    
    if (!isValid) {
        showFormError(errorMessage);
    }
    
    return isValid;
}

/**
 * Show form error message
 */
function showFormError(message) {
    // Remove existing error
    const existingError = document.querySelector('.form-error-toast');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error toast
    const errorToast = document.createElement('div');
    errorToast.className = 'form-error-toast';
    errorToast.innerHTML = `
        <span class="error-icon">⚠️</span>
        <span class="error-message">${message}</span>
    `;
    
    document.body.appendChild(errorToast);
    
    // Animate in
    setTimeout(() => errorToast.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        errorToast.classList.remove('show');
        setTimeout(() => errorToast.remove(), 300);
    }, 3000);
}

/**
 * Show general error
 */
function showError(message) {
    const container = document.getElementById('order-product-summary');
    if (container) {
        container.innerHTML = `
            <div class="error-box">
                <span class="error-icon">😕</span>
                <p>${message}</p>
                <a href="products.html" class="btn btn-primary">পণ্য দেখুন</a>
            </div>
        `;
    }
}

/**
 * Generate WhatsApp message from order data
 */
function generateWhatsAppMessage(formData) {
    const { product, size, quantity, deliveryCharge, total } = window.orderData;
    
    // Use template from config or default format
    let message = `
🛍️ *নতুন অর্ডার - INAYA*
━━━━━━━━━━━━━━━━━━━

📦 *পণ্য:* ${product.nameBn}
   (${product.name})
💰 *মূল্য:* ${formatPrice(product.price)}
📏 *সাইজ:* ${size}
🔢 *পরিমাণ:* ${quantity} set

━━━━━━━━━━━━━━━━━━━

👤 *নাম:* ${formData.name}
📱 *ফোন:* ${formData.phone}
📍 *ঠিকানা:* ${formData.address}
🏙️ *এলাকা:* ${formData.area}

━━━━━━━━━━━━━━━━━━━

💵 *সাবটোটাল:* ${formatPrice(product.price * quantity)}
🚚 *ডেলিভারি:* ${formatPrice(deliveryCharge)}
💰 *সর্বমোট:* ${formatPrice(total)}

📝 *বিশেষ নির্দেশনা:* ${formData.notes || 'নেই'}

━━━━━━━━━━━━━━━━━━━
INAYA - Handcrafted with Love 💕
    `.trim();
    
    return message;
}

/**
 * Open WhatsApp with pre-filled message
 */
function openWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
    
    // Show success animation first
    showOrderSuccess();
    
    // Open WhatsApp after short delay
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 1500);
}

/**
 * Show order success animation
 */
function showOrderSuccess() {
    const overlay = document.createElement('div');
    overlay.className = 'success-overlay';
    overlay.innerHTML = `
        <div class="success-content">
            <div class="success-animation">
                <div class="success-icon">✓</div>
            </div>
            <h2>অর্ডার প্রস্তুত!</h2>
            <p>WhatsApp এ মেসেজ পাঠাতে নিচের বাটনে ক্লিক করুন</p>
            <div class="whatsapp-redirect">
                <span class="whatsapp-icon">📱</span>
                <span>WhatsApp এ নিয়ে যাওয়া হচ্ছে...</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Animate in
    setTimeout(() => overlay.classList.add('show'), 10);
}