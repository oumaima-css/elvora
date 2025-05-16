
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
  }).format(price)
}

export function calculateDiscountedPrice(originalPrice: number, discountPercentage: number): number {
  return originalPrice - (originalPrice * (discountPercentage / 100));
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function getRandomSubset<T>(array: T[], size: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, size)
}

// Shipping constants
export const FREE_SHIPPING_THRESHOLD = 999;
export const SHIPPING_FEE = 50;

export function isEligibleForFreeShipping(subtotal: number): boolean {
  return subtotal >= FREE_SHIPPING_THRESHOLD;
}

// Languages supported by the application
export type SupportedLanguage = 'en' | 'fr' | 'ar';

// Current language storage key
export const LANGUAGE_STORAGE_KEY = 'evermore-language';

// Get current language from localStorage or default to English
export function getCurrentLanguage(): SupportedLanguage {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return (stored as SupportedLanguage) || 'en';
}

// Set current language in localStorage
export function setCurrentLanguage(language: SupportedLanguage) {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  document.documentElement.lang = language;
  
  // For RTL support (Arabic)
  if (language === 'ar') {
    document.documentElement.dir = 'rtl';
  } else {
    document.documentElement.dir = 'ltr';
  }
}

// Default translations for discount section
export const discountTranslations = {
  en: {
    special_sale: "Special Sale",
    discount_desc: "Get {{percent}} OFF on selected items",
  },
  fr: {
    special_sale: "Vente Spéciale",
    discount_desc: "Obtenez {{percent}} de réduction sur certains articles",
  },
  ar: {
    special_sale: "عرض خاص",
    discount_desc: "احصل على خصم {{percent}} على منتجات مختارة",
  }
};

// Discount code translations
export const discountCodeTranslations = {
  en: {
    discount_code: "Discount Code",
    apply: "Apply",
    discount_applied: "Discount Applied",
    invalid_code: "Invalid discount code",
    discount_removed: "Discount removed",
  },
  fr: {
    discount_code: "Code de Réduction",
    apply: "Appliquer",
    discount_applied: "Réduction Appliquée",
    invalid_code: "Code de réduction invalide",
    discount_removed: "Réduction supprimée",
  },
  ar: {
    discount_code: "رمز الخصم",
    apply: "تطبيق",
    discount_applied: "تم تطبيق الخصم",
    invalid_code: "رمز الخصم غير صالح",
    discount_removed: "تم إزالة الخصم",
  }
};

// Shipping translations
export const shippingTranslations = {
  en: {
    free_shipping: "Free",
    shipping_fee: "Shipping Fee",
    free_shipping_message: "Free shipping on orders over 999 MAD"
  },
  fr: {
    free_shipping: "Gratuit",
    shipping_fee: "Frais de livraison",
    free_shipping_message: "Livraison gratuite pour les commandes de plus de 999 MAD"
  },
  ar: {
    free_shipping: "مجاناً",
    shipping_fee: "رسوم الشحن",
    free_shipping_message: "شحن مجاني للطلبات التي تزيد عن 999 درهم"
  }
};

// Valid discount codes
export const VALID_DISCOUNT_CODES = {
  "80off": 80
};

// Export Truck icon component for reuse
export { Truck } from "lucide-react";
