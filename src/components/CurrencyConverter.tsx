import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw } from "lucide-react";

interface CurrencyConverterProps {
  priceKES: number;
  className?: string;
}

const EXCHANGE_RATES: { [key: string]: { rate: number; symbol: string; name: string } } = {
  KES: { rate: 1, symbol: "KES", name: "Kenyan Shilling" },
  USD: { rate: 0.0077, symbol: "$", name: "US Dollar" },
  EUR: { rate: 0.0071, symbol: "€", name: "Euro" },
  GBP: { rate: 0.0061, symbol: "£", name: "British Pound" },
  TZS: { rate: 19.35, symbol: "TZS", name: "Tanzanian Shilling" },
  UGX: { rate: 28.5, symbol: "UGX", name: "Ugandan Shilling" },
  ZAR: { rate: 0.14, symbol: "R", name: "South African Rand" },
  NGN: { rate: 11.92, symbol: "₦", name: "Nigerian Naira" },
  INR: { rate: 0.65, symbol: "₹", name: "Indian Rupee" },
  CNY: { rate: 0.056, symbol: "¥", name: "Chinese Yuan" },
  AED: { rate: 0.028, symbol: "د.إ", name: "UAE Dirham" },
};

const CurrencyConverter = ({ priceKES, className = "" }: CurrencyConverterProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState("KES");
  const [convertedPrice, setConvertedPrice] = useState(priceKES);

  useEffect(() => {
    const rate = EXCHANGE_RATES[selectedCurrency]?.rate || 1;
    setConvertedPrice(priceKES * rate);
  }, [selectedCurrency, priceKES]);

  const formatPrice = (price: number, currency: string) => {
    const { symbol } = EXCHANGE_RATES[currency] || { symbol: currency };
    if (currency === "KES" || currency === "TZS" || currency === "UGX" || currency === "NGN") {
      return `${symbol} ${Math.round(price).toLocaleString()}`;
    }
    return `${symbol}${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <RefreshCw className="h-3 w-3" />
        <span>Convert:</span>
      </div>
      <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
        <SelectTrigger className="w-[100px] h-8 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-popover z-50">
          {Object.entries(EXCHANGE_RATES).map(([code, { name }]) => (
            <SelectItem key={code} value={code} className="text-xs">
              {code} - {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedCurrency !== "KES" && (
        <span className="text-sm font-medium text-primary">
          ≈ {formatPrice(convertedPrice, selectedCurrency)}
        </span>
      )}
    </div>
  );
};

export default CurrencyConverter;
