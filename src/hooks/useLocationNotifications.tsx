import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface Property {
  id: string;
  title: string;
  location: string;
  price_per_night: number;
}

export const useLocationNotifications = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      toast({
        title: "Not Supported",
        description: "Push notifications are not supported in your browser.",
        variant: "destructive",
      });
      return false;
    }

    const result = await Notification.requestPermission();
    setPermission(result);
    
    if (result === "granted") {
      toast({
        title: "Notifications Enabled",
        description: "You'll receive alerts about nearby properties.",
      });
      startLocationTracking();
      return true;
    }
    return false;
  };

  const startLocationTracking = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        checkNearbyProperties(latitude, longitude);
      },
      (error) => {
        console.error("Geolocation error:", error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const checkNearbyProperties = async (lat: number, lng: number) => {
    try {
      // Get properties with coordinates (simplified - in production use PostGIS)
      const { data: properties } = await supabase
        .from("properties")
        .select("id, title, location, price_per_night, latitude, longitude")
        .eq("is_active", true)
        .eq("is_approved", true)
        .not("latitude", "is", null)
        .not("longitude", "is", null)
        .limit(5);

      if (!properties?.length) return;

      // Filter properties within ~10km radius
      const nearbyProperties = properties.filter((p) => {
        if (!p.latitude || !p.longitude) return false;
        const distance = calculateDistance(lat, lng, p.latitude, p.longitude);
        return distance <= 10; // 10km radius
      });

      if (nearbyProperties.length > 0 && Notification.permission === "granted") {
        const lastNotification = localStorage.getItem("lastPropertyNotification");
        const now = Date.now();
        
        // Only show notification every 30 minutes
        if (!lastNotification || now - parseInt(lastNotification) > 30 * 60 * 1000) {
          showNotification(nearbyProperties[0]);
          localStorage.setItem("lastPropertyNotification", now.toString());
        }
      }
    } catch (error) {
      console.error("Error checking nearby properties:", error);
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const showNotification = (property: Property) => {
    if (Notification.permission !== "granted") return;

    const notification = new Notification(t("notification.nearbyProperties"), {
      body: `${property.title} - KES ${property.price_per_night.toLocaleString()}/night in ${property.location}`,
      icon: "/favicon.ico",
      tag: "nearby-property",
    });

    notification.onclick = () => {
      window.focus();
      window.location.href = `/property/${property.id}`;
    };
  };

  return {
    permission,
    requestPermission,
    userLocation,
    isSupported: "Notification" in window,
  };
};
