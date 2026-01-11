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
        name: "Blue and White combination bangles",
        nameBn: "নীল ও হোয়াইট কম্বিনেশনের চুড়ি",
        price: 500,
        originalPrice: 550,      // Optional: for showing discount (set to 0 if no discount)
        
        // Main image (shown in product card)
        image: "./assets/images/image1.jpeg",
        
        // Gallery images (shown in product detail page)
        gallery: [
            "./assets/images/image1.jpeg",
            "./assets/images/image11.jpeg"
        ],
        
        category: "bangles",
        
        description: "Elegant blue with excellent white bangles with delicate diamond pearl embellishments. Perfect for weddings and special occasions.",
        descriptionBn: "সূক্ষ নীল ও চমৎকার সাদা ডায়মন্ড পার্ল সজ্জা সহ মার্জিত পার্পেল এবং সাদা চুড়ি। বিবাহ এবং বিশেষ অনুষ্ঠানের জন্য উপযুক্ত।",
        
        // Available sizes
        sizes: ["24", "26", "28"],
        
        // Number in one set
        setQuantity: 4,
        
        // Tags for filtering (lowercase)
        tags: ["wedding", "purple", "white", "traditional"],
        
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
        name: "Trendy purple Thread Bangles",
        nameBn: "আধুনিক পার্পেল সুতার চুড়ি",
        price: 320,
        originalPrice: 0,
        
        image: "./assets/images/image2.jpeg",
        
        gallery: [
            "./assets/images/image2.jpeg",
            "./assets/images/image21.jpeg"
        ],
        
        category: "bangles",
        
        description: "Beautiful handmade thread bangles in soft rose pink color. Lightweight and comfortable for daily wear.",
        descriptionBn: "নরম গোলাপি রঙে সুন্দর হাতে তৈরি সুতার চুড়ি। হালকা ওজন এবং প্রতিদিনের ব্যবহারের জন্য আরামদায়ক।",
        
        sizes: ["24", "26", "28"],
        setQuantity: 4,
        tags: ["casual", "purple", "thread", "handmade"],
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
        name: "Crystal Stone on Navy Blue Bangles",
        nameBn: "ক্রিস্টাল পাথরের নেভিব্লু চুড়ি",
        price: 630,
        originalPrice: 700,
        
        image: "./assets/images/image3.jpeg",
        
        gallery: [
            "./assets/images/image3.jpeg",
            "./assets/images/image31.jpeg"
        ],
        
        category: "bangles",
        
        description: "Stunning crystal stone bangles that sparkle beautifully in light. Premium quality stones with secure settings.",
        descriptionBn: "অত্যাশ্চর্য ক্রিস্টাল পাথরের চুড়ি যা আলোতে সুন্দরভাবে ঝলমল করে। নিরাপদ সেটিং সহ প্রিমিয়াম মানের পাথর।",
        
        sizes: ["24", "26", "28"],
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
        name: "Aesthetic Black Bangles",
        nameBn: " নান্দনিক কালো চুড়ি",
        price: 420,
        originalPrice: 0,
        
        image: "./assets/images/image4.jpeg",
        
        gallery: [
            "./assets/images/image4.jpeg",
            "./assets/images/image41.jpeg"
        ],
        
        category: "bangles",
        
        description: "Classic antique-finish copper bangles with intricate traditional patterns. Timeless elegance for any outfit.",
        descriptionBn: "জটিল ঐতিহ্যবাহী প্যাটার্ন সহ ক্লাসিক অ্যান্টিক-ফিনিশ তামার চুড়ি। যেকোনো পোশাকের জন্য চিরন্তন কমনীয়তা।",
        
        sizes: ["24", "26", "28"],
        setQuantity: 4,
        tags: ["aesthetic", "black", "traditional", "ethnic"],
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
        name: "Aesthetic Square bangle with Meenakari Enamel",
        nameBn: "নান্দনিক স্কয়ার মীনাকারি এনামেল চুড়ি",
        price: 650,
        originalPrice: 750,
        
        image: "./assets/images/image5.jpeg",
        
        gallery: [
            "./assets/images/image5.jpeg",
            "./assets/images/image51.jpeg"
        ],
        
        category: "bangles",
        
        description: "Exquisite blue Meenakari enamel work bangles in vibrant colors. Traditional Rajasthani art form, handcrafted.",
        descriptionBn: "উজ্জ্বল নীল রঙে চমৎকার মীনাকারি এনামেল কাজের চুড়ি। ঐতিহ্যবাহী রাজস্থানী শিল্প, দক্ষ হাতে তৈরি।",
        
        sizes: ["24", "26"],
        setQuantity: 2,
        tags: ["meenakari", "colorful", "blue", "square", "rajasthani", "artisan"],
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
        name: "Modern Bllue bangle Set with golden stones",
        nameBn: "মডার্ন নীল চুড়ি সেট সোনালী পাথর সহ",
        price: 380,
        originalPrice: 0,
        
        image: "./assets/images/image6.jpg",
        
        gallery: [
            "./assets/images/image6.jpg",
            "./assets/images/image61.jpg"
        ],
        
        category: "bangles",
        
        description: "Trendy blue silk thread bangles with modern designs. Perfect blend of traditional craft and contemporary style.",
        descriptionBn: "আধুনিক ডিজাইনের সাথে ট্রেন্ডি নীল সিল্ক থ্রেড চুড়ি। ঐতিহ্যবাহী শিল্প এবং সমসাময়িক স্টাইলের নিখুঁত মিশ্রণ।",
        
        sizes: ["24", "26", "28"],
        setQuantity: 2,
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