/**
 * ═══════════════════════════════════════════════════════════════
 * INAYA - Products Database
 * ═══════════════════════════════════════════════════════════════
 * 
 * 🛍️ ADD YOUR PRODUCTS HERE
 * 
 * HOW TO ADD A NEW PRODUCT:
 * 1. Copy an existing product block
 * 2. Change the id (must be unique)
 * 3. Update all the details
 * 4. Save the file
 * 
 * IMAGE OPTIONS:
 * - Use Unsplash: "https://images.unsplash.com/photo-xxx"
 * - Use Google Drive: "https://drive.google.com/uc?id=YOUR_FILE_ID"
 * - Use local: "./assets/images/your-image.jpg"
 * 
 * ═══════════════════════════════════════════════════════════════
 */

const PRODUCTS = [
    
    // ═══════════════════════════════════════════════════════════
    // PRODUCT 1
    // ═══════════════════════════════════════════════════════════
    {
        id: "bangle-001",
        name: "Golden Pearl Bangle Set",
        nameBn: "সোনালী মুক্তার চুড়ি সেট",
        price: 450,
        originalPrice: 550,      // Optional: for showing discount (set to 0 if no discount)
        
        // Main image (shown in product card)
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop",
        
        // Gallery images (shown in product detail page)
        gallery: [
            "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop"
        ],
        
        category: "bangles",
        
        description: "Elegant golden bangles with delicate pearl embellishments. Perfect for weddings and special occasions.",
        descriptionBn: "সূক্ষ্ম মুক্তার কাজ সহ মার্জিত সোনালী চুড়ি। বিয়ে এবং বিশেষ অনুষ্ঠানের জন্য উপযুক্ত।",
        
        // Available sizes
        sizes: ["2.4", "2.6", "2.8"],
        
        // Number in one set
        setQuantity: 4,
        
        // Tags for filtering (lowercase)
        tags: ["wedding", "golden", "pearl", "traditional"],
        
        // Is this a featured product? (shows on homepage)
        featured: true,
        
        // Is this product available?
        inStock: true,
        
        // Is this a new arrival?
        isNew: true,
        
        // Is this on sale?
        onSale: true
    },
    
    // ═══════════════════════════════════════════════════════════
    // PRODUCT 2
    // ═══════════════════════════════════════════════════════════
    {
        id: "bangle-002",
        name: "Rose Pink Thread Bangles",
        nameBn: "গোলাপি সুতার চুড়ি",
        price: 320,
        originalPrice: 0,
        
        image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400&h=400&fit=crop",
        
        gallery: [
            "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=600&fit=crop"
        ],
        
        category: "bangles",
        
        description: "Beautiful handmade thread bangles in soft rose pink color. Lightweight and comfortable for daily wear.",
        descriptionBn: "নরম গোলাপি রঙে সুন্দর হাতে তৈরি সুতার চুড়ি। হালকা ওজন এবং প্রতিদিনের ব্যবহারের জন্য আরামদায়ক।",
        
        sizes: ["2.2", "2.4", "2.6", "2.8"],
        setQuantity: 6,
        tags: ["casual", "pink", "thread", "handmade"],
        featured: true,
        inStock: true,
        isNew: false,
        onSale: false
    },
    
    // ═══════════════════════════════════════════════════════════
    // PRODUCT 3
    // ═══════════════════════════════════════════════════════════
    {
        id: "bangle-003",
        name: "Crystal Stone Bangles",
        nameBn: "ক্রিস্টাল পাথরের চুড়ি",
        price: 580,
        originalPrice: 700,
        
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
        
        gallery: [
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=600&fit=crop"
        ],
        
        category: "bangles",
        
        description: "Stunning crystal stone bangles that sparkle beautifully in light. Premium quality stones with secure settings.",
        descriptionBn: "অত্যাশ্চর্য ক্রিস্টাল পাথরের চুড়ি যা আলোতে সুন্দরভাবে ঝলমল করে। নিরাপদ সেটিং সহ প্রিমিয়াম মানের পাথর।",
        
        sizes: ["2.4", "2.6", "2.8", "2.10"],
        setQuantity: 2,
        tags: ["party", "crystal", "premium", "sparkle"],
        featured: true,
        inStock: true,
        isNew: true,
        onSale: true
    },
    
    // ═══════════════════════════════════════════════════════════
    // PRODUCT 4
    // ═══════════════════════════════════════════════════════════
    {
        id: "bangle-004",
        name: "Antique Copper Bangles",
        nameBn: "অ্যান্টিক তামার চুড়ি",
        price: 420,
        originalPrice: 0,
        
        image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
        
        gallery: [
            "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop"
        ],
        
        category: "bangles",
        
        description: "Classic antique-finish copper bangles with intricate traditional patterns. Timeless elegance for any outfit.",
        descriptionBn: "জটিল ঐতিহ্যবাহী প্যাটার্ন সহ ক্লাসিক অ্যান্টিক-ফিনিশ তামার চুড়ি। যেকোনো পোশাকের জন্য চিরন্তন কমনীয়তা।",
        
        sizes: ["2.4", "2.6", "2.8"],
        setQuantity: 4,
        tags: ["antique", "copper", "traditional", "ethnic"],
        featured: false,
        inStock: true,
        isNew: false,
        onSale: false
    },
    
    // ═══════════════════════════════════════════════════════════
    // PRODUCT 5
    // ═══════════════════════════════════════════════════════════
    {
        id: "bangle-005",
        name: "Meenakari Enamel Bangles",
        nameBn: "মীনাকারি এনামেল চুড়ি",
        price: 650,
        originalPrice: 750,
        
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=400&fit=crop",
        
        gallery: [
            "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&h=600&fit=crop"
        ],
        
        category: "bangles",
        
        description: "Exquisite Meenakari enamel work bangles in vibrant colors. Traditional Rajasthani art form, handcrafted by skilled artisans.",
        descriptionBn: "উজ্জ্বল রঙে চমৎকার মীনাকারি এনামেল কাজের চুড়ি। ঐতিহ্যবাহী রাজস্থানী শিল্প, দক্ষ কারিগরদের হাতে তৈরি।",
        
        sizes: ["2.4", "2.6"],
        setQuantity: 2,
        tags: ["meenakari", "colorful", "rajasthani", "artisan"],
        featured: true,
        inStock: true,
        isNew: false,
        onSale: true
    },
    
    // ═══════════════════════════════════════════════════════════
    // PRODUCT 6
    // ═══════════════════════════════════════════════════════════
    {
        id: "bangle-006",
        name: "Silk Thread Designer Set",
        nameBn: "সিল্ক থ্রেড ডিজাইনার সেট",
        price: 380,
        originalPrice: 0,
        
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
        
        gallery: [
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop"
        ],
        
        category: "bangles",
        
        description: "Trendy silk thread bangles with modern designs. Perfect blend of traditional craft and contemporary style.",
        descriptionBn: "আধুনিক ডিজাইনের সাথে ট্রেন্ডি সিল্ক থ্রেড চুড়ি। ঐতিহ্যবাহী শিল্প এবং সমসাময়িক স্টাইলের নিখুঁত মিশ্রণ।",
        
        sizes: ["2.2", "2.4", "2.6", "2.8", "2.10"],
        setQuantity: 8,
        tags: ["silk", "trendy", "colorful", "modern"],
        featured: false,
        inStock: true,
        isNew: true,
        onSale: false
    }
];

// ═══════════════════════════════════════════════════════════════
// CATEGORIES (for filtering)
// ═══════════════════════════════════════════════════════════════

const CATEGORIES = [
    {
        id: "all",
        name: "All Products",
        nameBn: "সব পণ্য",
        icon: "✨"
    },
    {
        id: "bangles",
        name: "Bangles",
        nameBn: "চুড়ি",
        icon: "💫"
    },
    {
        id: "coming-soon",
        name: "Coming Soon",
        nameBn: "শীঘ্রই আসছে",
        icon: "🎁"
    }
];

// Make data globally accessible
window.PRODUCTS = PRODUCTS;
window.CATEGORIES = CATEGORIES;