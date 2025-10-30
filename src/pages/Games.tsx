import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gamepad2, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import shapesGame from "@/assets/shapes-game.png";

type Shape = {
  id: number;
  type: "circle" | "square" | "triangle" | "star";
  color: string;
  matched: boolean;
};

const Games = () => {
  const initialShapes: Shape[] = [
    { id: 1, type: "circle", color: "bg-yellow-400", matched: false },
    { id: 2, type: "square", color: "bg-blue-500", matched: false },
    { id: 3, type: "triangle", color: "bg-red-500", matched: false },
    { id: 4, type: "star", color: "bg-success", matched: false },
  ];

  const [shapes, setShapes] = useState(initialShapes);
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);
  const [score, setScore] = useState(0);

  const handleShapeClick = (shape: Shape) => {
    if (shape.matched) return;

    if (!selectedShape) {
      setSelectedShape(shape);
    } else {
      if (selectedShape.type === shape.type && selectedShape.id !== shape.id) {
        // Correct match!
        setShapes(prev =>
          prev.map(s =>
            s.id === shape.id || s.id === selectedShape.id
              ? { ...s, matched: true }
              : s
          )
        );
        setScore(prev => prev + 10);
        toast.success("Great match! 🎉", {
          description: "You found matching shapes!",
        });
        setSelectedShape(null);
      } else {
        // Wrong match
        toast.error("Try again!", {
          description: "These shapes don't match.",
        });
        setSelectedShape(null);
      }
    }
  };

  const resetGame = () => {
    setShapes(initialShapes);
    setSelectedShape(null);
    setScore(0);
  };

  const allMatched = shapes.every(s => s.matched);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-magic bg-clip-text text-transparent flex items-center justify-center gap-3 animate-wiggle">
              <Gamepad2 className="w-12 h-12 text-primary" />
              Learning Games
            </h1>
            <p className="text-xl text-muted-foreground">
              Play and learn with fun puzzles!
            </p>
          </div>

          <Card className="shadow-playful border-4 border-primary/20 mb-8">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-foreground">
                  Shape Matching Game
                </h2>
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-primary">
                    Score: {score}
                  </div>
                  <Button onClick={resetGame} variant="outline" size="sm">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>

              <p className="text-xl text-muted-foreground mb-6 text-center">
                Find and match the shapes that are the same! Click two shapes to match them.
              </p>

              <div className="grid grid-cols-4 gap-4 mb-8">
                {shapes.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => handleShapeClick(shape)}
                    disabled={shape.matched}
                    className={`
                      aspect-square rounded-2xl flex items-center justify-center text-6xl
                      transition-all hover:scale-110 active:scale-95 shadow-card
                      ${shape.matched ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
                      ${selectedShape?.id === shape.id ? "ring-4 ring-accent scale-110" : ""}
                      ${shape.color}
                    `}
                  >
                    {shape.type === "circle" && "⭕"}
                    {shape.type === "square" && "⬛"}
                    {shape.type === "triangle" && "🔺"}
                    {shape.type === "star" && "⭐"}
                  </button>
                ))}
              </div>

              {allMatched && (
                <div className="text-center p-6 bg-success/10 rounded-2xl border-2 border-success animate-bounce-gentle">
                  <p className="text-3xl font-bold text-success mb-2">
                    🎉 You Won! 🎉
                  </p>
                  <p className="text-xl text-foreground">
                    Amazing job matching all the shapes!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-playful border-4 border-secondary/20 hover:scale-105 transition-all cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-6xl mb-4">🔢</div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">Counting Game</h3>
                <p className="text-muted-foreground">Coming soon!</p>
              </CardContent>
            </Card>

            <Card className="shadow-playful border-4 border-accent/20 hover:scale-105 transition-all cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">Color Puzzle</h3>
                <p className="text-muted-foreground">Coming soon!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Games;
