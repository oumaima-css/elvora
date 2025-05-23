
export type ProductCategory = 
  // Men's categories
  | 'portfolios' 
  | 'watches' 
  | 'pants-belts' 
  | 'leather-wallets' 
  | 'backpacks' 
  | 'computer-bags'
  // Women's categories 
  | 'bags-purses'
  | 'cosmetics'
  | 'beauty-skincare'
  | 'jewelry';

export type Gender = 'men' | 'women';

export interface ProductImage {
  url: string;
  color?: string;
  alt?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: ProductImage[];
  gender: Gender;
  category: ProductCategory;
  featured?: boolean;
  new?: boolean;
  bestSeller?: boolean;
  stock: number;
  colors?: string[];
  sizes?: string[];
}

export const products: Product[] = [
  // Men's Products
  {
    id: 'm1',
    name: 'Executive Leather Portfolio',
    description: 'A sophisticated leather portfolio for the modern professional. Features multiple compartments and premium craftsmanship.',
    price: 129.99,
    images: [
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', color: 'Black', alt: 'Black Executive Portfolio' },
      { url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=500', color: 'Brown', alt: 'Brown Executive Portfolio' },
      { url: 'https://images.unsplash.com/photo-1491336477066-31156b5e4f35?w=500', color: 'Navy', alt: 'Navy Executive Portfolio' }
    ],
    gender: 'men',
    category: 'portfolios',
    featured: true,
    stock: 15,
    colors: ['Black', 'Brown', 'Navy']
  },
  {
    id: 'm2',
    name: 'Chronograph Watch',
    description: 'Precision timekeeping with elegant design. Water-resistant up to 50m with premium stainless steel construction.',
    price: 349.99,
    images: [
      { url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500', color: 'Silver', alt: 'Silver Chronograph Watch' },
      { url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500', color: 'Gold', alt: 'Gold Chronograph Watch' },
      { url: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=500', color: 'Black', alt: 'Black Chronograph Watch' }
    ],
    gender: 'men',
    category: 'watches',
    bestSeller: true,
    stock: 8,
    colors: ['Silver', 'Gold', 'Black']
  },
  {
    id: 'm3',
    name: 'Italian Leather Belt',
    description: 'Handcrafted Italian leather belt with brushed metal buckle. Perfect for formal and business casual attire.',
    price: 89.99,
    images: [
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', color: 'Black', alt: 'Black Italian Leather Belt' },
      { url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=500', color: 'Brown', alt: 'Brown Italian Leather Belt' },
      { url: 'https://images.unsplash.com/photo-1491336477066-31156b5e4f35?w=500', color: 'Tan', alt: 'Tan Italian Leather Belt' }
    ],
    gender: 'men',
    category: 'pants-belts',
    stock: 25,
    colors: ['Black', 'Brown', 'Tan'],
    sizes: ['32', '34', '36', '38', '40', '42']
  },
  {
    id: 'm4',
    name: 'Bifold Wallet',
    description: 'Slim profile bifold wallet made from genuine leather. Features multiple card slots and a secure money clip.',
    price: 79.99,
    images: [
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', color: 'Black', alt: 'Black Bifold Wallet' },
      { url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=500', color: 'Brown', alt: 'Brown Bifold Wallet' },
      { url: 'https://images.unsplash.com/photo-1491336477066-31156b5e4f35?w=500', color: 'Oxblood', alt: 'Oxblood Bifold Wallet' }
    ],
    gender: 'men',
    category: 'leather-wallets',
    stock: 20,
    colors: ['Black', 'Brown', 'Oxblood']
  },
  {
    id: 'm5',
    name: 'Canvas Backpack',
    description: 'Durable canvas backpack with leather trim. Features laptop compartment and multiple organizational pockets.',
    price: 159.99,
    images: [
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', color: 'Black', alt: 'Black Canvas Backpack' },
      { url: 'https://images.unsplash.com/photo-1491336477066-31156b5e4f35?w=500', color: 'Navy', alt: 'Navy Canvas Backpack' },
      { url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=500', color: 'Olive', alt: 'Olive Canvas Backpack' }
    ],
    gender: 'men',
    category: 'backpacks',
    new: true,
    stock: 12,
    colors: ['Black', 'Navy', 'Olive']
  },
  {
    id: 'm6',
    name: 'Executive Laptop Bag',
    description: 'Professional laptop bag with padded compartment for laptops up to 15". Includes document pockets and organizer.',
    price: 189.99,
    images: [
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', color: 'Black', alt: 'Black Executive Laptop Bag' },
      { url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=500', color: 'Brown', alt: 'Brown Executive Laptop Bag' },
      { url: '/placeholder.svg', alt: 'Executive Laptop Bag' }
    ],
    gender: 'men',
    category: 'computer-bags',
    featured: true,
    stock: 10,
    colors: ['Black', 'Brown']
  },
  
  // Women's Products
  {
    id: 'w1',
    name: 'Designer Tote Bag',
    description: 'Elegant tote bag with custom hardware and premium materials. Spacious interior with secure zipper closure.',
    price: 249.99,
    images: [
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', color: 'Black', alt: 'Black Designer Tote Bag' },
      { url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=500', color: 'Cream', alt: 'Cream Designer Tote Bag' },
      { url: 'https://images.unsplash.com/photo-1491336477066-31156b5e4f35?w=500', color: 'Burgundy', alt: 'Burgundy Designer Tote Bag' }
    ],
    gender: 'women',
    category: 'bags-purses',
    featured: true,
    stock: 8,
    colors: ['Black', 'Cream', 'Burgundy']
  },
  {
    id: 'w2',
    name: 'Premium Lipstick Set',
    description: 'Long-lasting, hydrating lipsticks in four complementary shades. Cruelty-free and made with natural ingredients.',
    price: 79.99,
    images: [
      { url: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500', color: 'Ruby', alt: 'Ruby Lipstick Set' },
      { url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500', color: 'Blush', alt: 'Blush Lipstick Set' },
      { url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500', color: 'Coral', alt: 'Coral Lipstick Set' }
    ],
    gender: 'women',
    category: 'cosmetics',
    bestSeller: true,
    stock: 20,
    colors: ['Ruby', 'Blush', 'Coral', 'Mauve']
  },
  {
    id: 'w3',
    name: 'Hydrating Facial Serum',
    description: 'Advanced hydration serum with hyaluronic acid and vitamin C. Brightens and nourishes all skin types.',
    price: 89.99,
    images: [
      { url: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=500', alt: 'Hydrating Facial Serum' },
      { url: 'https://images.unsplash.com/photo-1556228578-dd6e842ccbeb?w=500', alt: 'Facial Serum Bottle' },
      { url: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500', alt: 'Serum Application' }
    ],
    gender: 'women',
    category: 'beauty-skincare',
    new: true,
    stock: 15
  },
  {
    id: 'w4',
    name: 'Gold Chain Necklace',
    description: 'Elegant 18K gold-plated chain necklace with adjustable length. Perfect for everyday wear or special occasions.',
    price: 129.99,
    images: [
      { url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500', alt: 'Gold Chain Necklace' },
      { url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500', alt: 'Necklace Detail' },
      { url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500', alt: 'Wearing Gold Necklace' }
    ],
    gender: 'women',
    category: 'jewelry',
    featured: true,
    stock: 7
  },
  {
    id: 'w5',
    name: 'Clutch Purse',
    description: 'Sophisticated evening clutch with detachable chain strap. Features interior card slots and zipper pocket.',
    price: 119.99,
    images: [
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', color: 'Black', alt: 'Black Clutch Purse' },
      { url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=500', color: 'Gold', alt: 'Gold Clutch Purse' },
      { url: 'https://images.unsplash.com/photo-1491336477066-31156b5e4f35?w=500', color: 'Silver', alt: 'Silver Clutch Purse' }
    ],
    gender: 'women',
    category: 'bags-purses',
    stock: 12,
    colors: ['Black', 'Gold', 'Silver']
  },
  {
    id: 'w6',
    name: 'Pearl Earrings',
    description: 'Classic freshwater pearl earrings with sterling silver posts. Timeless elegance for any occasion.',
    price: 99.99,
    images: [
      { url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500', alt: 'Pearl Earrings' },
      { url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500', alt: 'Earrings Detail' },
      { url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500', alt: 'Wearing Pearl Earrings' }
    ],
    gender: 'women',
    category: 'jewelry',
    bestSeller: true,
    stock: 18
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

export const getNewArrivals = (): Product[] => {
  return products.filter((product) => product.new);
};

export const getBestSellers = (): Product[] => {
  return products.filter((product) => product.bestSeller);
};

export const getProductsByGender = (gender: Gender): Product[] => {
  return products.filter((product) => product.gender === gender);
};

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getProductsByGenderAndCategory = (gender: Gender, category: ProductCategory): Product[] => {
  return products.filter((product) => product.gender === gender && product.category === category);
};

export const getCategoriesByGender = (gender: Gender): ProductCategory[] => {
  const uniqueCategories = new Set<ProductCategory>();
  products
    .filter((product) => product.gender === gender)
    .forEach((product) => uniqueCategories.add(product.category));
  return Array.from(uniqueCategories);
};

export const getAllCategories = (): ProductCategory[] => {
  const uniqueCategories = new Set<ProductCategory>();
  products.forEach(product => uniqueCategories.add(product.category));
  return Array.from(uniqueCategories);
};

export const getAllProducts = (): Product[] => {
  return [...products];
};

export const getCategoryDisplayName = (category: ProductCategory): string => {
  const displayNames: Record<ProductCategory, string> = {
    // Men's categories
    'portfolios': 'Portfolios',
    'watches': 'Watches',
    'pants-belts': 'Pants & Belts',
    'leather-wallets': 'Leather Wallets',
    'backpacks': 'Backpacks',
    'computer-bags': 'Computer Bags',
    // Women's categories
    'bags-purses': 'Bags & Purses',
    'cosmetics': 'Cosmetics',
    'beauty-skincare': 'Beauty & Skincare',
    'jewelry': 'Jewelry'
  };
  return displayNames[category] || category;
};
