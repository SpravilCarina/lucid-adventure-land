import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RotateCcw, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface ColorPuzzleProps {
  onBack: () => void;
}

const ColorPuzzle = ({ onBack }: ColorPuzzleProps) => {
  const colors = [
    { name: "Red", value: "bg-red-500", hex: "#ef4444" },
    { name: "Blue", value: "bg-blue-500", hex: "#3b82f6" },
    { name: "Yellow", value: "bg-yellow-400", hex: "#facc15" },
    { name: "Green", value: "bg-green-500", hex: "#22c55e" },
    { name: "Purple", value: "bg-purple-500", hex: "#a855f7" },
    { name: "Orange", value: "bg-orange-500", hex: "#f97316" },
  ];

  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [score, setScore] = useState(0);
  const [shuffledColors, setShuffledColors] = useState([...colors].sort(() => Math.random() - 0.5));

  const handleColorClick = (color: typeof colors[0]) => {
    if (color.name === currentColor.name) {
      setScore(prev => prev + 10);
      toast.success("Excellent! 🎨", {
        description: `You found ${color.name}!`,
      });
      const nextColor = colors[Math.floor(Math.random() * colors.length)];
      setCurrentColor(nextColor);
      setShuffledColors([...colors].sort(() => Math.random() - 0.5));
    } else {
      toast.error("Not quite!", {
        description: `That's ${color.name}. Try again!`,
      });
    }
  };

  const resetGame = () => {
    setCurrentColor(colors[0]);
    setScore(0);
    setShuffledColors([...colors].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Games
        </Button>
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-primary">Score: {score}</div>
          <Button onClick={resetGame} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      <Card className="shadow-playful border-4 border-accent/20">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Color Matching
          </h2>

          <div className="mb-8 text-center">
            <p className="text-2xl font-semibold mb-4 text-foreground">Find the color:</p>
            <p className="text-5xl font-bold text-primary mb-6">{currentColor.name}</p>
            <div
              className="w-32 h-32 rounded-full mx-auto shadow-elegant animate-pulse border-4 border-white"
              style={{ backgroundColor: currentColor.hex }}
            />
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {shuffledColors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorClick(color)}
                className="aspect-square rounded-2xl transition-all hover:scale-110 active:scale-95 shadow-card border-4 border-white"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorPuzzle;
