
import React, { createContext, useContext, useEffect, useState } from 'react';
import { SupportedLanguage, getCurrentLanguage, setCurrentLanguage } from '@/lib/utils';

// Simple translation map (in a real app, this would be more comprehensive)
const translations: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // Navigation
    'home': 'Home',
    'men': 'Men',
    'women': 'Women',
    'new_arrivals': 'New Arrivals',
    'bestsellers': 'Bestsellers',
    'search': 'Search',
    'account': 'Account',
    'cart': 'Cart',
    
    // Product filters
    'search_products': 'Search Products',
    'filter_by_gender': 'Filter by Gender',
    'price_range': 'Price Range',
    'all': 'All',
    'no_products_found': 'No products found',
    'try_adjusting_filters': 'Try adjusting your filters or check back later for new arrivals.',
    'no_products_match': 'No products match your filters',
    'adjust_criteria': 'Try adjusting your search criteria.',
    
    // Auth
    'login': 'Login',
    'register': 'Register',
    'email': 'Email',
    'password': 'Password',
    'confirm_password': 'Confirm Password',
    'create_account': 'Create Account',
    'login_to_account': 'Login to Account',
    'logout': 'Logout',
    
    // Product
    'add_to_cart': 'Add to Cart',
    'in_cart': 'In Cart',
    'out_of_stock': 'Out of Stock',
    
    // Collections
    'mens_collection': "Men's Collection",
    'womens_collection': "Women's Collection",
    'mens_description': "Discover our premium selection of accessories crafted for the modern gentleman.",
    'womens_description': "Explore our luxurious collection designed for the contemporary woman."
  },
  fr: {
    // Navigation
    'home': 'Accueil',
    'men': 'Hommes',
    'women': 'Femmes',
    'new_arrivals': 'Nouveautés',
    'bestsellers': 'Meilleures Ventes',
    'search': 'Rechercher',
    'account': 'Compte',
    'cart': 'Panier',
    
    // Product filters
    'search_products': 'Rechercher des produits',
    'filter_by_gender': 'Filtrer par genre',
    'price_range': 'Fourchette de prix',
    'all': 'Tous',
    'no_products_found': 'Aucun produit trouvé',
    'try_adjusting_filters': 'Essayez d\'ajuster vos filtres ou revenez plus tard pour les nouveautés.',
    'no_products_match': 'Aucun produit ne correspond à vos filtres',
    'adjust_criteria': 'Essayez d\'ajuster vos critères de recherche.',
    
    // Auth
    'login': 'Connexion',
    'register': 'S\'inscrire',
    'email': 'Email',
    'password': 'Mot de passe',
    'confirm_password': 'Confirmer le mot de passe',
    'create_account': 'Créer un compte',
    'login_to_account': 'Connectez-vous à votre compte',
    'logout': 'Déconnexion',
    
    // Product
    'add_to_cart': 'Ajouter au panier',
    'in_cart': 'Dans le panier',
    'out_of_stock': 'En rupture de stock',
    
    // Collections
    'mens_collection': "Collection Hommes",
    'womens_collection': "Collection Femmes",
    'mens_description': "Découvrez notre sélection d'accessoires haut de gamme conçus pour l'homme moderne.",
    'womens_description': "Explorez notre collection luxueuse conçue pour la femme contemporaine."
  },
  ar: {
    // Navigation
    'home': 'الرئيسية',
    'men': 'رجال',
    'women': 'نساء',
    'new_arrivals': 'وصل حديثاً',
    'bestsellers': 'الأكثر مبيعاً',
    'search': 'بحث',
    'account': 'الحساب',
    'cart': 'السلة',
    
    // Product filters
    'search_products': 'البحث عن منتجات',
    'filter_by_gender': 'تصفية حسب الجنس',
    'price_range': 'نطاق السعر',
    'all': 'الكل',
    'no_products_found': 'لم يتم العثور على منتجات',
    'try_adjusting_filters': 'حاول ضبط المرشحات أو العودة لاحقًا للوصول إلى منتجات جديدة.',
    'no_products_match': 'لا توجد منتجات تطابق المرشحات الخاصة بك',
    'adjust_criteria': 'حاول تعديل معايير البحث الخاصة بك.',
    
    // Auth
    'login': 'تسجيل الدخول',
    'register': 'التسجيل',
    'email': 'البريد الإلكتروني',
    'password': 'كلمة المرور',
    'confirm_password': 'تأكيد كلمة المرور',
    'create_account': 'إنشاء حساب',
    'login_to_account': 'تسجيل الدخول إلى الحساب',
    'logout': 'تسجيل الخروج',
    
    // Product
    'add_to_cart': 'أضف إلى السلة',
    'in_cart': 'في السلة',
    'out_of_stock': 'غير متوفر',
    
    // Collections
    'mens_collection': "مجموعة الرجال",
    'womens_collection': "مجموعة النساء",
    'mens_description': "اكتشف مجموعتنا المميزة من الاكسسوارات المصممة للرجل العصري.",
    'womens_description': "استكشف مجموعتنا الفاخرة المصممة للمرأة المعاصرة."
  }
};

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguage>(getCurrentLanguage());

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Update language in localStorage whenever it changes
  useEffect(() => {
    setCurrentLanguage(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
