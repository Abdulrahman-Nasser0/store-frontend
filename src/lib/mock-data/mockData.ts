import type { 
  Laptop, 
  LaptopById, 
  PaginatedLaptopsResponse,
  LaptopVariantsResponse,
  LaptopVariantDetailed,
  LaptopVariantInfo
} from '../types';

// Mock Laptops Data
export const mockLaptops: Laptop[] = [
  {
    id: 1,
    modelName: "Dell XPS 15",
    brand: {
      id: 1,
      name: "Dell",
      country: "USA",
      logoUrl: "https://logo.clearbit.com/dell.com"
    },
    category: {
      id: 1,
      name: "Gaming",
      description: "High-performance gaming laptops"
    },
    processor: "Intel Core i7-13700H",
    gpu: "NVIDIA RTX 4060",
    screenSize: "15.6 inches",
    hasCamera: true,
    hasKeyboard: true,
    hasTouchScreen: true,
    releaseYear: 2024,
    isActive: true,
    variantCount: 3,
    priceRange: {
      min: 1499,
      max: 2199
    },
    averageRating: 4.5,
    mainImage: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    modelName: "MacBook Pro 16",
    brand: {
      id: 2,
      name: "Apple",
      country: "USA",
      logoUrl: "https://logo.clearbit.com/apple.com"
    },
    category: {
      id: 2,
      name: "Professional",
      description: "Professional workstation laptops"
    },
    processor: "Apple M3 Pro",
    gpu: "Apple M3 Pro GPU",
    screenSize: "16 inches",
    hasCamera: true,
    hasKeyboard: true,
    hasTouchScreen: false,
    releaseYear: 2024,
    isActive: true,
    variantCount: 4,
    priceRange: {
      min: 2499,
      max: 3999
    },
    averageRating: 4.8,
    mainImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    modelName: "HP Spectre x360",
    brand: {
      id: 3,
      name: "HP",
      country: "USA",
      logoUrl: "https://logo.clearbit.com/hp.com"
    },
    category: {
      id: 3,
      name: "Ultrabook",
      description: "Slim and portable ultrabooks"
    },
    processor: "Intel Core i7-1355U",
    gpu: "Intel Iris Xe",
    screenSize: "13.5 inches",
    hasCamera: true,
    hasKeyboard: true,
    hasTouchScreen: true,
    releaseYear: 2024,
    isActive: true,
    variantCount: 2,
    priceRange: {
      min: 1299,
      max: 1799
    },
    averageRating: 4.3,
    mainImage: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    modelName: "Lenovo Legion 5 Pro",
    brand: {
      id: 4,
      name: "Lenovo",
      country: "China",
      logoUrl: "https://logo.clearbit.com/lenovo.com"
    },
    category: {
      id: 1,
      name: "Gaming",
      description: "High-performance gaming laptops"
    },
    processor: "AMD Ryzen 7 7745HX",
    gpu: "NVIDIA RTX 4070",
    screenSize: "16 inches",
    hasCamera: true,
    hasKeyboard: true,
    hasTouchScreen: false,
    releaseYear: 2024,
    isActive: true,
    variantCount: 3,
    priceRange: {
      min: 1699,
      max: 2299
    },
    averageRating: 4.6,
    mainImage: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    modelName: "ASUS ROG Zephyrus G14",
    brand: {
      id: 5,
      name: "ASUS",
      country: "Taiwan",
      logoUrl: "https://logo.clearbit.com/asus.com"
    },
    category: {
      id: 1,
      name: "Gaming",
      description: "High-performance gaming laptops"
    },
    processor: "AMD Ryzen 9 7940HS",
    gpu: "NVIDIA RTX 4060",
    screenSize: "14 inches",
    hasCamera: true,
    hasKeyboard: true,
    hasTouchScreen: false,
    releaseYear: 2024,
    isActive: true,
    variantCount: 2,
    priceRange: {
      min: 1599,
      max: 1999
    },
    averageRating: 4.7,
    mainImage: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    modelName: "Microsoft Surface Laptop 5",
    brand: {
      id: 6,
      name: "Microsoft",
      country: "USA",
      logoUrl: "https://logo.clearbit.com/microsoft.com"
    },
    category: {
      id: 3,
      name: "Ultrabook",
      description: "Slim and portable ultrabooks"
    },
    processor: "Intel Core i7-1255U",
    gpu: "Intel Iris Xe",
    screenSize: "13.5 inches",
    hasCamera: true,
    hasKeyboard: true,
    hasTouchScreen: true,
    releaseYear: 2023,
    isActive: true,
    variantCount: 3,
    priceRange: {
      min: 999,
      max: 1799
    },
    averageRating: 4.4,
    mainImage: "https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=800&auto=format&fit=crop"
  },
  {
    id: 7,
    modelName: "Acer Predator Helios 300",
    brand: {
      id: 7,
      name: "Acer",
      country: "Taiwan",
      logoUrl: "https://logo.clearbit.com/acer.com"
    },
    category: {
      id: 1,
      name: "Gaming",
      description: "High-performance gaming laptops"
    },
    processor: "Intel Core i7-13700HX",
    gpu: "NVIDIA RTX 4060",
    screenSize: "15.6 inches",
    hasCamera: true,
    hasKeyboard: true,
    hasTouchScreen: false,
    releaseYear: 2024,
    isActive: true,
    variantCount: 2,
    priceRange: {
      min: 1399,
      max: 1899
    },
    averageRating: 4.2,
    mainImage: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop"
  },
  {
    id: 8,
    modelName: "Razer Blade 15",
    brand: {
      id: 8,
      name: "Razer",
      country: "USA",
      logoUrl: "https://logo.clearbit.com/razer.com"
    },
    category: {
      id: 1,
      name: "Gaming",
      description: "High-performance gaming laptops"
    },
    processor: "Intel Core i9-13950HX",
    gpu: "NVIDIA RTX 4080",
    screenSize: "15.6 inches",
    hasCamera: true,
    hasKeyboard: true,
    hasTouchScreen: false,
    releaseYear: 2024,
    isActive: true,
    variantCount: 3,
    priceRange: {
      min: 2799,
      max: 3999
    },
    averageRating: 4.6,
    mainImage: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&auto=format&fit=crop"
  },
  {
    id: 9,
    modelName: "ThinkPad X1 Carbon Gen 11",
    brand: {
      id: 4,
      name: "Lenovo",
      country: "China",
      logoUrl: "https://logo.clearbit.com/lenovo.com"
    },
    category: {
      id: 2,
      name: "Professional",
      description: "Professional workstation laptops"
    },
    processor: "Intel Core i7-1365U",
    gpu: "Intel Iris Xe",
    screenSize: "14 inches",
    hasCamera: true,
    hasKeyboard: true,
    hasTouchScreen: true,
    releaseYear: 2024,
    isActive: true,
    variantCount: 4,
    priceRange: {
      min: 1599,
      max: 2499
    },
    averageRating: 4.7,
    mainImage: "https://images.unsplash.com/photo-1504707748692-419802cf939d?w=800&auto=format&fit=crop"
  }
];

// Function to get mock laptops with pagination
export function getMockLaptops({
  page = 1,
  pageSize = 20,
  search,
  categoryId,
  isActive,
}: {
  page?: number;
  pageSize?: number;
  search?: string;
  categoryId?: number;
  isActive?: boolean;
} = {}): PaginatedLaptopsResponse {
  let filtered = [...mockLaptops];

  // Filter by search
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(laptop =>
      laptop.modelName.toLowerCase().includes(searchLower) ||
      laptop.brand.name.toLowerCase().includes(searchLower) ||
      laptop.processor.toLowerCase().includes(searchLower)
    );
  }

  // Filter by category
  if (categoryId !== undefined) {
    filtered = filtered.filter(laptop => laptop.category.id === categoryId);
  }

  // Filter by active status
  if (isActive !== undefined) {
    filtered = filtered.filter(laptop => laptop.isActive === isActive);
  }

  // Pagination
  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCount);
  const items = filtered.slice(startIndex, endIndex);

  return {
    items,
    page,
    pageSize,
    totalCount,
    totalPages,
    hasPrevious: page > 1,
    hasNext: page < totalPages,
    startIndex: startIndex + 1,
    endIndex
  };
}

// ========================================
// MOCK VARIANTS DATA
// ========================================

// Generate detailed variants for a specific laptop
function generateMockVariants(laptopId: number): LaptopVariantDetailed[] {
  const variantConfigs = [
    // Laptop 1: Dell XPS 15 - Gaming
    [
      { ram: 16, storage: 512, storageType: 'SSD', price: 1499, originalPrice: 1699, stock: 25, reserved: 3 },
      { ram: 32, storage: 1024, storageType: 'NVMe SSD', price: 2199, originalPrice: 2199, stock: 15, reserved: 2 },
      { ram: 64, storage: 2048, storageType: 'NVMe SSD', price: 2899, originalPrice: 3099, stock: 5, reserved: 1 },
    ],
    // Laptop 2: MacBook Pro 16 - Professional
    [
      { ram: 16, storage: 512, storageType: 'SSD', price: 2499, originalPrice: 2799, stock: 30, reserved: 5 },
      { ram: 32, storage: 1024, storageType: 'SSD', price: 3199, originalPrice: 3499, stock: 20, reserved: 3 },
      { ram: 64, storage: 2048, storageType: 'SSD', price: 3999, originalPrice: 3999, stock: 10, reserved: 2 },
      { ram: 96, storage: 4096, storageType: 'SSD', price: 5499, originalPrice: 5999, stock: 3, reserved: 1 },
    ],
    // Laptop 3: HP Spectre x360 - Ultrabook
    [
      { ram: 16, storage: 512, storageType: 'SSD', price: 1299, originalPrice: 1499, stock: 18, reserved: 2 },
      { ram: 32, storage: 1024, storageType: 'NVMe SSD', price: 1799, originalPrice: 1999, stock: 12, reserved: 1 },
    ],
    // Laptop 4: Lenovo Legion 5 Pro - Gaming
    [
      { ram: 16, storage: 512, storageType: 'SSD', price: 1699, originalPrice: 1899, stock: 22, reserved: 4 },
      { ram: 32, storage: 1024, storageType: 'NVMe SSD', price: 2099, originalPrice: 2299, stock: 14, reserved: 2 },
      { ram: 32, storage: 2048, storageType: 'NVMe SSD', price: 2599, originalPrice: 2599, stock: 0, reserved: 0 },
    ],
    // Laptop 5: ASUS ROG Zephyrus G14 - Gaming
    [
      { ram: 16, storage: 512, storageType: 'SSD', price: 1599, originalPrice: 1799, stock: 20, reserved: 3 },
      { ram: 32, storage: 1024, storageType: 'NVMe SSD', price: 1999, originalPrice: 1999, stock: 8, reserved: 1 },
    ],
    // Laptop 6: Microsoft Surface Laptop 5 - Ultrabook
    [
      { ram: 8, storage: 256, storageType: 'SSD', price: 999, originalPrice: 1199, stock: 35, reserved: 5 },
      { ram: 16, storage: 512, storageType: 'SSD', price: 1399, originalPrice: 1599, stock: 25, reserved: 4 },
      { ram: 32, storage: 1024, storageType: 'SSD', price: 1799, originalPrice: 1999, stock: 15, reserved: 2 },
    ],
    // Laptop 7: Acer Predator Helios 300 - Gaming
    [
      { ram: 16, storage: 512, storageType: 'SSD', price: 1399, originalPrice: 1599, stock: 28, reserved: 4 },
      { ram: 32, storage: 1024, storageType: 'NVMe SSD', price: 1899, originalPrice: 1899, stock: 12, reserved: 2 },
    ],
    // Laptop 8: Razer Blade 15 - Gaming
    [
      { ram: 16, storage: 1024, storageType: 'SSD', price: 2799, originalPrice: 3199, stock: 15, reserved: 3 },
      { ram: 32, storage: 1024, storageType: 'NVMe SSD', price: 3299, originalPrice: 3699, stock: 10, reserved: 2 },
      { ram: 32, storage: 2048, storageType: 'NVMe SSD', price: 3999, originalPrice: 3999, stock: 5, reserved: 1 },
    ],
    // Laptop 9: ThinkPad X1 Carbon Gen 11 - Professional
    [
      { ram: 16, storage: 512, storageType: 'SSD', price: 1599, originalPrice: 1799, stock: 30, reserved: 4 },
      { ram: 32, storage: 1024, storageType: 'SSD', price: 1999, originalPrice: 2199, stock: 20, reserved: 3 },
      { ram: 32, storage: 2048, storageType: 'NVMe SSD', price: 2499, originalPrice: 2699, stock: 12, reserved: 2 },
      { ram: 64, storage: 2048, storageType: 'NVMe SSD', price: 3199, originalPrice: 3199, stock: 4, reserved: 1 },
    ],
  ];

  const configs = variantConfigs[laptopId - 1] || variantConfigs[0];
  const laptop = mockLaptops.find(l => l.id === laptopId);
  
  return configs.map((config, index) => {
    const availableQty = config.stock - config.reserved;
    const discountPercentage = Math.round(((config.originalPrice - config.price) / config.originalPrice) * 100);
    const discountAmount = config.originalPrice - config.price;
    
    // Determine stock status
    let stockStatus = 'InStock';
    if (config.stock === 0) {
      stockStatus = 'OutOfStock';
    } else if (availableQty <= 5) {
      stockStatus = 'LowStock';
    }
    
    return {
      id: laptopId * 100 + index + 1,
      sku: `${laptop?.brand.name.toUpperCase().substring(0, 3)}-${laptopId}-${config.ram}-${config.storage}-${config.storageType.replace(' ', '')}`,
      ram: config.ram,
      storage: config.storage,
      storageType: config.storageType,
      currentPrice: config.price,
      originalPrice: config.originalPrice,
      discountPercentage,
      discountAmount,
      stockQuantity: config.stock,
      reservedQuantity: config.reserved,
      availableQuantity: availableQty,
      stockStatus,
      reorderLevel: 5,
      isActive: true,
      createdAt: new Date(2024, 0, 1).toISOString(),
      updatedAt: new Date(2024, 10, 2).toISOString(),
    };
  });
}

// Function to get mock laptop variants (matching backend API structure)
export function getMockLaptopVariants(
  laptopId: number,
  page: number = 1,
  pageSize: number = 10,
  inStockOnly: boolean = false
): LaptopVariantsResponse {
  const laptop = mockLaptops.find(l => l.id === laptopId);
  
  if (!laptop) {
    throw new Error(`Laptop with id ${laptopId} not found`);
  }
  
  let variants = generateMockVariants(laptopId);
  
  // Filter by stock if requested
  if (inStockOnly) {
    variants = variants.filter(v => v.stockStatus === 'InStock' || v.stockStatus === 'LowStock');
  }
  
  // Pagination
  const totalCount = variants.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCount);
  const items = variants.slice(startIndex, endIndex);
  
  const laptopInfo: LaptopVariantInfo = {
    id: laptop.id,
    modelName: laptop.modelName,
    processor: laptop.processor,
    gpu: laptop.gpu,
    screenSize: laptop.screenSize,
    hasCamera: laptop.hasCamera,
    hasTouchScreen: laptop.hasTouchScreen,
  };
  
  return {
    laptop: laptopInfo,
    variants: {
      items,
      page,
      pageSize,
      totalCount,
      totalPages,
      hasPrevious: page > 1,
      hasNext: page < totalPages,
      startIndex: startIndex + 1,
      endIndex,
    },
  };
}

// Function to get mock laptop by ID
export function getMockLaptopById(id: string): LaptopById | null {
  const laptop = mockLaptops.find(l => l.id === parseInt(id));
  if (!laptop) return null;

  // Generate detailed laptop data based on the basic laptop
  return {
    id: laptop.id,
    modelName: laptop.modelName,
    brand: laptop.brand,
    category: laptop.category,
    processor: laptop.processor,
    gpu: laptop.gpu,
    screenSize: laptop.screenSize,
    hasCamera: laptop.hasCamera,
    hasKeyboard: laptop.hasKeyboard,
    hasTouchScreen: laptop.hasTouchScreen,
    description: `The ${laptop.modelName} is a powerful ${laptop.category.name.toLowerCase()} laptop featuring the latest ${laptop.processor} processor and ${laptop.gpu} graphics. Perfect for professionals and enthusiasts who demand top-tier performance.`,
    releaseYear: laptop.releaseYear,
    storeLocation: "123 Tech Street, Silicon Valley, CA 94000",
    storeContact: "+1 (555) 123-4567",
    isActive: laptop.isActive,
    createdAt: new Date(2024, 0, 1).toISOString(),
    updatedAt: new Date(2024, 10, 2).toISOString(),
    ports: [
      { id: 1, type: "USB-C", quantity: 2 },
      { id: 2, type: "USB-A", quantity: 2 },
      { id: 3, type: "HDMI", quantity: 1 },
      { id: 4, type: "Audio Jack", quantity: 1 }
    ],
    warranty: {
      id: 1,
      durationMonths: 24,
      type: "Standard",
      coverage: "Covers hardware defects and manufacturing issues",
      provider: laptop.brand.name
    },
    images: [
      { id: 1, url: laptop.mainImage, isMain: true, displayOrder: 1 },
      { id: 2, url: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&auto=format&fit=crop", isMain: false, displayOrder: 2 },
      { id: 3, url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop", isMain: false, displayOrder: 3 },
      { id: 4, url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop", isMain: false, displayOrder: 4 }
    ],
    variants: [
      {
        id: 1,
        sku: `${laptop.brand.name.toUpperCase()}-${laptop.id}-001`,
        ram: 16,
        storage: 512,
        storageType: "SSD",
        currentPrice: laptop.priceRange.min,
        stockStatus: "InStock"
      },
      {
        id: 2,
        sku: `${laptop.brand.name.toUpperCase()}-${laptop.id}-002`,
        ram: 32,
        storage: 1024,
        storageType: "SSD",
        currentPrice: laptop.priceRange.max,
        stockStatus: "InStock"
      },
      {
        id: 3,
        sku: `${laptop.brand.name.toUpperCase()}-${laptop.id}-003`,
        ram: 64,
        storage: 2048,
        storageType: "SSD",
        currentPrice: Math.round(laptop.priceRange.max * 1.3),
        stockStatus: "LowStock"
      }
    ],
    statistics: {
      averageRating: laptop.averageRating,
      totalReviews: Math.floor(Math.random() * 200) + 50,
      totalSales: Math.floor(Math.random() * 1000) + 100,
      viewCount: Math.floor(Math.random() * 5000) + 500
    }
  };
}

// ==========================================
// CART MOCK DATA
// ==========================================

import type { CartData, CartItem, AddToCartResponse } from '../types';

// In-memory cart storage for mock mode
let mockCartItems: CartItem[] = [];
let nextCartItemId = 1;

export function getMockCart(): CartData {
  const subtotal = mockCartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const discount = mockCartItems.reduce((sum, item) => sum + item.discountAmount * item.quantity, 0);
  const tax = 0;
  const shipping = 0;
  const total = subtotal - discount + tax + shipping;

  return {
    items: mockCartItems,
    totalItems: mockCartItems.reduce((sum, item) => sum + item.quantity, 0),
    subtotal,
    discount,
    tax,
    shipping,
    total,
    appliedDiscountCode: null
  };
}

export function addMockCartItem(productType: string, productId: number, quantity: number): AddToCartResponse {
  // Find the product (currently only supporting LaptopVariant)
  if (productType === 'LaptopVariant') {
    // Find the variant across all laptops
    let foundVariant: LaptopVariantDetailed | null = null;
    let foundLaptop: Laptop | null = null;

    for (const laptop of mockLaptops) {
      const variantsResponse = getMockLaptopVariants(laptop.id, 1, 100);
      const variant = variantsResponse.variants.items.find((v: LaptopVariantDetailed) => v.id === productId);
      if (variant) {
        foundVariant = variant;
        foundLaptop = laptop;
        break;
      }
    }

    if (!foundVariant || !foundLaptop) {
      throw new Error('Product not found');
    }

    // Check if item already exists in cart
    const existingItem = mockCartItems.find(
      item => item.productType === productType && item.productId === productId
    );

    if (existingItem) {
      // Update quantity
      existingItem.quantity += quantity;
      existingItem.totalPrice = existingItem.unitPrice * existingItem.quantity;

      const cartSummary = getMockCart();
      return {
        id: existingItem.id,
        productType: existingItem.productType,
        productId: existingItem.productId,
        productName: existingItem.productName,
        quantity: existingItem.quantity,
        unitPrice: existingItem.unitPrice,
        totalPrice: existingItem.totalPrice,
        addedAt: existingItem.addedAt,
        cartSummary: {
          totalItems: cartSummary.totalItems,
          total: cartSummary.total
        }
      };
    }

    // Create new cart item
    const newItem: CartItem = {
      id: nextCartItemId++,
      productType,
      productId,
      productName: `${foundLaptop.modelName} - ${foundVariant.ram}GB RAM, ${foundVariant.storage}GB ${foundVariant.storageType}`,
      sku: foundVariant.sku,
      quantity,
      unitPrice: foundVariant.currentPrice,
      discountAmount: foundVariant.discountAmount || 0,
      totalPrice: foundVariant.currentPrice * quantity,
      stockAvailable: foundVariant.availableQuantity,
      image: foundLaptop.mainImage || '/fallback.jpeg',
      addedAt: new Date().toISOString()
    };

    mockCartItems.push(newItem);

    const cartSummary = getMockCart();
    return {
      id: newItem.id,
      productType: newItem.productType,
      productId: newItem.productId,
      productName: newItem.productName,
      quantity: newItem.quantity,
      unitPrice: newItem.unitPrice,
      totalPrice: newItem.totalPrice,
      addedAt: newItem.addedAt,
      cartSummary: {
        totalItems: cartSummary.totalItems,
        total: cartSummary.total
      }
    };
  }

  throw new Error('Unsupported product type');
}

export function updateMockCartItem(itemId: number, quantity: number): CartItem {
  const item = mockCartItems.find(i => i.id === itemId);
  if (!item) {
    throw new Error('Cart item not found');
  }

  if (quantity <= 0) {
    throw new Error('Quantity must be greater than 0');
  }

  item.quantity = quantity;
  item.totalPrice = item.unitPrice * quantity;

  return item;
}

export function removeMockCartItem(itemId: number): { removedItemId: number; cartSummary: { totalItems: number; total: number } } {
  const index = mockCartItems.findIndex(i => i.id === itemId);
  if (index === -1) {
    throw new Error('Cart item not found');
  }

  mockCartItems.splice(index, 1);

  const cartSummary = getMockCart();
  return {
    removedItemId: itemId,
    cartSummary: {
      totalItems: cartSummary.totalItems,
      total: cartSummary.total
    }
  };
}

export function clearMockCart(): { itemsRemoved: number; clearedAt: string } {
  const itemsRemoved = mockCartItems.length;
  mockCartItems = [];
  nextCartItemId = 1;

  return {
    itemsRemoved,
    clearedAt: new Date().toISOString()
  };
}
