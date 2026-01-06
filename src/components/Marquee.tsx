import { useLanguage } from "@/contexts/LanguageContext";

const Marquee = () => {
  const { t } = useLanguage();

  const announcements = [
    "🏠 Find your dream stay in Kenya! Book verified properties with M-Pesa & Card payments",
    "✨ New: Explore Airbnbs, Resorts, Motels & More!",
    "🎉 Special Offers: Up to 30% off on selected coastal properties",
    "🌴 Discover Kenya's hidden gems - From Nairobi to Mombasa",
    "💳 Secure payments • Verified hosts • 24/7 Support",
    "🏖️ Beach houses, Safari lodges, City apartments - All in one place!",
    "🔥 Hot Deal: Book 3 nights, get 1 night FREE on premium villas",
  ];

  return (
    <div className="bg-gradient-to-r from-primary via-primary/90 to-primary overflow-hidden py-2">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...announcements, ...announcements].map((text, index) => (
          <span
            key={index}
            className="mx-8 text-primary-foreground font-medium text-sm"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
