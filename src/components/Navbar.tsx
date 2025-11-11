import { Button } from "@/components/ui/button";
import { Menu, Search, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

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
          <h1 className="text-2xl font-bold text-primary">McDone</h1>
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Stays
            </a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Experiences
            </a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Become a Host
            </a>
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
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
