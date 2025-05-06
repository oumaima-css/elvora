
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

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
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
    images: ['/placeholder.svg'],
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
    images: ['/placeholder.svg'],
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
    images: ['/placeholder.svg'],
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
    images: ['/placeholder.svg'],
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
    images: ['/placeholder.svg'],
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
    images: ['/placeholder.svg'],
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
    images: ['/placeholder.svg'],
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
    images: ['/placeholder.svg'],
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
    images: ['/placeholder.svg'],
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
    images: ['/placeholder.svg'],
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
    images: ['/placeholder.svg'],
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
    images: ['/placeholder.svg'],
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
