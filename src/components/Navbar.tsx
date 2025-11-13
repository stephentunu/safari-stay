import { Button } from "@/components/ui/button";
import { Menu, Search, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const { user, signOut } = useAuth();
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
              Stays
            </NavLink>
            <NavLink 
              to="/experiences" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              activeClassName="text-primary"
            >
              Experiences
            </NavLink>
            <NavLink 
              to="/auth" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Become a Host
            </NavLink>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
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
                Sign Out
              </>
            ) : (
              "Sign In"
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
                  Stays
                </NavLink>
                <NavLink 
                  to="/experiences" 
                  className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  activeClassName="text-primary"
                >
                  Experiences
                </NavLink>
                <NavLink 
                  to="/auth" 
                  className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                >
                  Become a Host
                </NavLink>
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
                      Sign Out
                    </>
                  ) : (
                    "Sign In"
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
