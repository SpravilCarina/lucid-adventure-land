import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Heart, Gamepad2, Star, Sparkles } from "lucide-react";
import heroCharacter from "@/assets/hero-character.png";

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Stories",
      description: "Choose your own adventure and solve challenges!",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      link: "/story",
    },
    {
      icon: Heart,
      title: "Calm Time",
      description: "Practice breathing and learn about feelings",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary/20",
      link: "/mindfulness",
    },
    {
      icon: Gamepad2,
      title: "Learning Games",
      description: "Play fun puzzles with shapes, colors, and numbers",
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
      link: "/games",
    },
    {
      icon: Star,
      title: "Earn Rewards",
      description: "Collect badges and track your amazing progress!",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
      link: "/rewards",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gradient-magic flex items-center justify-center text-3xl animate-bounce-gentle">
              ✨
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Lucid Adventures
            </h1>
          </div>
          <Link to="/parent">
            <Button variant="outline" size="sm">
              For Parents
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-magic rounded-full mb-6 animate-pulse-glow">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
              <span className="text-sm font-bold text-primary-foreground">
                Learn Through Play!
              </span>
            </div>
            
            <h2 className="text-6xl font-bold mb-6 bg-gradient-magic bg-clip-text text-transparent leading-tight">
              Welcome to The World of Lucid Adventures
            </h2>
            
            <p className="text-2xl text-muted-foreground mb-8 leading-relaxed">
              Join Sparkle and friends in a magical world where learning is an exciting adventure! 
              Perfect for curious minds ages 3-8.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/story">
                <Button variant="magic" size="xl" className="gap-2">
                  <BookOpen className="w-6 h-6" />
                  Start Your Adventure
                </Button>
              </Link>
              <Link to="/games">
                <Button variant="sunshine" size="xl" className="gap-2">
                  <Gamepad2 className="w-6 h-6" />
                  Play Games
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex-1">
            <img 
              src={heroCharacter} 
              alt="Sparkle the friendly character"
              className="w-full max-w-lg mx-auto animate-float"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="text-4xl font-bold text-center mb-12 text-foreground">
          What Can You Do?
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.title} to={feature.link}>
                <Card className={`shadow-playful border-4 ${feature.borderColor} hover:scale-105 transition-all cursor-pointer h-full`}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full ${feature.bgColor} flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-foreground">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-12 mb-12">
        <Card className="shadow-playful border-4 border-accent/20 bg-gradient-magic overflow-hidden">
          <CardContent className="p-12 text-center relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 text-6xl animate-float">⭐</div>
              <div className="absolute top-12 right-8 text-4xl animate-wiggle">🌟</div>
              <div className="absolute bottom-8 left-12 text-5xl animate-bounce-gentle">✨</div>
              <div className="absolute bottom-4 right-4 text-6xl animate-float">💫</div>
            </div>
            
            <h3 className="text-4xl font-bold mb-4 text-primary-foreground relative z-10">
              Ready to Start Learning?
            </h3>
            <p className="text-xl text-primary-foreground/90 mb-8 relative z-10 max-w-2xl mx-auto">
              Every adventure makes you smarter, braver, and more amazing! 
              Let's explore together!
            </p>
            
            <Link to="/story">
              <Button variant="secondary" size="xl" className="relative z-10 shadow-playful">
                <Sparkles className="w-6 h-6 mr-2" />
                Begin Your Journey
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
