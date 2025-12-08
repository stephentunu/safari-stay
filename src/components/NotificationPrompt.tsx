import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocationNotifications } from "@/hooks/useLocationNotifications";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

const NotificationPrompt = () => {
  const { permission, requestPermission, isSupported } = useLocationNotifications();
  const { t } = useLanguage();
  const [dismissed, setDismissed] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const wasDismissed = localStorage.getItem("notificationPromptDismissed");
    if (!wasDismissed && permission === "default" && isSupported) {
      // Show after 5 seconds on the page
      const timer = setTimeout(() => setShow(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [permission, isSupported]);

  const handleDismiss = () => {
    setDismissed(true);
    setShow(false);
    localStorage.setItem("notificationPromptDismissed", "true");
  };

  const handleEnable = async () => {
    await requestPermission();
    setShow(false);
  };

  if (!show || dismissed || permission !== "default" || !isSupported) {
    return null;
  }

  return (
    <div className="fixed bottom-24 left-6 z-40 max-w-sm bg-card border border-border rounded-xl shadow-lg p-4 animate-in slide-in-from-bottom-5">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
      
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 rounded-full p-2">
          <Bell className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground mb-1">
            {t("notification.nearbyProperties")}
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            Get notified about available properties when you're nearby.
          </p>
          <Button onClick={handleEnable} size="sm">
            {t("notification.enable")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPrompt;
