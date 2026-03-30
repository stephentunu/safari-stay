import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useTrackPropertyView = (propertyId: string | undefined) => {
  useEffect(() => {
    if (!propertyId) return;

    const trackView = async () => {
      const sessionId = sessionStorage.getItem("view_session") || crypto.randomUUID();
      sessionStorage.setItem("view_session", sessionId);

      // Prevent duplicate views in same session
      const viewedKey = `viewed_${propertyId}`;
      if (sessionStorage.getItem(viewedKey)) return;

      const { data: { user } } = await supabase.auth.getUser();

      await supabase.from("property_views").insert({
        property_id: propertyId,
        viewer_id: user?.id || null,
        session_id: sessionId,
      });

      sessionStorage.setItem(viewedKey, "1");
    };

    trackView();
  }, [propertyId]);
};
