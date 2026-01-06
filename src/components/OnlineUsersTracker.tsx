import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const OnlineUsersTracker = () => {
  const { user } = useAuth();
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  useEffect(() => {
    if (!user) return;

    const updateOnlineStatus = async (isOnline: boolean) => {
      try {
        const { error } = await supabase
          .from("online_users")
          .upsert({
            user_id: user.id,
            is_online: isOnline,
            last_seen: new Date().toISOString(),
          }, { onConflict: "user_id" });
        
        if (error) console.error("Error updating online status:", error);
      } catch (err) {
        console.error("Failed to update online status:", err);
      }
    };

    // Set user as online
    updateOnlineStatus(true);

    // Subscribe to presence channel
    channelRef.current = supabase.channel(`online_users_${user.id}`)
      .on('presence', { event: 'sync' }, () => {})
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channelRef.current?.track({
            user_id: user.id,
            online_at: new Date().toISOString(),
          });
        }
      });

    // Update last seen every 30 seconds
    const interval = setInterval(() => {
      updateOnlineStatus(true);
    }, 30000);

    // Handle page visibility change
    const handleVisibilityChange = () => {
      updateOnlineStatus(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Handle beforeunload
    const handleBeforeUnload = () => {
      updateOnlineStatus(false);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      updateOnlineStatus(false);
      channelRef.current?.unsubscribe();
    };
  }, [user]);

  return null;
};

export default OnlineUsersTracker;
