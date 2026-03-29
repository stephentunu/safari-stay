import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WhatsAppButtonProps {
  phone?: string;
  message?: string;
  propertyTitle?: string;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

const WhatsAppButton = ({ 
  phone = "254700000000", 
  message,
  propertyTitle,
  className = "",
  variant = "default",
  size = "default"
}: WhatsAppButtonProps) => {
  const defaultMessage = propertyTitle
    ? `Hello! I'm interested in the property "${propertyTitle}" listed on McDone Bookings. Can you provide more details?`
    : "Hello! I found your listing on McDone Bookings and I'd like to know more.";

  const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message || defaultMessage)}`;

  return (
    <Button
      variant={variant}
      size={size}
      className={`bg-[#25D366] hover:bg-[#1ebe57] text-white ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      }}
    >
      <MessageCircle className="h-4 w-4 mr-2" />
      WhatsApp
    </Button>
  );
};

export default WhatsAppButton;
