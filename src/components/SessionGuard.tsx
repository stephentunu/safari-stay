import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "mcdone_active_session";

const SessionGuard = () => {
  useEffect(() => {
    const checkSession = async () => {
      const hasActiveSession = sessionStorage.getItem(SESSION_KEY);
      
      if (!hasActiveSession) {
        // Browser/tab was closed and reopened — sign out any persisted session
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await supabase.auth.signOut();
        }
      }
    };

    checkSession();

    // Mark session as active whenever user signs in
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        sessionStorage.setItem(SESSION_KEY, "true");
      } else if (event === "SIGNED_OUT") {
        sessionStorage.removeItem(SESSION_KEY);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return null;
};

export default SessionGuard;
