import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, Trophy, Crown } from "lucide-react";
import rewardStar from "@/assets/reward-star.png";

const Rewards = () => {
  const badges = [
    { id: 1, name: "Story Explorer", icon: "📖", earned: true, description: "Completed your first story!" },
    { id: 2, name: "Calm Champion", icon: "🧘", earned: true, description: "Practiced breathing exercises" },
    { id: 3, name: "Shape Master", icon: "🔷", earned: true, description: "Matched all the shapes!" },
    { id: 4, name: "Number Ninja", icon: "🔢", earned: false, description: "Complete the counting game" },
    { id: 5, name: "Color Expert", icon: "🎨", earned: false, description: "Master the color puzzle" },
    { id: 6, name: "Rainbow Collector", icon: "🌈", earned: false, description: "Find all rainbow gems" },
  ];

  const stats = [
    { label: "Stories Completed", value: 3, icon: Star, color: "text-primary" },
    { label: "Games Played", value: 5, icon: Trophy, color: "text-secondary" },
    { label: "Badges Earned", value: 3, icon: Award, color: "text-success" },
    { label: "Calm Sessions", value: 7, icon: Crown, color: "text-accent" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-magic bg-clip-text text-transparent flex items-center justify-center gap-3">
              <Star className="w-12 h-12 text-primary animate-pulse-glow" />
              Your Rewards
            </h1>
            <p className="text-xl text-muted-foreground">
              Look at all your amazing achievements!
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="shadow-playful border-4 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                    <p className="text-4xl font-bold text-foreground mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Badges Section */}
          <Card className="shadow-playful border-4 border-secondary/20 mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-center text-foreground">
                Your Badge Collection
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`
                      p-6 rounded-2xl border-4 text-center transition-all
                      ${
                        badge.earned
                          ? "bg-gradient-sunshine border-secondary/50 shadow-playful hover:scale-105 cursor-pointer"
                          : "bg-muted border-muted-foreground/20 opacity-50"
                      }
                    `}
                  >
                    <div className="text-6xl mb-3 animate-bounce-gentle">
                      {badge.earned ? badge.icon : "🔒"}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">
                      {badge.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {badge.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Motivational Card */}
          <Card className="shadow-playful border-4 border-accent/20 bg-gradient-magic">
            <CardContent className="p-8 text-center">
              <img 
                src={rewardStar} 
                alt="Reward Star" 
                className="w-24 h-24 mx-auto mb-4 animate-float"
              />
              <h3 className="text-3xl font-bold mb-4 text-primary-foreground">
                You're Doing Amazing! 🌟
              </h3>
              <p className="text-xl text-primary-foreground/90">
                Keep learning, playing, and growing. Every adventure makes you smarter and stronger!
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Rewards;
