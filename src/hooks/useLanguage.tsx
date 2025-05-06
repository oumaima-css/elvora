
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
    'min': 'Min',
    'max': 'Max',
    'to': 'to',
    'apply': 'Apply',
    
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
    'womens_description': "Explore our luxurious collection designed for the contemporary woman.",
    
    // Checkout
    'checkout': 'Checkout',
    'your_cart_is_empty': 'Your cart is empty',
    'add_some_items': 'Add some items to your cart before proceeding to checkout.',
    'continue_shopping': 'Continue Shopping',
    'customer_information': 'Customer Information',
    'full_name': 'Full Name',
    'email_address': 'Email Address',
    'phone_number': 'Phone Number',
    'shipping_information': 'Shipping Information',
    'country': 'Country',
    'city': 'City',
    'state_province': 'State/Province',
    'postal_code': 'Postal Code',
    'street_address': 'Street Address',
    'payment_method': 'Payment Method',
    'credit_card': 'Credit Card',
    'card_number': 'Card Number',
    'expiry_date': 'Expiry Date',
    'name_on_card': 'Name on Card',
    'place_order': 'Place Order',
    'processing': 'Processing...',
    'order_summary': 'Order Summary',
    'subtotal': 'Subtotal',
    'shipping': 'Shipping',
    'tax': 'Tax',
    'total': 'Total',
    'free': 'Free',
    'qty': 'Qty',
    'select_country': 'Select a country',
    'select_city': 'Select a city',
    'select_state': 'Select a state/province',
    'code': 'Code'
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
    'min': 'Min',
    'max': 'Max',
    'to': 'à',
    'apply': 'Appliquer',
    
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
    'womens_description': "Explorez notre collection luxueuse conçue pour la femme contemporaine.",
    
    // Checkout
    'checkout': 'Paiement',
    'your_cart_is_empty': 'Votre panier est vide',
    'add_some_items': 'Ajoutez des articles à votre panier avant de procéder au paiement.',
    'continue_shopping': 'Continuer vos achats',
    'customer_information': 'Informations client',
    'full_name': 'Nom complet',
    'email_address': 'Adresse e-mail',
    'phone_number': 'Numéro de téléphone',
    'shipping_information': 'Informations de livraison',
    'country': 'Pays',
    'city': 'Ville',
    'state_province': 'État/Province',
    'postal_code': 'Code postal',
    'street_address': 'Adresse',
    'payment_method': 'Méthode de paiement',
    'credit_card': 'Carte de crédit',
    'card_number': 'Numéro de carte',
    'expiry_date': 'Date d\'expiration',
    'name_on_card': 'Nom sur la carte',
    'place_order': 'Passer la commande',
    'processing': 'Traitement en cours...',
    'order_summary': 'Résumé de la commande',
    'subtotal': 'Sous-total',
    'shipping': 'Livraison',
    'tax': 'Taxe',
    'total': 'Total',
    'free': 'Gratuit',
    'qty': 'Qté',
    'select_country': 'Sélectionnez un pays',
    'select_city': 'Sélectionnez une ville',
    'select_state': 'Sélectionnez un état/province',
    'code': 'Code'
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
    'min': 'الحد الأدنى',
    'max': 'الحد الأقصى',
    'to': 'إلى',
    'apply': 'تطبيق',
    
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
    'womens_description': "استكشف مجموعتنا الفاخرة المصممة للمرأة المعاصرة.",
    
    // Checkout
    'checkout': 'الدفع',
    'your_cart_is_empty': 'سلة التسوق فارغة',
    'add_some_items': 'أضف بعض العناصر إلى سلة التسوق قبل المتابعة إلى الدفع.',
    'continue_shopping': 'مواصلة التسوق',
    'customer_information': 'معلومات العميل',
    'full_name': 'الاسم الكامل',
    'email_address': 'البريد الإلكتروني',
    'phone_number': 'رقم الهاتف',
    'shipping_information': 'معلومات الشحن',
    'country': 'الدولة',
    'city': 'المدينة',
    'state_province': 'الولاية/المقاطعة',
    'postal_code': 'الرمز البريدي',
    'street_address': 'العنوان',
    'payment_method': 'طريقة الدفع',
    'credit_card': 'بطاقة ائتمان',
    'card_number': 'رقم البطاقة',
    'expiry_date': 'تاريخ الانتهاء',
    'name_on_card': 'الاسم على البطاقة',
    'place_order': 'تأكيد الطلب',
    'processing': 'جاري المعالجة...',
    'order_summary': 'ملخص الطلب',
    'subtotal': 'المجموع الفرعي',
    'shipping': 'الشحن',
    'tax': 'الضريبة',
    'total': 'المجموع',
    'free': 'مجاني',
    'qty': 'الكمية',
    'select_country': 'اختر الدولة',
    'select_city': 'اختر المدينة',
    'select_state': 'اختر الولاية/المقاطعة',
    'code': 'الرمز'
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
