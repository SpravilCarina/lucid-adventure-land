import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RotateCcw, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface CountingGameProps {
  onBack: () => void;
}

const CountingGame = ({ onBack }: CountingGameProps) => {
  const [currentNumber, setCurrentNumber] = useState(Math.floor(Math.random() * 5) + 1);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const emojis = ["🐱", "🐶", "🦋", "🌸", "⭐", "🎈"];
  const currentEmoji = emojis[attempts % emojis.length];

  const handleAnswer = (answer: number) => {
    setAttempts(prev => prev + 1);
    if (answer === currentNumber) {
      setScore(prev => prev + 10);
      toast.success("Perfect! 🎉", {
        description: `You counted ${currentNumber} correctly!`,
      });
      setCurrentNumber(Math.floor(Math.random() * 5) + 1);
    } else {
      toast.error("Try again!", {
        description: "Count carefully!",
      });
    }
  };

  const resetGame = () => {
    setCurrentNumber(Math.floor(Math.random() * 5) + 1);
    setScore(0);
    setAttempts(0);
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

      <Card className="shadow-playful border-4 border-primary/20">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Count the {currentEmoji}!
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mb-8 min-h-[200px] items-center">
            {Array.from({ length: currentNumber }).map((_, i) => (
              <div
                key={i}
                className="text-7xl animate-bounce-gentle"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {currentEmoji}
              </div>
            ))}
          </div>

          <p className="text-2xl text-center mb-6 text-foreground font-semibold">
            How many do you see?
          </p>

          <div className="grid grid-cols-5 gap-4 max-w-2xl mx-auto">
            {[1, 2, 3, 4, 5].map((num) => (
              <Button
                key={num}
                onClick={() => handleAnswer(num)}
                className="h-20 text-3xl font-bold"
                variant="outline"
              >
                {num}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CountingGame;
