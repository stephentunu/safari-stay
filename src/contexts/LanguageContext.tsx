import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "sw" | "fr" | "ar" | "am";

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

export const translations: Translations = {
  // Navigation
  "nav.home": { en: "Home", sw: "Nyumbani", fr: "Accueil", ar: "الرئيسية", am: "ቤት" },
  "nav.experiences": { en: "Experiences", sw: "Matukio", fr: "Expériences", ar: "التجارب", am: "ተሞክሮዎች" },
  "nav.favorites": { en: "Favorites", sw: "Vipendwa", fr: "Favoris", ar: "المفضلة", am: "ተወዳጆች" },
  "nav.faq": { en: "FAQ", sw: "Maswali", fr: "FAQ", ar: "الأسئلة الشائعة", am: "ጥያቄዎች" },
  "nav.signin": { en: "Sign In", sw: "Ingia", fr: "Connexion", ar: "تسجيل الدخول", am: "ግባ" },
  "nav.signout": { en: "Sign Out", sw: "Ondoka", fr: "Déconnexion", ar: "تسجيل الخروج", am: "ውጣ" },
  "nav.listProperty": { en: "List Your Property", sw: "Orodhesha Mali Yako", fr: "Lister Votre Propriété", ar: "أدرج عقارك", am: "ንብረትዎን ዝርዝር ያድርጉ" },
  
  // Property Form
  "property.title": { en: "Property Title", sw: "Kichwa cha Mali", fr: "Titre de la Propriété", ar: "عنوان العقار", am: "የንብረት ርዕስ" },
  "property.description": { en: "Description", sw: "Maelezo", fr: "Description", ar: "الوصف", am: "መግለጫ" },
  "property.category": { en: "Property Category", sw: "Aina ya Mali", fr: "Catégorie de Propriété", ar: "فئة العقار", am: "የንብረት ምድብ" },
  "property.history": { en: "Brief History", sw: "Historia Fupi", fr: "Brève Histoire", ar: "تاريخ موجز", am: "አጭር ታሪክ" },
  "property.nearbyAttractions": { en: "Nearby Roads/Attractions", sw: "Barabara/Vivutio Karibu", fr: "Routes/Attractions à Proximité", ar: "الطرق/المعالم القريبة", am: "አቅራቢያ ያሉ መንገዶች/መስህቦች" },
  "property.county": { en: "County", sw: "Kaunti", fr: "Comté", ar: "المقاطعة", am: "ካውንቲ" },
  "property.subcounty": { en: "Sub-County", sw: "Kaunti Ndogo", fr: "Sous-Comté", ar: "المقاطعة الفرعية", am: "ንዑስ ካውንቲ" },
  "property.address": { en: "Full Address", sw: "Anwani Kamili", fr: "Adresse Complète", ar: "العنوان الكامل", am: "ሙሉ አድራሻ" },
  "property.type": { en: "Property Type", sw: "Aina ya Mali", fr: "Type de Propriété", ar: "نوع العقار", am: "የንብረት አይነት" },
  "property.price": { en: "Price/Night (KES)", sw: "Bei/Usiku (KES)", fr: "Prix/Nuit (KES)", ar: "السعر/الليلة (KES)", am: "ዋጋ/ሌሊት (KES)" },
  "property.guests": { en: "Max Guests", sw: "Wageni Wengi", fr: "Invités Max", ar: "الحد الأقصى للضيوف", am: "ከፍተኛ እንግዶች" },
  "property.bedrooms": { en: "Bedrooms", sw: "Vyumba vya Kulala", fr: "Chambres", ar: "غرف النوم", am: "መኝታ ክፍሎች" },
  "property.bathrooms": { en: "Bathrooms", sw: "Vyumba vya Kuoga", fr: "Salles de Bain", ar: "الحمامات", am: "መታጠቢያ ቤቶች" },
  "property.amenities": { en: "Amenities", sw: "Huduma", fr: "Équipements", ar: "المرافق", am: "መገልገያዎች" },
  "property.services": { en: "Services", sw: "Huduma", fr: "Services", ar: "الخدمات", am: "አገልግሎቶች" },
  "property.foodTypes": { en: "Food Types", sw: "Aina za Chakula", fr: "Types de Cuisine", ar: "أنواع الطعام", am: "የምግብ ዓይነቶች" },
  "property.images": { en: "Property Images", sw: "Picha za Mali", fr: "Images de la Propriété", ar: "صور العقار", am: "የንብረት ምስሎች" },
  "property.submit": { en: "Submit Listing", sw: "Wasilisha Orodha", fr: "Soumettre l'Annonce", ar: "إرسال القائمة", am: "ዝርዝር አስገባ" },
  "property.cancel": { en: "Cancel", sw: "Ghairi", fr: "Annuler", ar: "إلغاء", am: "ሰርዝ" },
  
  // Categories
  "category.luxury": { en: "Luxury & High-End", sw: "Anasa & Kiwango cha Juu", fr: "Luxe & Haut de Gamme", ar: "فاخر وراقي", am: "የቅንጦት እና ከፍተኛ ደረጃ" },
  "category.budget": { en: "Budget-Friendly", sw: "Rafiki wa Bajeti", fr: "Économique", ar: "اقتصادي", am: "በጀት ተስማሚ" },
  "category.business": { en: "Business Travel", sw: "Safari za Biashara", fr: "Voyage d'Affaires", ar: "سفر العمل", am: "የንግድ ጉዞ" },
  "category.vacation": { en: "Vacation Rental", sw: "Kukodisha Likizo", fr: "Location de Vacances", ar: "إيجار العطلات", am: "የእረፍት ኪራይ" },
  "category.eco": { en: "Eco-Lodge", sw: "Eco-Lodge", fr: "Éco-Lodge", ar: "نزل بيئي", am: "ኢኮ-ሎጅ" },
  "category.heritage": { en: "Heritage/Cultural", sw: "Urithi/Kitamaduni", fr: "Patrimoine/Culturel", ar: "تراثي/ثقافي", am: "ቅርስ/ባህላዊ" },
  
  // Footer
  "footer.terms": { en: "Terms & Conditions", sw: "Sheria na Masharti", fr: "Termes et Conditions", ar: "الشروط والأحكام", am: "ውሎች እና ሁኔታዎች" },
  "footer.privacy": { en: "Privacy Policy", sw: "Sera ya Faragha", fr: "Politique de Confidentialité", ar: "سياسة الخصوصية", am: "የግላዊነት ፖሊሲ" },
  "footer.contact": { en: "Contact Us", sw: "Wasiliana Nasi", fr: "Contactez-nous", ar: "اتصل بنا", am: "ያግኙን" },
  "footer.about": { en: "About McDone", sw: "Kuhusu McDone", fr: "À propos de McDone", ar: "عن ماكدون", am: "ስለ ማክዶን" },
  
  // Chatbot
  "chatbot.title": { en: "McDone Assistant", sw: "Msaidizi wa McDone", fr: "Assistant McDone", ar: "مساعد ماكدون", am: "የማክዶን ረዳት" },
  "chatbot.placeholder": { en: "Ask me anything...", sw: "Niulize chochote...", fr: "Demandez-moi n'importe quoi...", ar: "اسألني أي شيء...", am: "ማንኛውንም ነገር ጠይቀኝ..." },
  "chatbot.welcome": { en: "Hello! How can I help you today?", sw: "Habari! Ninawezaje kukusaidia leo?", fr: "Bonjour! Comment puis-je vous aider?", ar: "مرحباً! كيف يمكنني مساعدتك اليوم؟", am: "ሰላም! ዛሬ እንዴት ልረዳዎት?" },
  
  // Notifications
  "notification.nearbyProperties": { en: "Properties near you!", sw: "Mali karibu nawe!", fr: "Propriétés près de vous!", ar: "عقارات بالقرب منك!", am: "በአቅራቢያዎ ያሉ ንብረቶች!" },
  "notification.enable": { en: "Enable Notifications", sw: "Washa Arifa", fr: "Activer les Notifications", ar: "تفعيل الإشعارات", am: "ማሳወቂያዎችን አንቃ" },
  
  // Common
  "common.loading": { en: "Loading...", sw: "Inapakia...", fr: "Chargement...", ar: "جاري التحميل...", am: "በመጫን ላይ..." },
  "common.error": { en: "Error", sw: "Hitilafu", fr: "Erreur", ar: "خطأ", am: "ስህተት" },
  "common.success": { en: "Success", sw: "Mafanikio", fr: "Succès", ar: "نجاح", am: "ተሳካ" },
  "common.book": { en: "Book Now", sw: "Hifadhi Sasa", fr: "Réserver", ar: "احجز الآن", am: "አሁን ያስይዙ" },
  "common.perNight": { en: "/night", sw: "/usiku", fr: "/nuit", ar: "/ليلة", am: "/ሌሊት" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languageNames: { code: Language; name: string; nativeName: string }[];
}

const languageNames = [
  { code: "en" as Language, name: "English", nativeName: "English" },
  { code: "sw" as Language, name: "Swahili", nativeName: "Kiswahili" },
  { code: "fr" as Language, name: "French", nativeName: "Français" },
  { code: "ar" as Language, name: "Arabic", nativeName: "العربية" },
  { code: "am" as Language, name: "Amharic", nativeName: "አማርኛ" },
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem("mcdone-language");
    return (stored as Language) || "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("mcdone-language", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || translations[key]?.["en"] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languageNames }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
