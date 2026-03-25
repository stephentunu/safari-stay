import { Button } from "@/components/ui/button";
import { Menu, User, LogOut, Heart, Shield, Newspaper, CalendarDays, Compass, Gift } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      checkAdminRole();
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const checkAdminRole = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();
    
    setIsAdmin(!!data);
  };
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate("/auth");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <NavLink to="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
            McDone
          </NavLink>
          <div className="hidden md:flex items-center gap-6">
            <NavLink 
              to="/" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              activeClassName="text-primary"
            >
              {t("nav.home")}
            </NavLink>
            <NavLink 
              to="/experiences" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              activeClassName="text-primary"
            >
              {t("nav.experiences")}
            </NavLink>
            <NavLink 
              to="/favorites" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              activeClassName="text-primary"
            >
              <Heart className="h-4 w-4" />
              {t("nav.favorites")}
            </NavLink>
            <NavLink 
              to="/faq" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              activeClassName="text-primary"
            >
              {t("nav.faq")}
            </NavLink>
            <NavLink 
              to="/blog" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              activeClassName="text-primary"
            >
              <Newspaper className="h-3.5 w-3.5" />
              Blog
            </NavLink>
            <NavLink 
              to="/events" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              activeClassName="text-primary"
            >
              <CalendarDays className="h-3.5 w-3.5" />
              Events
            </NavLink>
            <NavLink 
              to="/destinations" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              activeClassName="text-primary"
            >
              <Compass className="h-3.5 w-3.5" />
              Destinations
            </NavLink>
            <NavLink 
              to="/add-property" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t("nav.listProperty")}
            </NavLink>
            <NavLink 
              to="/request-property" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Request Property
            </NavLink>
            {isAdmin && (
              <NavLink 
                to="/admin" 
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                activeClassName="text-primary"
              >
                <Shield className="h-4 w-4" />
                Admin
              </NavLink>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <LanguageSelector />
          {user && (
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
          )}
          <Button variant="accent" onClick={handleAuthAction} className="hidden md:flex">
            {user ? (
              <>
                <LogOut className="h-4 w-4 mr-2" />
                {t("nav.signout")}
              </>
            ) : (
              t("nav.signin")
            )}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col gap-4 mt-6">
                <NavLink 
                  to="/" 
                  className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                  activeClassName="text-primary"
                >
                  {t("nav.home")}
                </NavLink>
                <NavLink 
                  to="/experiences" 
                  className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  activeClassName="text-primary"
                >
                  {t("nav.experiences")}
                </NavLink>
                <NavLink 
                  to="/favorites" 
                  className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
                  activeClassName="text-primary"
                >
                  <Heart className="h-4 w-4" />
                  {t("nav.favorites")}
                </NavLink>
                <NavLink 
                  to="/faq" 
                  className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  activeClassName="text-primary"
                >
                  {t("nav.faq")}
                </NavLink>
                <NavLink 
                  to="/blog" 
                  className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
                  activeClassName="text-primary"
                >
                  <Newspaper className="h-4 w-4" />
                  Blog
                </NavLink>
                <NavLink 
                  to="/events" 
                  className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
                  activeClassName="text-primary"
                >
                  <CalendarDays className="h-4 w-4" />
                  Events
                </NavLink>
                <NavLink 
                  to="/destinations" 
                  className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
                  activeClassName="text-primary"
                >
                  <Compass className="h-4 w-4" />
                  Destinations
                </NavLink>
                <NavLink 
                  to="/add-property" 
                  className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                >
                  {t("nav.listProperty")}
                </NavLink>
                <NavLink 
                  to="/request-property" 
                  className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                >
                  Request Property
                </NavLink>
                {isAdmin && (
                  <NavLink 
                    to="/admin" 
                    className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
                    activeClassName="text-primary"
                  >
                    <Shield className="h-4 w-4" />
                    Admin
                  </NavLink>
                )}
                {user && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground py-2 border-t mt-2 pt-4">
                    <User className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                )}
                <Button variant="accent" onClick={handleAuthAction} className="mt-2">
                  {user ? (
                    <>
                      <LogOut className="h-4 w-4 mr-2" />
                      {t("nav.signout")}
                    </>
                  ) : (
                    t("nav.signin")
                  )}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
