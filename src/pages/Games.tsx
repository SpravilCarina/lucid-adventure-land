import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Gamepad2, Brain, Palette, Eye, Grid3x3, Sparkles } from "lucide-react";
import ShapeMatchingGame from "@/components/games/ShapeMatchingGame";
import CountingGame from "@/components/games/CountingGame";
import ColorPuzzle from "@/components/games/ColorPuzzle";
import MemoryGame from "@/components/games/MemoryGame";
import AlphabetGame from "@/components/games/AlphabetGame";
import PatternGame from "@/components/games/PatternGame";

type GameType = "menu" | "shapes" | "counting" | "colors" | "memory" | "alphabet" | "patterns";

const Games = () => {
  const [currentGame, setCurrentGame] = useState<GameType>("menu");

  const games = [
    {
      id: "shapes" as GameType,
      title: "Shape Matching",
      description: "Match the same shapes together!",
      icon: Grid3x3,
      color: "border-primary/20 hover:border-primary/40",
      emoji: "🔷"
    },
    {
      id: "counting" as GameType,
      title: "Counting Fun",
      description: "Count the objects and learn numbers!",
      icon: Brain,
      color: "border-secondary/20 hover:border-secondary/40",
      emoji: "🔢"
    },
    {
      id: "colors" as GameType,
      title: "Color Puzzle",
      description: "Learn colors by matching them!",
      icon: Palette,
      color: "border-accent/20 hover:border-accent/40",
      emoji: "🎨"
    },
    {
      id: "memory" as GameType,
      title: "Memory Match",
      description: "Find matching pairs to train your memory!",
      icon: Eye,
      color: "border-success/20 hover:border-success/40",
      emoji: "🧠"
    },
    {
      id: "alphabet" as GameType,
      title: "Letter Quest",
      description: "Recognize and learn letters!",
      icon: Sparkles,
      color: "border-primary/20 hover:border-primary/40",
      emoji: "📚"
    },
    {
      id: "patterns" as GameType,
      title: "Pattern Master",
      description: "Complete the patterns and think ahead!",
      icon: Grid3x3,
      color: "border-accent/20 hover:border-accent/40",
      emoji: "🎯"
    },
  ];

  const renderGame = () => {
    switch (currentGame) {
      case "shapes":
        return <ShapeMatchingGame onBack={() => setCurrentGame("menu")} />;
      case "counting":
        return <CountingGame onBack={() => setCurrentGame("menu")} />;
      case "colors":
        return <ColorPuzzle onBack={() => setCurrentGame("menu")} />;
      case "memory":
        return <MemoryGame onBack={() => setCurrentGame("menu")} />;
      case "alphabet":
        return <AlphabetGame onBack={() => setCurrentGame("menu")} />;
      case "patterns":
        return <PatternGame onBack={() => setCurrentGame("menu")} />;
      default:
        return null;
    }
  };

  if (currentGame !== "menu") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-12">
          {renderGame()}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-magic bg-clip-text text-transparent flex items-center justify-center gap-3 animate-wiggle">
              <Gamepad2 className="w-12 h-12 text-primary" />
              Learning Games
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose a game and start learning while having fun!
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => {
              const IconComponent = game.icon;
              return (
                <Card
                  key={game.id}
                  className={`shadow-playful border-4 ${game.color} hover:scale-105 transition-all cursor-pointer`}
                  onClick={() => setCurrentGame(game.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-7xl mb-4 animate-bounce-gentle">{game.emoji}</div>
                    <IconComponent className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <h3 className="text-2xl font-bold mb-2 text-foreground">{game.title}</h3>
                    <p className="text-muted-foreground">{game.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Games;
