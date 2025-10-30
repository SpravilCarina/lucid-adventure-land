import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Gamepad2, Star, Users } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home", icon: null },
    { path: "/story", label: "Story", icon: BookOpen },
    { path: "/mindfulness", label: "Calm Time", icon: Heart },
    { path: "/games", label: "Games", icon: Gamepad2 },
    { path: "/rewards", label: "Rewards", icon: Star },
    { path: "/parent", label: "Parents", icon: Users },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-card">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-magic flex items-center justify-center text-2xl animate-bounce-gentle">
              ✨
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline">Lucid Adventures</span>
          </Link>
          
          <div className="flex items-center gap-2">
            {navItems.slice(1).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
