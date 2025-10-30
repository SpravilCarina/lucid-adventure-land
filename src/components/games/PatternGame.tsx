import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RotateCcw, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface PatternGameProps {
  onBack: () => void;
}

const PatternGame = ({ onBack }: PatternGameProps) => {
  const shapes = ["⭕", "⬛", "🔺", "⭐", "💎", "🌸"];
  const colors = ["text-red-500", "text-blue-500", "text-yellow-500", "text-green-500", "text-purple-500"];

  const generatePattern = () => {
    const patternLength = 4;
    const pattern: { shape: string; color: string }[] = [];
    const baseShape = shapes[Math.floor(Math.random() * shapes.length)];
    const baseColor = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < patternLength; i++) {
      pattern.push({ shape: baseShape, color: baseColor });
    }
    return pattern;
  };

  const [pattern, setPattern] = useState(generatePattern());
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState(() => {
    const correctAnswer = { shape: pattern[0].shape, color: pattern[0].color };
    const wrong1 = { shape: shapes[1], color: colors[1] };
    const wrong2 = { shape: shapes[2], color: colors[2] };
    return [correctAnswer, wrong1, wrong2].sort(() => Math.random() - 0.5);
  });

  const handleAnswerClick = (answer: typeof options[0]) => {
    if (answer.shape === pattern[0].shape && answer.color === pattern[0].color) {
      setScore(prev => prev + 15);
      toast.success("Amazing! 🎯", {
        description: "You completed the pattern!",
      });
      const newPattern = generatePattern();
      setPattern(newPattern);
      const correctAnswer = { shape: newPattern[0].shape, color: newPattern[0].color };
      const wrong1 = { 
        shape: shapes[Math.floor(Math.random() * shapes.length)], 
        color: colors[Math.floor(Math.random() * colors.length)] 
      };
      const wrong2 = { 
        shape: shapes[Math.floor(Math.random() * shapes.length)], 
        color: colors[Math.floor(Math.random() * colors.length)] 
      };
      setOptions([correctAnswer, wrong1, wrong2].sort(() => Math.random() - 0.5));
    } else {
      toast.error("Not quite!", {
        description: "Look at the pattern carefully!",
      });
    }
  };

  const resetGame = () => {
    const newPattern = generatePattern();
    setPattern(newPattern);
    setScore(0);
    const correctAnswer = { shape: newPattern[0].shape, color: newPattern[0].color };
    const wrong1 = { shape: shapes[1], color: colors[1] };
    const wrong2 = { shape: shapes[2], color: colors[2] };
    setOptions([correctAnswer, wrong1, wrong2].sort(() => Math.random() - 0.5));
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
            Complete the Pattern
          </h2>

          <p className="text-2xl text-center mb-6 text-foreground font-semibold">
            Look at the pattern and find the missing piece:
          </p>

          <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
            {pattern.map((item, index) => (
              <div
                key={index}
                className={`text-8xl ${item.color} animate-bounce-gentle`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.shape}
              </div>
            ))}
            <div className="text-8xl text-muted-foreground">
              ?
            </div>
          </div>

          <p className="text-xl text-center mb-6 text-muted-foreground">
            What comes next?
          </p>

          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className="h-32 text-7xl"
                variant="outline"
              >
                <span className={option.color}>{option.shape}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatternGame;
